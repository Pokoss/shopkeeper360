<?php

namespace App\Services;

use App\Models\Company;
use App\Models\SentSms;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsService
{
    const MAX_SMS_LENGTH = 160;
    const BATCH_SIZE = 25;

    /**
     * Validate phone numbers and return only valid ones
     */
    public function validatePhoneNumbers(array $phoneNumbers): array
    {
        $validNumbers = [];
        
        foreach ($phoneNumbers as $number) {
            $cleaned = $this->formatPhoneNumber($number);
            
            // Validate Ugandan number format (256XXXXXXXXX - 12 digits total)
            if (preg_match('/^256\d{9}$/', $cleaned)) {
                $validNumbers[] = $cleaned;
            }
        }
        
        return array_unique($validNumbers);
    }

    /**
     * Format phone number to standard format
     */
    public function formatPhoneNumber(string $number): string
    {
        // Remove all non-digit characters
        $cleaned = preg_replace('/\D/', '', $number);
        
        // If starts with 0, replace with 256
        if (substr($cleaned, 0, 1) === '0') {
            $cleaned = '256' . substr($cleaned, 1);
        }
        
        return $cleaned;
    }

    /**
     * Prepare message with company name appended
     */
    public function prepareMessage(string $message, Company $company): array
    {
        $suffix = " - {$company->name}";
        $maxMessageLength = self::MAX_SMS_LENGTH - strlen($suffix);
        
        // Truncate message if too long
        if (strlen($message) > $maxMessageLength) {
            $message = substr($message, 0, $maxMessageLength);
        }
        
        $fullMessage = $message . $suffix;
        
        return [
            'message' => $fullMessage,
            'length' => strlen($fullMessage),
            'truncated' => strlen($message) > $maxMessageLength
        ];
    }

    /**
     * Check if company has sufficient SMS balance
     */
    public function hasSufficientBalance(Company $company, int $recipientCount): bool
    {
        return $company->sms_balance >= $recipientCount;
    }

    /**
     * Send SMS in batches of 25
     */
    public function sendBulkSms(Company $company, string $message, array $recipients, int $userId): array
    {
        $results = [
            'total' => count($recipients),
            'sent' => 0,
            'failed' => 0,
            'errors' => []
        ];

        // Process in batches of 25
        $batches = array_chunk($recipients, self::BATCH_SIZE);

        foreach ($batches as $batchIndex => $batch) {
            Log::info("Processing batch " . ($batchIndex + 1) . " of " . count($batches) . " for company: {$company->name}");

            foreach ($batch as $recipient) {
                try {
                    $sent = $this->sendSingleSms($recipient, $message);
                    
                    if ($sent) {
                        $results['sent']++;
                    } else {
                        $results['failed']++;
                        $results['errors'][] = "Failed to send to {$recipient}";
                    }
                    
                    // Small delay to avoid overwhelming the API
                    usleep(100000); // 0.1 second delay
                    
                } catch (\Exception $e) {
                    $results['failed']++;
                    $results['errors'][] = "Error sending to {$recipient}: " . $e->getMessage();
                    Log::error("SMS sending error: " . $e->getMessage());
                }
            }

            // Delay between batches
            if ($batchIndex < count($batches) - 1) {
                sleep(1); // 1 second delay between batches
            }
        }

        // Deduct only successfully sent messages
        if ($results['sent'] > 0) {
            $company->decrement('sms_balance', $results['sent']);
            
            // Record the sent messages
            SentSms::create([
                'company_id' => $company->id,
                'message' => $message,
                'recipients' => json_encode($recipients),
                'total_sent' => $results['sent'],
                'sent_by' => $userId
            ]);
        }

        return $results;
    }

    /**
     * Send single SMS via Link SMS API
     */
    private function sendSingleSms(string $recipient, string $message): bool
    {
        $user = env('LINKSMS_USER');
        $password = env('LINKSMS_PASSWORD');
        $sender = env('LINKSMS_SENDER');
        $messageEncoded = urlencode($message);

        $url = "https://app.linksmsug.com/api/index_get?user={$user}&password={$password}&reciever={$recipient}&sender={$sender}&message={$messageEncoded}";

        Log::info("Sending SMS to: {$recipient}");
        Log::info("SMS URL: {$url}");

        try {
            $response = Http::get($url);
            
            if ($response->successful()) {
                Log::info("SMS successfully sent to {$recipient}. Response: " . $response->body());
                return true;
            } else {
                Log::error("Failed to send SMS to {$recipient}. Status: {$response->status()}. Response: " . $response->body());
                return false;
            }
        } catch (\Exception $e) {
            Log::error("Exception sending SMS to {$recipient}: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Add SMS balance to company account
     */
    public function topUpBalance(Company $company, int $amount): void
    {
        $company->increment('sms_balance', $amount);
        Log::info("Topped up {$amount} SMS credits for company: {$company->name}. New balance: {$company->sms_balance}");
    }

    /**
     * Add free SMS on plan renewal/upgrade
     */
    public function addFreeSmsOnRenewal(Company $company, string $planType): void
    {
        // Only add if balance is above zero
        if ($company->sms_balance <= 0) {
            Log::info("Company {$company->name} has zero or negative balance. No free SMS added.");
            return;
        }

        $freeSms = match($planType) {
            'basic' => 15,
            'standard' => 50,
            'premium' => 100,
            default => 0
        };

        if ($freeSms > 0) {
            $company->increment('sms_balance', $freeSms);
            Log::info("Added {$freeSms} free SMS to company: {$company->name} on {$planType} plan renewal");
        }
    }
}
