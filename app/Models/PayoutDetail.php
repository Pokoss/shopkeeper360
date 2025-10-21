<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayoutDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'type',
        'label',
        'phone_number',
        'network',
        'bank_name',
        'account_name',
        'account_number',
        'branch',
        'is_default',
        'is_verified',
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'is_verified' => 'boolean',
    ];

    protected $appends = [
        'formatted_phone',
        'display_name',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function withdrawalRequests()
    {
        return $this->hasMany(WithdrawalRequest::class);
    }

    // Format phone number for display
    public function getFormattedPhoneAttribute()
    {
        if (!$this->phone_number) return null;
        
        $phone = $this->phone_number;
        if (str_starts_with($phone, '+256')) {
            return $phone;
        } elseif (str_starts_with($phone, '256')) {
            return '+' . $phone;
        } elseif (str_starts_with($phone, '0')) {
            return '+256' . substr($phone, 1);
        }
        return $phone;
    }

    // Get masked account number for security
    public function getMaskedAccountNumberAttribute()
    {
        if (!$this->account_number) return null;
        
        $length = strlen($this->account_number);
        if ($length <= 4) return $this->account_number;
        
        return str_repeat('*', $length - 4) . substr($this->account_number, -4);
    }

    // Get display name
    public function getDisplayNameAttribute()
    {
        if ($this->label) return $this->label;
        
        if ($this->type === 'mobile_money') {
            return $this->network . ' - ' . $this->account_name . ' (' . $this->formatted_phone . ')';
        }
        
        return $this->bank_name . ' - ' . $this->account_name;
    }
}
