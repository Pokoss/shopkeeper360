<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WithdrawalRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'wallet_id',
        'company_id',
        'payout_detail_id',
        'amount',
        'fee',
        'total_amount',
        'status',
        'notes',
        'admin_notes',
        'rejection_reason',
        'requested_by',
        'processed_by',
        'processed_at',
        'completed_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'fee' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'processed_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function payoutDetail()
    {
        return $this->belongsTo(PayoutDetail::class);
    }

    public function requestedBy()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    public function processedBy()
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    // Calculate fee based on payout type
    public static function calculateFee($payoutType, $amount)
    {
        if ($payoutType === 'mobile_money') {
            return 500; // 500 UGX for mobile money
        } elseif ($payoutType === 'bank') {
            return 6000; // 6,000 UGX for bank transfers
        }
        return 0;
    }

    // Get status badge color
    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'pending' => 'orange',
            'approved' => 'blue',
            'completed' => 'green',
            'rejected' => 'red',
            default => 'gray',
        };
    }

    // Get status label
    public function getStatusLabelAttribute()
    {
        return ucfirst($this->status);
    }
}
