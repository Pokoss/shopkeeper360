<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
    /**
     * Display the wallet page
     */
    public function index($companySlug)
    {
        $employee = Employee::whereHas('company', function ($query) use ($companySlug) {
            $query->where('slug', $companySlug);
        })->with('company.category', 'user')->where('user_id', Auth::id())->firstOrFail();

        $company = $employee->company;

        // Get or create wallet for the company
        $wallet = $company->wallet()->firstOrCreate([
            'company_id' => $company->id,
        ], [
            'balance' => 0,
            'currency' => 'UGX',
        ]);

        // Get recent transactions
        $transactions = $wallet->transactions()
            ->with('processedBy')
            ->paginate(20);

        // Get payout details for withdrawal options
        $payoutDetails = $company->payoutDetails()->get();

        // Get pending withdrawal requests
        $pendingWithdrawals = $company->withdrawalRequests()
            ->with(['payoutDetail', 'requestedBy'])
            ->whereIn('status', ['pending', 'approved'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Calculate available balance (wallet balance - pending withdrawals)
        $pendingAmount = $pendingWithdrawals->sum('total_amount');
        $availableBalance = $wallet->balance - $pendingAmount;

        return Inertia::render('Wallet/WalletScreen', [
            'company' => $employee,
            'wallet' => $wallet,
            'transactions' => $transactions,
            'payoutDetails' => $payoutDetails,
            'pendingWithdrawals' => $pendingWithdrawals,
            'availableBalance' => $availableBalance,
            'pendingAmount' => $pendingAmount,
        ]);
    }

    /**
     * Process a withdrawal
     */
    public function withdraw(Request $request, $companySlug)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'description' => 'required|string|max:255',
        ]);

        $employee = Employee::whereHas('company', function ($query) use ($companySlug) {
            $query->where('slug', $companySlug);
        })->with('company')->where('user_id', Auth::id())->firstOrFail();

        $company = $employee->company;
        $wallet = $company->wallet;

        if (!$wallet || $wallet->balance < $request->amount) {
            return back()->withErrors(['amount' => 'Insufficient wallet balance']);
        }

        try {
            $wallet->withdraw(
                $request->amount,
                'manual_withdrawal',
                $request->description,
                Auth::id()
            );

            return back()->with('success', 'Withdrawal successful. UGX ' . number_format($request->amount, 2) . ' has been withdrawn.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Process a manual deposit (for admin purposes)
     */
    public function deposit(Request $request, $companySlug)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'description' => 'required|string|max:255',
        ]);

        $employee = Employee::whereHas('company', function ($query) use ($companySlug) {
            $query->where('slug', $companySlug);
        })->with('company')->where('user_id', Auth::id())->firstOrFail();

        // Only allow owners to manually deposit
        if ($employee->position !== 'owner') {
            return back()->withErrors(['error' => 'Only business owners can make manual deposits']);
        }

        $company = $employee->company;
        $wallet = $company->wallet()->firstOrCreate([
            'company_id' => $company->id,
        ], [
            'balance' => 0,
            'currency' => 'UGX',
        ]);

        $wallet->deposit(
            $request->amount,
            'manual_deposit',
            $request->description,
            Auth::id()
        );

        return back()->with('success', 'Deposit successful. UGX ' . number_format($request->amount, 2) . ' has been added to your wallet.');
    }
}
