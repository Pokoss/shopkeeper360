<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PaymentLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'customer_name',
        'customer_phone',
        'customer_email',
        'amount',
        'currency',
        'purpose',
        'notes',
        'link_code',
        'status',
        'transaction_reference',
        'flutterwave_tx_ref',
        'expires_at',
        'paid_at',
        'created_by',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'expires_at' => 'datetime',
        'paid_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = [
        'formatted_amount',
        'status_color',
        'status_label',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($paymentLink) {
            if (empty($paymentLink->link_code)) {
                $paymentLink->link_code = self::generateUniqueLinkCode();
            }
        });
    }

    // Relationships
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function walletTransaction()
    {
        return $this->hasOne(WalletTransaction::class, 'reference', 'link_code')
            ->where('source', 'payment_link');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'pending')
            ->where(function ($q) {
                $q->whereNull('expires_at')
                  ->orWhere('expires_at', '>', now());
            });
    }

    public function scopeExpired($query)
    {
        return $query->where('status', 'pending')
            ->whereNotNull('expires_at')
            ->where('expires_at', '<=', now());
    }

    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    // Methods
    public static function generateUniqueLinkCode()
    {
        do {
            $code = 'plk_' . strtoupper(Str::random(7));
        } while (self::where('link_code', $code)->exists());

        return $code;
    }

    public function getPublicUrl()
    {
        return url('/pay/' . $this->link_code);
    }

    public function markAsPaid($transactionReference, $flutterwaveTxRef = null)
    {
        $this->update([
            'status' => 'paid',
            'paid_at' => now(),
            'transaction_reference' => $transactionReference,
            'flutterwave_tx_ref' => $flutterwaveTxRef ?? $this->flutterwave_tx_ref,
        ]);
    }

    public function isExpired()
    {
        if (!$this->expires_at) {
            return false;
        }

        return $this->expires_at->isPast() && $this->status === 'pending';
    }

    public function canBePaid()
    {
        return $this->status === 'pending' && !$this->isExpired();
    }

    public function cancel($reason = null)
    {
        $this->update([
            'status' => 'cancelled',
            'notes' => $this->notes . "\n\nCancellation reason: " . ($reason ?? 'Cancelled by user'),
        ]);
    }

    // Accessors
    public function getFormattedAmountAttribute()
    {
        return number_format((float)$this->amount, 0) . ' ' . $this->currency;
    }

    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'paid' => 'green',
            'pending' => 'orange',
            'expired' => 'gray',
            'cancelled' => 'red',
            default => 'gray',
        };
    }

    public function getStatusLabelAttribute()
    {
        return match($this->status) {
            'paid' => 'Paid',
            'pending' => 'Pending',
            'expired' => 'Expired',
            'cancelled' => 'Cancelled',
            default => ucfirst($this->status),
        };
    }
}
