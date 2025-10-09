<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class InquiryController extends Controller
{
    public function submitInquiry(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ], [
            'name.required' => 'Please enter your name',
            'email.required' => 'Please enter your email address',
            'email.email' => 'Please enter a valid email address',
            'subject.required' => 'Please enter a subject',
            'message.required' => 'Please enter your message',
        ]);

        $notificationSent = false;
        $confirmationSent = false;

        // Send email to Biashari (notification)
        try {
            Log::info('Attempting to send notification email to info@biashari.com', [
                'subject' => $validated['subject'],
                'from_name' => $validated['name']
            ]);

            Mail::send('emails.inquiry-notification', ['data' => $validated], function ($message) use ($validated) {
                $message->to('info@biashari.com')
                    ->subject('New Inquiry: ' . $validated['subject'])
                    ->from(config('mail.from.address'), config('mail.from.name'))
                    ->replyTo($validated['email'], $validated['name']);
            });

            $notificationSent = true;
            Log::info('Notification email sent successfully to info@biashari.com');
        } catch (\Exception $e) {
            Log::error('Failed to send notification email to info@biashari.com', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }

        // Send confirmation email to inquirer
        try {
            Log::info('Attempting to send confirmation email to inquirer', [
                'email' => $validated['email']
            ]);

            Mail::send('emails.inquiry-confirmation', ['data' => $validated], function ($message) use ($validated) {
                $message->to($validated['email'])
                    ->subject('Thank you for contacting Biashari')
                    ->from(config('mail.from.address'), config('mail.from.name'));
            });

            $confirmationSent = true;
            Log::info('Confirmation email sent successfully to ' . $validated['email']);
        } catch (\Exception $e) {
            Log::error('Failed to send confirmation email', [
                'error' => $e->getMessage(),
                'email' => $validated['email'],
                'trace' => $e->getTraceAsString()
            ]);
        }

        // Log overall status
        Log::info('Inquiry submission completed', [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'notification_sent' => $notificationSent,
            'confirmation_sent' => $confirmationSent
        ]);

        if ($confirmationSent || $notificationSent) {
            return back()->with('success', 'Your inquiry has been submitted successfully!');
        } else {
            return back()->withErrors(['error' => 'There was an error submitting your inquiry. Please try again or contact us directly.']);
        }
    }
}
