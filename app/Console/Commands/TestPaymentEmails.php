<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PaymentLink;
use App\Models\PaymentFee;
use App\Mail\PaymentConfirmationCustomer;
use App\Mail\PaymentConfirmationBusiness;
use Illuminate\Support\Facades\Mail;

class TestPaymentEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:payment-emails 
                            {--customer-email= : Customer email address}
                            {--business-email= : Business email address}
                            {--link-code= : Payment link code to use (optional)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test payment confirmation emails by sending sample emails';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $customerEmail = $this->option('customer-email');
        $businessEmail = $this->option('business-email');
        $linkCode = $this->option('link-code');

        // Get payment link
        if ($linkCode) {
            $paymentLink = PaymentLink::with('company')->where('link_code', $linkCode)->first();
            
            if (!$paymentLink) {
                $this->error("Payment link with code '{$linkCode}' not found.");
                return 1;
            }
        } else {
            // Get the most recent paid payment link or any payment link
            $paymentLink = PaymentLink::with('company')
                ->where('status', 'paid')
                ->latest()
                ->first();

            if (!$paymentLink) {
                $paymentLink = PaymentLink::with('company')->latest()->first();
            }

            if (!$paymentLink) {
                $this->error('No payment links found in the database. Please create one first.');
                return 1;
            }
        }

        $this->info('Using payment link: ' . $paymentLink->link_code);
        $this->info('Customer: ' . $paymentLink->customer_name);
        $this->info('Amount: ' . $paymentLink->formatted_amount);

        // Calculate fees
        $fees = PaymentFee::calculateFees($paymentLink->amount);
        $feeBreakdown = PaymentFee::getFeeBreakdown($paymentLink->amount);

        $this->newLine();
        $this->info('Fee Breakdown:');
        $this->line('Base Amount: ' . number_format($fees['base_amount'], 0) . ' ' . $paymentLink->currency);
        $this->line('Platform Fee: ' . number_format($fees['platform_fee'], 0) . ' ' . $paymentLink->currency);
        $this->line('Gateway Fee: ' . number_format($fees['gateway_fee'], 0) . ' ' . $paymentLink->currency);
        $this->line('Total Amount: ' . number_format($fees['total_amount'], 0) . ' ' . $paymentLink->currency);
        $this->newLine();

        // Send customer email
        if ($customerEmail) {
            $this->info("Sending customer confirmation email to: {$customerEmail}");
            
            try {
                Mail::to($customerEmail)->send(
                    new PaymentConfirmationCustomer($paymentLink, $feeBreakdown)
                );
                $this->info('✅ Customer email sent successfully!');
            } catch (\Exception $e) {
                $this->error('❌ Failed to send customer email: ' . $e->getMessage());
            }
        } else {
            $this->warn('⚠️  No customer email provided. Use --customer-email option.');
        }

        $this->newLine();

        // Send business email
        if ($businessEmail) {
            $this->info("Sending business notification email to: {$businessEmail}");
            
            try {
                Mail::to($businessEmail)->send(
                    new PaymentConfirmationBusiness($paymentLink, $feeBreakdown)
                );
                $this->info('✅ Business email sent successfully!');
            } catch (\Exception $e) {
                $this->error('❌ Failed to send business email: ' . $e->getMessage());
            }
        } else {
            $this->warn('⚠️  No business email provided. Use --business-email option.');
        }

        $this->newLine();
        $this->info('Email testing completed!');
        $this->newLine();
        $this->comment('Check your email inbox(es) for the test emails.');
        $this->comment('If using queue, make sure to run: php artisan queue:work');

        return 0;
    }
}
