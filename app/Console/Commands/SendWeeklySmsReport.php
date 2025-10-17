<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Models\Employee;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use App\Models\Sale;
use App\Models\Expense;
use App\Models\Receipt;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SendWeeklySmsReport extends Command
{
    protected $signature = 'biashari:send-weekly-sms';
    protected $description = 'Send weekly SMS summary to company owners';

    public function handle()
    {
        // Calculate last week's date range (Monday to Sunday)
        $startOfWeek = Carbon::now()->subWeek()->startOfWeek(Carbon::MONDAY);
        $endOfWeek = Carbon::now()->subWeek()->endOfWeek(Carbon::SUNDAY);

        Log::info("Starting Weekly SMS Report for week: {$startOfWeek->format('M d')} - {$endOfWeek->format('M d')}");

        // Get company owners who have opted in for daily SMS reports
        $owners = Employee::where('position', 'owner')
            ->whereHas('company', function ($query) {
                $query->where('status', 'active'); // Only active companies
            })
            ->with(['company', 'user']) // Load relationships
            ->get();

        Log::info("Found {$owners->count()} owner(s) with active companies");

        if ($owners->count() === 0) {
            Log::warning("No owners found with active companies");
            $this->info('No owners found to send SMS to.');
            return;
        }

        foreach ($owners as $owner) {
            // Get phone number from user
            $phoneNumber = $owner->company->contacts;

            if (!$phoneNumber) {
                Log::warning("No phone number found for owner of company: {$owner->company->name}");
                continue;
            }

            $receiver = $this->formatPhoneNumber($phoneNumber);

            // === CALCULATE SALES (using Receipts like DashboardHomeController) ===
            $receipts = Receipt::where('company_id', $owner->company_id)
                ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
                ->get();

            $sales_total = 0;
            foreach ($receipts as $receipt) {
                $sales_total += ($receipt->sale_total - $receipt->discount);
            }

            // Get discount total
            $discount = Receipt::where('company_id', $owner->company_id)
                ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
                ->sum('discount');

            // === CALCULATE PROFIT (matching DashboardHomeController logic) ===
            $sales_profit = Sale::where('company_id', $owner->company_id)
                ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
                ->get();

            $profit = 0;
            foreach ($sales_profit as $p) {
                $profit += ($p->sale_price - ($p->cost_price * $p->quantity));
            }
            $profit -= $discount;

            // === FETCH WEEKLY EXPENSES ===
            $expenses = Expense::where('company_id', $owner->company_id)
                ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
                ->sum('amount');

            // === CUSTOMER VISITS (number of receipts) ===
            $customer_visits = $receipts->count();

            // Build story-like SMS message
            $message = "{$owner->company->name} Report ({$startOfWeek->format('M d')} - {$endOfWeek->format('M d')}): ";
            $message .= "Sales UGX " . number_format($sales_total) . ", ";
            $message .= "Expenses UGX " . number_format($expenses) . ", ";
            $message .= "Profit UGX " . number_format($profit) . " ";
            $message .= "from {$customer_visits} customers - Biashari";

            $this->sendSms($receiver, $message);
        }

        $this->info('Weekly SMS sent successfully!');
    }

    private function sendSms($receiver, $message)
    {
        $user = env('LINKSMS_USER');
        $password = env('LINKSMS_PASSWORD');
        $sender = env('LINKSMS_SENDER');
        $messageEncoded = urlencode($message);

        // Build URL exactly as per Link SMS documentation (note: 'reciever' spelling is correct for their API)
        $url = "https://app.linksmsug.com/api/index_get?user={$user}&password={$password}&reciever={$receiver}&sender={$sender}&message={$messageEncoded}";

        Log::info("Sending SMS to: $receiver");
        Log::info("SMS URL: $url");

        try {
            $response = Http::get($url);

            if ($response->successful()) {
                Log::info("SMS successfully sent to $receiver. Response: " . $response->body());
            } else {
                Log::error("Failed to send SMS to $receiver. Status: {$response->status()}. Response: " . $response->body());
            }
        } catch (\Exception $e) {
            Log::error("Exception while sending SMS to $receiver: " . $e->getMessage());
        }
    }

    private function formatPhoneNumber($number)
    {
        $number = preg_replace('/\D/', '', $number);
        if (substr($number, 0, 1) === '0') {
            $number = '256' . substr($number, 1);
        }
        return $number;
    }
}
