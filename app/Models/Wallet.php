<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'balance',
        'currency',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
    ];

    /**
     * Get the company that owns the wallet
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get all transactions for this wallet
     */
    public function transactions()
    {
        return $this->hasMany(WalletTransaction::class)->orderBy('created_at', 'desc');
    }

    /**
     * Get all withdrawal requests for this wallet
     */
    public function withdrawalRequests()
    {
        return $this->hasMany(WithdrawalRequest::class)->orderBy('created_at', 'desc');
    }

    /**
     * Add funds to the wallet
     */
    public function deposit(float $amount, string $type, string $description, ?int $userId = null)
    {
        $this->increment('balance', $amount);
        
        return $this->transactions()->create([
            'type' => 'deposit',
            'transaction_type' => $type,
            'amount' => $amount,
            'balance_after' => $this->fresh()->balance,
            'description' => $description,
            'processed_by' => $userId,
        ]);
    }

    /**
     * Withdraw funds from the wallet (direct - not recommended, use withdrawal request instead)
     */
    public function withdraw(float $amount, string $type, string $description, ?int $userId = null)
    {
        if ($this->balance < $amount) {
            throw new \Exception('Insufficient wallet balance');
        }

        $this->decrement('balance', $amount);
        
        return $this->transactions()->create([
            'type' => 'withdrawal',
            'transaction_type' => $type,
            'amount' => $amount,
            'balance_after' => $this->fresh()->balance,
            'description' => $description,
            'processed_by' => $userId,
        ]);
    }

    /**
     * Process completed withdrawal (called when admin completes the withdrawal)
     */
    public function processWithdrawal(WithdrawalRequest $withdrawalRequest)
    {
        if ($this->balance < $withdrawalRequest->total_amount) {
            throw new \Exception('Insufficient wallet balance');
        }

        $this->decrement('balance', $withdrawalRequest->total_amount);
        
        return $this->transactions()->create([
            'type' => 'withdrawal',
            'transaction_type' => 'withdrawal_request',
            'amount' => $withdrawalRequest->total_amount,
            'balance_after' => $this->fresh()->balance,
            'description' => 'Withdrawal to ' . $withdrawalRequest->payoutDetail->display_name,
            'reference' => 'WR-' . $withdrawalRequest->id,
            'processed_by' => $withdrawalRequest->processed_by,
        ]);
    }

    /**
     * Check if wallet has sufficient balance for withdrawal including fee
     */
    public function hasSufficientBalance(float $amount, float $fee): bool
    {
        return $this->balance >= ($amount + $fee);
    }
}
