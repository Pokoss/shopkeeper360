<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WithdrawalRequest;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Mail\WithdrawalApproved;
use App\Mail\WithdrawalRejected;
use App\Mail\WithdrawalCompleted;

class AdminWithdrawalController extends Controller
{
    /**
     * Display all withdrawal requests
     */
    public function index(Request $request)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $query = WithdrawalRequest::with([
            'company',
            'wallet',
            'payoutDetail',
            'requestedBy',
            'processedBy'
        ]);

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by company name
        if ($request->has('search') && $request->search) {
            $query->whereHas('company', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }

        // Sort by creation date (newest first)
        $query->orderBy('created_at', 'desc');

        $withdrawalRequests = $query->paginate(20)->withQueryString();

        // Calculate summary statistics
        $stats = [
            'pending' => WithdrawalRequest::where('status', 'pending')->count(),
            'approved' => WithdrawalRequest::where('status', 'approved')->count(),
            'completed' => WithdrawalRequest::where('status', 'completed')->count(),
            'rejected' => WithdrawalRequest::where('status', 'rejected')->count(),
            'pendingAmount' => WithdrawalRequest::where('status', 'pending')->sum('total_amount'),
            'approvedAmount' => WithdrawalRequest::where('status', 'approved')->sum('total_amount'),
        ];

        return Inertia::render('Admin/WithdrawalRequests', [
            'withdrawalRequests' => $withdrawalRequests,
            'stats' => $stats,
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Show details of a specific withdrawal request
     */
    public function show($id)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $withdrawalRequest = WithdrawalRequest::with([
            'company',
            'wallet',
            'payoutDetail',
            'requestedBy',
            'processedBy'
        ])->findOrFail($id);

        return Inertia::render('Admin/WithdrawalRequestDetails', [
            'withdrawalRequest' => $withdrawalRequest,
        ]);
    }

    /**
     * Approve a withdrawal request
     */
    public function approve(Request $request, $id)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $validated = $request->validate([
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $withdrawalRequest = WithdrawalRequest::with(['company', 'wallet', 'payoutDetail', 'requestedBy'])
            ->findOrFail($id);

        if ($withdrawalRequest->status !== 'pending') {
            return back()->withErrors(['error' => 'Only pending requests can be approved']);
        }

        // Check if wallet has sufficient balance
        if ($withdrawalRequest->wallet->balance < $withdrawalRequest->total_amount) {
            return back()->withErrors(['error' => 'Insufficient wallet balance for this withdrawal']);
        }

        DB::beginTransaction();
        try {
            $withdrawalRequest->update([
                'status' => 'approved',
                'admin_notes' => $validated['admin_notes'] ?? null,
                'processed_by' => Auth::id(),
                'processed_at' => now(),
            ]);

            // Send approval email to business
            if ($withdrawalRequest->company->email) {
                try {
                    Mail::to($withdrawalRequest->company->email)->send(new WithdrawalApproved($withdrawalRequest));
                } catch (\Exception $e) {
                    Log::error('Failed to send withdrawal approval email: ' . $e->getMessage());
                }
            }

            DB::commit();

            return back()->with('success', 'Withdrawal request approved successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to approve withdrawal request: ' . $e->getMessage()]);
        }
    }

    /**
     * Reject a withdrawal request
     */
    public function reject(Request $request, $id)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $validated = $request->validate([
            'rejection_reason' => 'required|string|max:1000',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $withdrawalRequest = WithdrawalRequest::with(['company', 'wallet', 'payoutDetail', 'requestedBy'])
            ->findOrFail($id);

        if ($withdrawalRequest->status !== 'pending') {
            return back()->withErrors(['error' => 'Only pending requests can be rejected']);
        }

        DB::beginTransaction();
        try {
            $withdrawalRequest->update([
                'status' => 'rejected',
                'rejection_reason' => $validated['rejection_reason'],
                'admin_notes' => $validated['admin_notes'] ?? null,
                'processed_by' => Auth::id(),
                'processed_at' => now(),
            ]);

            // Send rejection email to business
            if ($withdrawalRequest->company->email) {
                try {
                    Mail::to($withdrawalRequest->company->email)->send(new WithdrawalRejected($withdrawalRequest));
                } catch (\Exception $e) {
                    Log::error('Failed to send withdrawal rejection email: ' . $e->getMessage());
                }
            }

            DB::commit();

            return back()->with('success', 'Withdrawal request rejected');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to reject withdrawal request: ' . $e->getMessage()]);
        }
    }

    /**
     * Mark a withdrawal request as completed (money has been sent)
     */
    public function complete(Request $request, $id)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $validated = $request->validate([
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $withdrawalRequest = WithdrawalRequest::with(['company', 'wallet', 'payoutDetail', 'requestedBy'])
            ->findOrFail($id);

        if ($withdrawalRequest->status !== 'approved') {
            return back()->withErrors(['error' => 'Only approved requests can be marked as completed']);
        }

        DB::beginTransaction();
        try {
            // Deduct the amount from wallet
            $wallet = $withdrawalRequest->wallet;
            
            if ($wallet->balance < $withdrawalRequest->total_amount) {
                return back()->withErrors(['error' => 'Insufficient wallet balance for this withdrawal']);
            }

            // Process the withdrawal through the wallet model
            $wallet->processWithdrawal($withdrawalRequest);

            // Update withdrawal request status
            $withdrawalRequest->update([
                'status' => 'completed',
                'admin_notes' => $validated['admin_notes'] ?? $withdrawalRequest->admin_notes,
                'completed_at' => now(),
            ]);

            // Send completion email to business
            if ($withdrawalRequest->company->email) {
                try {
                    Mail::to($withdrawalRequest->company->email)->send(new WithdrawalCompleted($withdrawalRequest));
                } catch (\Exception $e) {
                    Log::error('Failed to send withdrawal completion email: ' . $e->getMessage());
                }
            }

            DB::commit();

            return back()->with('success', 'Withdrawal completed and funds deducted from wallet');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to complete withdrawal: ' . $e->getMessage()]);
        }
    }

    /**
     * Bulk approve multiple withdrawal requests
     */
    public function bulkApprove(Request $request)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|exists:withdrawal_requests,id',
        ]);

        $approved = 0;
        $failed = 0;

        foreach ($validated['ids'] as $id) {
            $withdrawalRequest = WithdrawalRequest::with(['company', 'wallet'])->find($id);
            
            if ($withdrawalRequest && $withdrawalRequest->status === 'pending' && 
                $withdrawalRequest->wallet->balance >= $withdrawalRequest->total_amount) {
                
                $withdrawalRequest->update([
                    'status' => 'approved',
                    'processed_by' => Auth::id(),
                    'processed_at' => now(),
                ]);

                // Send approval email
                if ($withdrawalRequest->company->email) {
                    try {
                        Mail::to($withdrawalRequest->company->email)->send(new WithdrawalApproved($withdrawalRequest));
                    } catch (\Exception $e) {
                        Log::error('Failed to send bulk approval email: ' . $e->getMessage());
                    }
                }

                $approved++;
            } else {
                $failed++;
            }
        }

        return back()->with('success', "Approved {$approved} requests. {$failed} failed or were invalid.");
    }
}
