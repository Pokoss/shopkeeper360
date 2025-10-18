<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmsTopup extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'sms_bundle_id',
        'sms_count',
        'amount',
        'transaction_reference',
        'payment_method',
        'paid_by',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function bundle()
    {
        return $this->belongsTo(SmsBundle::class, 'sms_bundle_id');
    }

    public function paidBy()
    {
        return $this->belongsTo(User::class, 'paid_by');
    }
}
