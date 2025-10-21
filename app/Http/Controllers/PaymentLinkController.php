<?php

namespace App\Http\Controllers;

use App\Models\PaymentLink;
use App\Models\Company;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PaymentLinkController extends Controller
{
    public function index($company)
    {
        // Get employee with company and user relationships
        $employee = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with(['company.category', 'user'])->where('user_id', Auth::id())->firstOrFail();

        $comp = $employee->company;

        $query = PaymentLink::with(['company', 'creator'])
            ->where('company_id', $comp->id);

        // Apply filters
        if (request('status')) {
            $query->where('status', request('status'));
        }

        if (request('search')) {
            $search = request('search');
            $query->where(function($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                  ->orWhere('customer_phone', 'like', "%{$search}%")
                  ->orWhere('link_code', 'like', "%{$search}%");
            });
        }

        $paymentLinks = $query->orderBy('created_at', 'desc')->paginate(15);
        
        $paymentLinks->through(function($link) {
            return [
                'id' => $link->id,
                'customer_name' => $link->customer_name,
                'customer_phone' => $link->customer_phone,
                'customer_email' => $link->customer_email,
                'amount' => $link->amount,
                'currency' => $link->currency,
                'formatted_amount' => $link->formatted_amount,
                'purpose' => $link->purpose,
                'link_code' => $link->link_code,
                'public_url' => $link->getPublicUrl(),
                'status' => $link->status,
                'status_label' => $link->status_label,
                'status_color' => $link->status_color,
                'expires_at' => $link->expires_at?->format('Y-m-d H:i:s'),
                'paid_at' => $link->paid_at?->format('Y-m-d H:i:s'),
                'created_at' => $link->created_at->format('Y-m-d H:i:s'),
                'created_by_name' => $link->creator?->name,
            ];
        });

        // Statistics
        $stats = [
            'total_links' => PaymentLink::where('company_id', $comp->id)->count(),
            'total_paid' => PaymentLink::where('company_id', $comp->id)->where('status', 'paid')->count(),
            'total_pending' => PaymentLink::where('company_id', $comp->id)->where('status', 'pending')->count(),
            'total_amount_paid' => PaymentLink::where('company_id', $comp->id)
                ->where('status', 'paid')
                ->sum('amount'),
            'total_amount_pending' => PaymentLink::where('company_id', $comp->id)
                ->where('status', 'pending')
                ->sum('amount'),
        ];

        return Inertia::render('Dashboard/PaymentLinks', [
            'company' => $employee,
            'paymentLinks' => $paymentLinks,
            'stats' => $stats,
            'filters' => request()->only(['status', 'search']),
        ]);
    }

    public function store(Request $request, $company)
    {
        $employee = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with(['company'])->where('user_id', Auth::id())->firstOrFail();

        $comp = $employee->company;

        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:255',
            'customer_email' => 'nullable|email|max:255',
            'amount' => 'required|numeric|min:1',
            'currency' => 'nullable|string|max:3',
            'purpose' => 'nullable|string|max:500',
            'notes' => 'nullable|string|max:1000',
            'expires_at' => 'nullable|date|after:now',
        ]);

        $paymentLink = PaymentLink::create([
            'company_id' => $comp->id,
            'customer_name' => $validated['customer_name'],
            'customer_phone' => $validated['customer_phone'],
            'customer_email' => $validated['customer_email'] ?? null,
            'amount' => $validated['amount'],
            'currency' => $validated['currency'] ?? 'UGX',
            'purpose' => $validated['purpose'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'expires_at' => $validated['expires_at'] ?? null,
            'created_by' => Auth::id(),
        ]);

        return back()->with('success', 'Payment link created successfully!');
    }

    public function show($company, $id)
    {
        $employee = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with(['company'])->where('user_id', Auth::id())->firstOrFail();

        $comp = $employee->company;

        $paymentLink = PaymentLink::with(['company', 'creator', 'walletTransaction'])
            ->where('company_id', $comp->id)
            ->findOrFail($id);

        return response()->json([
            'id' => $paymentLink->id,
            'customer_name' => $paymentLink->customer_name,
            'customer_phone' => $paymentLink->customer_phone,
            'customer_email' => $paymentLink->customer_email,
            'amount' => $paymentLink->amount,
            'currency' => $paymentLink->currency,
            'formatted_amount' => $paymentLink->formatted_amount,
            'purpose' => $paymentLink->purpose,
            'notes' => $paymentLink->notes,
            'link_code' => $paymentLink->link_code,
            'public_url' => $paymentLink->getPublicUrl(),
            'status' => $paymentLink->status,
            'status_label' => $paymentLink->status_label,
            'status_color' => $paymentLink->status_color,
            'transaction_reference' => $paymentLink->transaction_reference,
            'expires_at' => $paymentLink->expires_at?->format('Y-m-d H:i:s'),
            'paid_at' => $paymentLink->paid_at?->format('Y-m-d H:i:s'),
            'created_at' => $paymentLink->created_at->format('Y-m-d H:i:s'),
            'created_by_name' => $paymentLink->creator?->name,
            'wallet_transaction' => $paymentLink->walletTransaction,
        ]);
    }

    public function cancel(Request $request, $company, $id)
    {
        $employee = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with(['company'])->where('user_id', Auth::id())->firstOrFail();

        $comp = $employee->company;

        $paymentLink = PaymentLink::where('company_id', $comp->id)->findOrFail($id);

        if ($paymentLink->status !== 'pending') {
            return back()->with('error', 'Only pending payment links can be cancelled.');
        }

        $paymentLink->cancel($request->input('reason'));

        return back()->with('success', 'Payment link cancelled successfully.');
    }

    public function destroy($company, $id)
    {
        $employee = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with(['company'])->where('user_id', Auth::id())->firstOrFail();

        $comp = $employee->company;

        $paymentLink = PaymentLink::where('company_id', $comp->id)->findOrFail($id);

        // Only allow deletion of pending or cancelled links
        if (in_array($paymentLink->status, ['paid'])) {
            return back()->with('error', 'Cannot delete paid payment links.');
        }

        $paymentLink->delete();

        return back()->with('success', 'Payment link deleted successfully.');
    }
}
