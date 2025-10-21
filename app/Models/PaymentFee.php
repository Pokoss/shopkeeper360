<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentFee extends Model
{
    use HasFactory;

    protected $fillable = [
        'fee_type',
        'name',
        'min_amount',
        'max_amount',
        'calculation_type',
        'fee_value',
        'is_active',
        'priority',
    ];

    protected $casts = [
        'min_amount' => 'decimal:2',
        'max_amount' => 'decimal:2',
        'fee_value' => 'decimal:2',
        'is_active' => 'boolean',
        'priority' => 'integer',
    ];

    /**
     * Calculate fees for a given amount
     */
    public static function calculateFees($amount)
    {
        $platformFee = self::calculatePlatformFee($amount);
        $gatewayFee = self::calculateGatewayFee($amount);
        $totalFees = $platformFee + $gatewayFee;
        $totalAmount = $amount + $totalFees;

        return [
            'base_amount' => (float) $amount,
            'platform_fee' => (float) $platformFee,
            'gateway_fee' => (float) $gatewayFee,
            'total_fees' => (float) $totalFees,
            'total_amount' => (float) $totalAmount,
        ];
    }

    /**
     * Calculate platform fee for a given amount
     */
    public static function calculatePlatformFee($amount)
    {
        return self::calculateFeeByType($amount, 'platform');
    }

    /**
     * Calculate gateway fee for a given amount
     */
    public static function calculateGatewayFee($amount)
    {
        return self::calculateFeeByType($amount, 'gateway');
    }

    /**
     * Calculate fee by type
     */
    private static function calculateFeeByType($amount, $feeType)
    {
        $fee = self::where('fee_type', $feeType)
            ->where('is_active', true)
            ->where('min_amount', '<=', $amount)
            ->where(function ($query) use ($amount) {
                $query->whereNull('max_amount')
                    ->orWhere('max_amount', '>=', $amount);
            })
            ->orderBy('priority', 'asc')
            ->first();

        if (!$fee) {
            return 0;
        }

        if ($fee->calculation_type === 'fixed') {
            return (float) $fee->fee_value;
        } else {
            // Percentage calculation
            return ($amount * $fee->fee_value) / 100;
        }
    }

    /**
     * Get fee breakdown as formatted array
     */
    public static function getFeeBreakdown($amount)
    {
        $fees = self::calculateFees($amount);
        
        return [
            [
                'label' => 'Payment Amount',
                'amount' => $fees['base_amount'],
                'formatted' => number_format($fees['base_amount'], 0) . ' UGX',
            ],
            [
                'label' => 'Platform Fee',
                'amount' => $fees['platform_fee'],
                'formatted' => number_format($fees['platform_fee'], 0) . ' UGX',
            ],
            [
                'label' => 'Gateway Fee',
                'amount' => $fees['gateway_fee'],
                'formatted' => number_format($fees['gateway_fee'], 0) . ' UGX',
            ],
            [
                'label' => 'Total Amount',
                'amount' => $fees['total_amount'],
                'formatted' => number_format($fees['total_amount'], 0) . ' UGX',
                'is_total' => true,
            ],
        ];
    }
}
