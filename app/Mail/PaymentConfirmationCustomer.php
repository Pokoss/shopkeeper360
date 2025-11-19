<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\PaymentLink;

class PaymentConfirmationCustomer extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $paymentLink;
    public $feeBreakdown;

    /**
     * Create a new message instance.
     */
    public function __construct(PaymentLink $paymentLink, array $feeBreakdown)
    {
        $this->paymentLink = $paymentLink;
        $this->feeBreakdown = $feeBreakdown;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Payment Confirmation - ' . $this->paymentLink->link_code,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.payment-confirmation-customer',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
