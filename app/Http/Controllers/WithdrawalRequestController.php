<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\PayoutDetail;
use App\Models\Wallet;
use App\Models\WithdrawalRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Mail\WithdrawalRequestReceived;
use App\Mail\WithdrawalRequestNotification;

class WithdrawalRequestController extends Controller
{
    /**
     * Display withdrawal requests for a company
     */
    public function index($companySlug)
    {
        $employee = Employee::where('user_id', Auth::id())
            ->whereHas('company', function ($query) use ($companySlug) {
                $query->where('slug', $companySlug);
            })
            ->with('company.category', 'user')
            ->firstOrFail();

        $withdrawalRequests = WithdrawalRequest::where('company_id', $employee->company_id)
            ->with(['payoutDetail', 'requestedBy', 'processedBy'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Wallet/WithdrawalRequests', [
            'company' => $employee,
            'withdrawalRequests' => $withdrawalRequests,
        ]);
    }

    /**
     * Create a new withdrawal request
     */
    public function store(Request $request, $companySlug)
    {
        $employee = Employee::where('user_id', Auth::id())
            ->whereHas('company', function ($query) use ($companySlug) {
                $query->where('slug', $companySlug);
            })
            ->with('company')
            ->firstOrFail();

        $validated = $request->validate([
            'payout_detail_id' => 'required|exists:payout_details,id',
            'amount' => 'required|numeric|min:1',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Get payout detail
        $payoutDetail = PayoutDetail::where('id', $validated['payout_detail_id'])
            ->where('company_id', $employee->company_id)
            ->firstOrFail();

        // Calculate fee
        $fee = WithdrawalRequest::calculateFee($payoutDetail->type, $validated['amount']);
        $totalAmount = $validated['amount'] + $fee;

        // Get or create wallet
        $wallet = $employee->company->wallet;
        if (!$wallet) {
            $wallet = Wallet::create([
                'company_id' => $employee->company_id,
                'balance' => 0,
                'currency' => 'UGX',
            ]);
        }

        // Calculate total pending withdrawal amount
        $pendingAmount = WithdrawalRequest::where('company_id', $employee->company_id)
            ->whereIn('status', ['pending', 'approved'])
            ->sum('total_amount');

        // Check if wallet has sufficient balance including pending withdrawals
        $availableBalance = $wallet->balance - $pendingAmount;
        
        if ($availableBalance < $totalAmount) {
            return back()->withErrors([
                'amount' => 'Insufficient available balance. You have ' . number_format($availableBalance, 2) . ' UGX available after pending withdrawals of ' . number_format($pendingAmount, 2) . ' UGX. You need ' . number_format($totalAmount, 2) . ' UGX for this withdrawal.'
            ]);
        }

        DB::beginTransaction();
        try {
            $withdrawalRequest = WithdrawalRequest::create([
                'wallet_id' => $wallet->id,
                'company_id' => $employee->company_id,
                'payout_detail_id' => $payoutDetail->id,
                'amount' => $validated['amount'],
                'fee' => $fee,
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'notes' => $validated['notes'] ?? null,
                'requested_by' => Auth::id(),
            ]);

            // Load relationships for emails
            $withdrawalRequest->load(['company', 'wallet', 'payoutDetail', 'requestedBy']);

            // Send confirmation email to the business
            if ($employee->company->email) {
                try {
                    Mail::to($employee->company->email)->send(new WithdrawalRequestReceived($withdrawalRequest));
                } catch (\Exception $e) {
                    Log::error('Failed to send withdrawal confirmation email: ' . $e->getMessage());
                }
            }

            // Send notification email to admin
            try {
                Mail::to('info@biashari.com')->send(new WithdrawalRequestNotification($withdrawalRequest));
            } catch (\Exception $e) {
                Log::error('Failed to send withdrawal notification to admin: ' . $e->getMessage());
            }

            DB::commit();

            return back()->with('success', 'Withdrawal request submitted successfully. Fee: ' . $wallet->currency . ' ' . number_format($fee, 2));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to create withdrawal request: ' . $e->getMessage()]);
        }
    }

    /**
     * Cancel a pending withdrawal request
     */
    public function cancel($companySlug, WithdrawalRequest $withdrawalRequest)
    {
        $employee = Employee::where('user_id', Auth::id())
            ->whereHas('company', function ($query) use ($companySlug) {
                $query->where('slug', $companySlug);
            })
            ->firstOrFail();

        if ($withdrawalRequest->company_id !== $employee->company_id) {
            abort(403);
        }

        if ($withdrawalRequest->status !== 'pending') {
            return back()->withErrors(['error' => 'Only pending requests can be cancelled']);
        }

        $withdrawalRequest->update([
            'status' => 'rejected',
            'rejection_reason' => 'Cancelled by company',
        ]);

        return back()->with('success', 'Withdrawal request cancelled');
    }
}
