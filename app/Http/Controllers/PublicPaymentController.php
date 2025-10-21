<?php

namespace App\Http\Controllers;

use App\Models\PaymentLink;
use App\Models\PaymentFee;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PublicPaymentController extends Controller
{
    public function show($code)
    {
        $paymentLink = PaymentLink::with('company')
            ->where('link_code', $code)
            ->firstOrFail();

        // Check if company exists
        if (!$paymentLink->company) {
            abort(404, 'Company not found for this payment link');
        }

        // Check if link can be paid
        if (!$paymentLink->canBePaid()) {
            return Inertia::render('Public/PaymentExpired', [
                'paymentLink' => [
                    'status' => $paymentLink->status,
                    'status_label' => $paymentLink->status_label,
                    'company_name' => $paymentLink->company->company_name ?? 'Unknown',
                ]
            ]);
        }

        // Calculate fees
        $feeCalculation = PaymentFee::calculateFees($paymentLink->amount);
        $feeBreakdown = PaymentFee::getFeeBreakdown($paymentLink->amount);

        return Inertia::render('Public/PaymentPage', [
            'paymentLink' => [
                'id' => $paymentLink->id,
                'link_code' => $paymentLink->link_code,
                'customer_name' => $paymentLink->customer_name,
                'customer_phone' => $paymentLink->customer_phone,
                'customer_email' => $paymentLink->customer_email,
                'amount' => (float)$paymentLink->amount,
                'currency' => $paymentLink->currency,
                'formatted_amount' => $paymentLink->formatted_amount,
                'company_name' => $paymentLink->company->name ?? 'Unknown Company',
                'company_logo' => $paymentLink->company->logo ?? null,
                'purpose' => $paymentLink->purpose,
                'fees' => $feeCalculation,
                'fee_breakdown' => $feeBreakdown,
            ]
        ]);
    }

    public function initiate(Request $request, $code)
    {
        $paymentLink = PaymentLink::where('link_code', $code)->firstOrFail();

        // Check if link can be paid
        if (!$paymentLink->canBePaid()) {
            return response()->json([
                'success' => false,
                'message' => 'This payment link is no longer valid.'
            ], 400);
        }

        // Calculate total amount with fees
        $feeCalculation = PaymentFee::calculateFees($paymentLink->amount);

        // Generate Flutterwave transaction reference
        $txRef = 'PLK_' . $code . '_' . time();

        // Store the tx_ref for verification
        $paymentLink->update([
            'flutterwave_tx_ref' => $txRef
        ]);

        return response()->json([
            'success' => true,
            'tx_ref' => $txRef,
            'payment_link' => [
                'amount' => $feeCalculation['total_amount'], // Charge total amount including fees
                'base_amount' => $paymentLink->amount,
                'platform_fee' => $feeCalculation['platform_fee'],
                'gateway_fee' => $feeCalculation['gateway_fee'],
                'currency' => $paymentLink->currency,
                'customer_name' => $paymentLink->customer_name,
                'customer_phone' => $paymentLink->customer_phone,
                'customer_email' => $paymentLink->customer_email,
                'purpose' => $paymentLink->purpose,
            ]
        ]);
    }

    public function verify(Request $request)
    {
        $validated = $request->validate([
            'transaction_id' => 'required|string',
            'tx_ref' => 'required|string',
        ]);

        // Find payment link by tx_ref
        $paymentLink = PaymentLink::where('flutterwave_tx_ref', $validated['tx_ref'])->first();

        if (!$paymentLink) {
            return response()->json([
                'success' => false,
                'message' => 'Payment link not found.'
            ], 404);
        }

        // Verify payment with Flutterwave
        $flutterwaveVerification = $this->verifyFlutterwavePayment($validated['transaction_id']);

        if (!$flutterwaveVerification['success']) {
            return response()->json([
                'success' => false,
                'message' => 'Payment verification failed.'
            ], 400);
        }

        $paymentData = $flutterwaveVerification['data'];

        // Check if payment was successful
        if ($paymentData['status'] !== 'successful') {
            return response()->json([
                'success' => false,
                'message' => 'Payment was not successful.'
            ], 400);
        }

        // Check if amount matches
        if ((float)$paymentData['amount'] < (float)$paymentLink->amount) {
            return response()->json([
                'success' => false,
                'message' => 'Payment amount mismatch.'
            ], 400);
        }

        // Process payment - use database transaction
        DB::beginTransaction();
        try {
            // Mark payment link as paid
            $paymentLink->markAsPaid(
                $validated['transaction_id'],
                $validated['tx_ref']
            );

            // Credit company wallet
            $wallet = Wallet::where('company_id', $paymentLink->company_id)->first();
            
            if (!$wallet) {
                // Create wallet if it doesn't exist
                $wallet = Wallet::create([
                    'company_id' => $paymentLink->company_id,
                    'balance' => 0,
                    'currency' => $paymentLink->currency,
                ]);
            }

            // Add transaction
            WalletTransaction::create([
                'wallet_id' => $wallet->id,
                'company_id' => $paymentLink->company_id,
                'type' => 'credit',
                'amount' => $paymentLink->amount,
                'balance_before' => $wallet->balance,
                'balance_after' => $wallet->balance + $paymentLink->amount,
                'source' => 'payment_link',
                'reference' => $paymentLink->link_code,
                'description' => "Payment from {$paymentLink->customer_name} - {$paymentLink->purpose}",
                'metadata' => json_encode([
                    'payment_link_id' => $paymentLink->id,
                    'customer_name' => $paymentLink->customer_name,
                    'customer_phone' => $paymentLink->customer_phone,
                    'flutterwave_tx_ref' => $validated['tx_ref'],
                    'transaction_id' => $validated['transaction_id'],
                ]),
            ]);

            // Update wallet balance
            $wallet->increment('balance', (float)$paymentLink->amount);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Payment processed successfully!',
                'data' => [
                    'amount' => $paymentLink->amount,
                    'currency' => $paymentLink->currency,
                    'company_name' => $paymentLink->company->company_name,
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Payment link processing error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to process payment. Please contact support.'
            ], 500);
        }
    }

    private function verifyFlutterwavePayment($transactionId)
    {
        try {
            // Use the same secret key format from your existing implementation
            $secretKey = env('FLUTTERWAVE_SECRET_KEY', 'FLWSECK_TEST-SANDBOXDEMOKEY-X');

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $secretKey,
                'Content-Type' => 'application/json',
            ])->get("https://api.flutterwave.com/v3/transactions/{$transactionId}/verify");

            if ($response->successful()) {
                $data = $response->json();
                
                if ($data['status'] === 'success') {
                    return [
                        'success' => true,
                        'data' => $data['data']
                    ];
                }
            }

            return ['success' => false, 'message' => 'Verification failed'];

        } catch (\Exception $e) {
            Log::error('Flutterwave verification error: ' . $e->getMessage());
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function webhook(Request $request)
    {
        // Verify webhook signature
        $signature = $request->header('verif-hash');
        $secretHash = env('FLUTTERWAVE_SECRET_HASH');

        if (!$signature || $signature !== $secretHash) {
            return response()->json(['message' => 'Invalid signature'], 401);
        }

        $payload = $request->all();

        if ($payload['event'] === 'charge.completed' && $payload['data']['status'] === 'successful') {
            $txRef = $payload['data']['tx_ref'];
            
            // Find payment link
            $paymentLink = PaymentLink::where('flutterwave_tx_ref', $txRef)->first();

            if ($paymentLink && $paymentLink->status === 'pending') {
                // Verify payment with Flutterwave API
                $verification = $this->verifyFlutterwavePayment($payload['data']['id']);

                if ($verification['success']) {
                    DB::beginTransaction();
                    try {
                        // Mark as paid
                        $paymentLink->markAsPaid(
                            $payload['data']['id'],
                            $txRef
                        );

                        // Credit wallet
                        $wallet = Wallet::firstOrCreate(
                            ['company_id' => $paymentLink->company_id],
                            ['balance' => 0, 'currency' => $paymentLink->currency]
                        );

                        WalletTransaction::create([
                            'wallet_id' => $wallet->id,
                            'company_id' => $paymentLink->company_id,
                            'type' => 'credit',
                            'amount' => $paymentLink->amount,
                            'balance_before' => $wallet->balance,
                            'balance_after' => $wallet->balance + $paymentLink->amount,
                            'source' => 'payment_link',
                            'reference' => $paymentLink->link_code,
                            'description' => "Payment from {$paymentLink->customer_name} - {$paymentLink->purpose}",
                        ]);

                        $wallet->increment('balance', (float)$paymentLink->amount);

                        DB::commit();
                    } catch (\Exception $e) {
                        DB::rollBack();
                        Log::error('Webhook payment processing error: ' . $e->getMessage());
                    }
                }
            }
        }

        return response()->json(['message' => 'Webhook received'], 200);
    }
}
