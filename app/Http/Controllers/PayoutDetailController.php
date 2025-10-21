<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\PayoutDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PayoutDetailController extends Controller
{
    /**
     * Display payout details management page
     */
    public function index($companySlug)
    {
        $employee = Employee::where('user_id', Auth::id())
            ->whereHas('company', function ($query) use ($companySlug) {
                $query->where('slug', $companySlug);
            })
            ->with('company.category', 'user')
            ->firstOrFail();

        $payoutDetails = PayoutDetail::where('company_id', $employee->company_id)
            ->orderBy('is_default', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Wallet/PayoutDetails', [
            'company' => $employee,
            'payoutDetails' => $payoutDetails,
        ]);
    }

    /**
     * Store a new payout detail
     */
    public function store(Request $request, $companySlug)
    {
        $employee = Employee::where('user_id', Auth::id())
            ->whereHas('company', function ($query) use ($companySlug) {
                $query->where('slug', $companySlug);
            })
            ->firstOrFail();

        $validated = $request->validate([
            'type' => 'required|in:mobile_money,bank',
            'label' => 'nullable|string|max:255',
            'phone_number' => 'required_if:type,mobile_money|nullable|string',
            'network' => 'required_if:type,mobile_money|nullable|string',
            'account_name' => 'required|string|max:255', // Required for both mobile money (holder name) and bank
            'bank_name' => 'required_if:type,bank|nullable|string',
            'account_number' => 'required_if:type,bank|nullable|string',
            'branch' => 'nullable|string',
            'is_default' => 'boolean',
        ]);

        // Validate phone number format for mobile money
        if ($validated['type'] === 'mobile_money') {
            $phone = $validated['phone_number'];
            if (!preg_match('/^(07|\+?256|0)/', $phone)) {
                return back()->withErrors(['phone_number' => 'Phone number must start with 07, 256, or +256']);
            }
        }

        DB::beginTransaction();
        try {
            // If setting as default, unset other defaults of the same type
            if ($request->is_default) {
                PayoutDetail::where('company_id', $employee->company_id)
                    ->where('type', $validated['type'])
                    ->update(['is_default' => false]);
            }

            $payoutDetail = PayoutDetail::create([
                ...$validated,
                'company_id' => $employee->company_id,
            ]);

            DB::commit();
            return back()->with('success', 'Payout method added successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to add payout method']);
        }
    }

    /**
     * Update payout detail
     */
    public function update(Request $request, $companySlug, PayoutDetail $payoutDetail)
    {
        $employee = Employee::where('user_id', Auth::id())
            ->whereHas('company', function ($query) use ($companySlug) {
                $query->where('slug', $companySlug);
            })
            ->firstOrFail();

        // Ensure the payout detail belongs to this company
        if ($payoutDetail->company_id !== $employee->company_id) {
            abort(403);
        }

        $validated = $request->validate([
            'label' => 'nullable|string|max:255',
            'phone_number' => 'required_if:type,mobile_money|nullable|string',
            'network' => 'required_if:type,mobile_money|nullable|string',
            'account_name' => 'required|string|max:255', // Required for both mobile money and bank
            'bank_name' => 'required_if:type,bank|nullable|string',
            'account_number' => 'required_if:type,bank|nullable|string',
            'branch' => 'nullable|string',
            'is_default' => 'boolean',
        ]);

        DB::beginTransaction();
        try {
            // If setting as default, unset other defaults of the same type
            if ($request->is_default && !$payoutDetail->is_default) {
                PayoutDetail::where('company_id', $employee->company_id)
                    ->where('type', $payoutDetail->type)
                    ->where('id', '!=', $payoutDetail->id)
                    ->update(['is_default' => false]);
            }

            $payoutDetail->update($validated);

            DB::commit();
            return back()->with('success', 'Payout method updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to update payout method']);
        }
    }

    /**
     * Set default payout detail
     */
    public function setDefault($companySlug, PayoutDetail $payoutDetail)
    {
        $employee = Employee::where('user_id', Auth::id())
            ->whereHas('company', function ($query) use ($companySlug) {
                $query->where('slug', $companySlug);
            })
            ->firstOrFail();

        if ($payoutDetail->company_id !== $employee->company_id) {
            abort(403);
        }

        DB::beginTransaction();
        try {
            // Unset all defaults of the same type for this company
            PayoutDetail::where('company_id', $employee->company_id)
                ->where('type', $payoutDetail->type)
                ->update(['is_default' => false]);

            // Set this one as default
            $payoutDetail->update(['is_default' => true]);

            DB::commit();
            return back()->with('success', 'Default payout method updated');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to set default']);
        }
    }

    /**
     * Delete payout detail
     */
    public function destroy($companySlug, PayoutDetail $payoutDetail)
    {
        $employee = Employee::where('user_id', Auth::id())
            ->whereHas('company', function ($query) use ($companySlug) {
                $query->where('slug', $companySlug);
            })
            ->firstOrFail();

        if ($payoutDetail->company_id !== $employee->company_id) {
            abort(403);
        }

        // Check if this payout detail has pending withdrawal requests
        $hasPendingWithdrawals = $payoutDetail->withdrawalRequests()
            ->whereIn('status', ['pending', 'approved'])
            ->exists();

        if ($hasPendingWithdrawals) {
            return back()->withErrors(['error' => 'Cannot delete payout method with pending withdrawal requests']);
        }

        $payoutDetail->delete();
        return back()->with('success', 'Payout method deleted successfully');
    }
}
