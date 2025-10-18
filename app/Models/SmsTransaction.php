<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmsTransaction extends Model
{
    use HasFactory;

    protected $table = 'sms_transactions';

    protected $fillable = [
        'company_id',
        'user_id',
        'sms_bundle_id',
        'sms_count',
        'amount',
        'currency',
        'transaction_reference',
        'payment_method',
        'status',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'sms_count' => 'integer',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function smsBundle()
    {
        return $this->belongsTo(SmsBundle::class, 'sms_bundle_id');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }
}
