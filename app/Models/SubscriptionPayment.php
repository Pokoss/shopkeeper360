<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'user_id',
        'pricing_plan_id',
        'plan_name',
        'plan_type',
        'amount',
        'currency',
        'transaction_reference',
        'payment_method',
        'status',
        'subscription_start',
        'subscription_end',
        'payment_details',
        'receipt_number',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'subscription_start' => 'datetime',
        'subscription_end' => 'datetime',
        'payment_details' => 'array',
    ];

    /**
     * Relationships
     */
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pricingPlan()
    {
        return $this->belongsTo(PricingPlan::class);
    }

    /**
     * Accessors
     */
    public function getFormattedAmountAttribute()
    {
        return $this->currency . ' ' . number_format($this->amount, 0);
    }

    /**
     * Scopes
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    public function scopeByCompany($query, $companyId)
    {
        return $query->where('company_id', $companyId);
    }

    /**
     * Generate unique receipt number
     */
    public static function generateReceiptNumber()
    {
        $prefix = 'SUB-';
        $timestamp = now()->format('YmdHis');
        $random = strtoupper(substr(md5(uniqid(rand(), true)), 0, 4));
        
        return $prefix . $timestamp . '-' . $random;
    }
}
