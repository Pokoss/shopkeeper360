<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use App\Models\SmsBundle;
use App\Models\SentSms;
use App\Models\SmsTopup;
use App\Services\SmsService;
use App\Mail\SmsPurchaseConfirmation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class SmsController extends Controller
{
    protected $smsService;

    public function __construct(SmsService $smsService)
    {
        $this->smsService = $smsService;
    }

    /**
     * Show SMS messaging page
     */
    public function index($companySlug)
    {
        $employee = Employee::whereHas('company', function ($query) use ($companySlug) {
            $query->where('slug', $companySlug);
        })->with('company.category', 'user')->where('user_id', Auth::id())->firstOrFail();

        $company = $employee->company;

        // Get sent SMS history
        $sentSms = SentSms::where('company_id', $company->id)
            ->with('sender')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        // Get SMS bundles for top-up
        $bundles = SmsBundle::where('is_active', true)
            ->orderBy('sms_count')
            ->get();

        return Inertia::render('Messaging/SmsScreen', [
            'company' => $employee,
            'smsBalance' => $company->sms_balance,
            'sentSms' => $sentSms,
            'bundles' => $bundles,
            'maxLength' => SmsService::MAX_SMS_LENGTH,
        ]);
    }

    /**
     * Send bulk SMS
     */
    public function send(Request $request, $companySlug)
    {
        $request->validate([
            'message' => 'required|string|max:500',
            'recipients' => 'required|string',
        ]);

        $employee = Employee::whereHas('company', function ($query) use ($companySlug) {
            $query->where('slug', $companySlug);
        })->with('company.category', 'user')->where('user_id', Auth::id())->firstOrFail();

        $company = $employee->company;

        // Parse recipients (split by comma, newline, or space)
        $recipientsRaw = preg_split('/[\s,\n\r]+/', $request->recipients, -1, PREG_SPLIT_NO_EMPTY);
        
        // Validate phone numbers
        $validRecipients = $this->smsService->validatePhoneNumbers($recipientsRaw);

        if (empty($validRecipients)) {
            return back()->withErrors(['recipients' => 'No valid phone numbers found. Use format: 256XXXXXXXXX or +256XXXXXXXXX']);
        }

        // Check SMS balance
        if (!$this->smsService->hasSufficientBalance($company, count($validRecipients))) {
            return back()->withErrors([
                'balance' => "You do not have enough SMS credits to send this message. You need " . count($validRecipients) . " credits but only have " . $company->sms_balance . "."
            ]);
        }

        // Prepare message with company name
        $preparedMessage = $this->smsService->prepareMessage($request->message, $company);

        // Send SMS in batches
        $results = $this->smsService->sendBulkSms(
            $company,
            $preparedMessage['message'],
            $validRecipients,
            Auth::id()
        );

        if ($results['sent'] > 0) {
            return back()->with('success', "Successfully sent {$results['sent']} message(s). Failed: {$results['failed']}. Remaining balance: {$company->fresh()->sms_balance} SMS");
        } else {
            return back()->withErrors(['send' => 'Failed to send any messages. Please check your SMS configuration.']);
        }
    }

    /**
     * Process SMS bundle top-up
     */
    public function topup(Request $request, $companySlug)
    {
        $request->validate([
            'bundle_id' => 'required|exists:sms_bundles,id',
            'transaction_reference' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        $employee = Employee::whereHas('company', function ($query) use ($companySlug) {
            $query->where('slug', $companySlug);
        })->with('company.category', 'user')->where('user_id', Auth::id())->firstOrFail();

        $company = $employee->company;
        $bundle = SmsBundle::findOrFail($request->bundle_id);

        // Record the top-up transaction
        $topup = SmsTopup::create([
            'company_id' => $company->id,
            'sms_bundle_id' => $bundle->id,
            'sms_count' => $bundle->sms_count,
            'amount' => $bundle->price,
            'transaction_reference' => $request->transaction_reference,
            'payment_method' => $request->payment_method,
            'paid_by' => Auth::id(),
        ]);

        // Add SMS credits to company
        $this->smsService->topUpBalance($company, $bundle->sms_count);

        // Refresh company to get updated balance
        $company->refresh();

        // Send confirmation email
        try {
            Mail::to($employee->user->email)->send(new SmsPurchaseConfirmation($company, $bundle, $topup, $employee->user));
            Log::info("SMS purchase confirmation email sent to: {$employee->user->email}");
        } catch (\Exception $e) {
            Log::error("Failed to send SMS purchase confirmation email: " . $e->getMessage());
        }

        Log::info("SMS top-up successful for company: {$company->name}. Bundle: {$bundle->name}, SMS added: {$bundle->sms_count}");

        return back()->with('success', "Successfully added {$bundle->sms_count} SMS credits. New balance: {$company->sms_balance} SMS");
    }

    /**
     * Get SMS bundles for payment modal
     */
    public function getBundles()
    {
        $bundles = SmsBundle::where('is_active', true)
            ->orderBy('sms_count')
            ->get();

        return response()->json(['bundles' => $bundles]);
    }
}
