<?php

namespace App\Http\Controllers;

use App\Models\PaymentFee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentFeeController extends Controller
{
    public function index()
    {
        $fees = PaymentFee::orderBy('fee_type')->orderBy('priority')->get();

        return Inertia::render('Admin/PaymentFees', [
            'fees' => $fees
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fee_type' => 'required|in:platform,gateway',
            'name' => 'required|string|max:255',
            'min_amount' => 'required|numeric|min:0',
            'max_amount' => 'nullable|numeric|gt:min_amount',
            'calculation_type' => 'required|in:fixed,percentage',
            'fee_value' => 'required|numeric|min:0',
            'is_active' => 'boolean',
            'priority' => 'integer|min:0',
        ]);

        $fee = PaymentFee::create($validated);

        return redirect()->back()->with('success', 'Payment fee created successfully');
    }

    public function update(Request $request, PaymentFee $paymentFee)
    {
        $validated = $request->validate([
            'fee_type' => 'required|in:platform,gateway',
            'name' => 'required|string|max:255',
            'min_amount' => 'required|numeric|min:0',
            'max_amount' => 'nullable|numeric|gt:min_amount',
            'calculation_type' => 'required|in:fixed,percentage',
            'fee_value' => 'required|numeric|min:0',
            'is_active' => 'boolean',
            'priority' => 'integer|min:0',
        ]);

        $paymentFee->update($validated);

        return redirect()->back()->with('success', 'Payment fee updated successfully');
    }

    public function destroy(PaymentFee $paymentFee)
    {
        $paymentFee->delete();

        return redirect()->back()->with('success', 'Payment fee deleted successfully');
    }

    public function toggleStatus(PaymentFee $paymentFee)
    {
        $paymentFee->update([
            'is_active' => !$paymentFee->is_active
        ]);

        return redirect()->back()->with('success', 'Fee status updated successfully');
    }
}
