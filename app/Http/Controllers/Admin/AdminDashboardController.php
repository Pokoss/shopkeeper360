<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Company;
use App\Models\PricingPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $currentMonth = (int) date('n');
        $currentYear = (int) date('Y');

        // Get statistics
        $stats = [
            'totalUsers' => User::count(),
            'totalCompanies' => Company::count(),
            'adminUsers' => User::where('admin', '>=', 1)->count(),
            'activeSessions' => User::whereNotNull('last_login_at')
                ->where('last_login_at', '>=', now()->subHours(24))
                ->count(),
            'activeSubscriptions' => Company::whereNotNull('subscription_expiry')
                ->where('subscription_expiry', '>=', now())
                ->count(),
            'monthTransactions' => DB::table('sales')
                ->whereYear('created_at', $currentYear)
                ->whereMonth('created_at', $currentMonth)
                ->distinct('company_id')
                ->count('company_id'),
        ];

        return Inertia::render('Admin/AdminDashboard', [
            'stats' => $stats,
        ]);
    }

    /**
     * Display all users.
     *
     * @return \Inertia\Response
     */
    public function users()
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $users = User::with(['companies', 'employees.company'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Display admin users only.
     *
     * @return \Inertia\Response
     */
    public function adminUsers()
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $adminUsers = User::where('admin', '>=', 1)
            ->orderBy('admin', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Users/AdminUsers', [
            'adminUsers' => $adminUsers,
        ]);
    }

    /**
     * Display all companies.
     *
     * @return \Inertia\Response
     */
    public function companies()
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $companies = Company::with(['owner', 'employees.user'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Companies/Index', [
            'companies' => $companies,
        ]);
    }

    /**
     * Update user admin level.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $userId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateAdminLevel(Request $request, $userId)
    {
        // Check if current user is admin level 2 or higher
        if (auth()->user()->admin < 2) {
            abort(403, 'Unauthorized. Super admin privileges required to modify admin levels.');
        }

        $request->validate([
            'admin_level' => 'required|integer|min:0|max:10',
        ]);

        $user = User::findOrFail($userId);
        
        // Prevent users from modifying their own admin level
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot modify your own admin level.');
        }

        $user->admin = $request->admin_level;
        $user->save();

        return back()->with('success', 'Admin level updated successfully.');
    }

    /**
     * Delete a user.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deleteUser($userId)
    {
        // Check if current user is admin level 2 or higher
        if (auth()->user()->admin < 2) {
            abort(403, 'Unauthorized. Super admin privileges required to delete users.');
        }

        $user = User::findOrFail($userId);
        
        // Prevent users from deleting their own account
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        // Delete the user
        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }

    /**
     * Show the form for editing a company.
     *
     * @param  int  $companyId
     * @return \Inertia\Response
     */
    public function editCompany($companyId)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $company = Company::with(['owner', 'employees.user', 'category'])
            ->findOrFail($companyId);

        // Get all business categories
        $categories = \App\Models\BusinessCategory::orderBy('name', 'asc')->get();

        return Inertia::render('Admin/Companies/Edit', [
            'company' => $company,
            'categories' => $categories,
        ]);
    }

    /**
     * Update a company.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $companyId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateCompany(Request $request, $companyId)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $company = Company::findOrFail($companyId);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contacts' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'category_id' => 'nullable|exists:business_category,id',
            'latitude' => 'nullable|string|max:50',
            'longitude' => 'nullable|string|max:50',
            'subscription_date' => 'nullable|date',
            'subscription_expiry' => 'nullable|date|after_or_equal:subscription_date',
            'plan' => 'required|in:basic,standard,premium',
            'slogan' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive,suspended',
        ]);

        // Convert date strings to datetime format if they exist
        if ($validated['subscription_date']) {
            $validated['subscription_date'] = $validated['subscription_date'] . ' 00:00:00';
        }
        if ($validated['subscription_expiry']) {
            $validated['subscription_expiry'] = $validated['subscription_expiry'] . ' 23:59:59';
        }

        $company->update($validated);

        return redirect()->route('admin.companies')->with('success', 'Company updated successfully.');
    }

    /**
     * Display analytics and reports navigation.
     *
     * @return \Inertia\Response
     */
    public function analytics()
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        return Inertia::render('Admin/Analytics/AnalyticsIndex');
    }

    /**
     * Display companies analytics with pagination.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function companiesAnalytics(Request $request)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $currentMonth = (int) date('n');
        $currentYear = (int) date('Y');

        $month = $request->get('month', $currentMonth);
        $year = $request->get('year', $currentYear);

        $companies = Company::with('owner')
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Analytics/Companies', [
            'companies' => $companies,
            'currentMonth' => $currentMonth,
            'currentYear' => $currentYear,
        ]);
    }

    /**
     * Display users analytics with pagination.
     *
     * @return \Inertia\Response
     */
    public function usersAnalytics()
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $users = User::orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Analytics/Users', [
            'users' => $users,
        ]);
    }

    /**
     * Display subscriptions analytics with pagination.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function subscriptionsAnalytics(Request $request)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $status = $request->get('status', 'active');

        if ($status === 'inactive') {
            // Get companies with expired or no subscriptions
            $subscriptions = Company::where(function($query) {
                    $query->whereNull('subscription_expiry')
                          ->orWhere('subscription_expiry', '<', now());
                })
                ->orderBy('subscription_expiry', 'desc')
                ->paginate(20);
        } else {
            // Get companies with active subscriptions
            $subscriptions = Company::whereNotNull('subscription_expiry')
                ->where('subscription_expiry', '>=', now())
                ->orderBy('subscription_expiry', 'asc')
                ->paginate(20);
        }

        return Inertia::render('Admin/Analytics/Subscriptions', [
            'subscriptions' => $subscriptions,
            'currentStatus' => $status,
        ]);
    }

    /**
     * Display transactions analytics with pagination.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function transactionsAnalytics(Request $request)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $currentMonth = (int) date('n');
        $currentYear = (int) date('Y');

        $month = $request->get('month', $currentMonth);
        $year = $request->get('year', $currentYear);

        // Get total transaction count for the period
        $totalTransactionCount = DB::table('sales')
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->count();

        // Get paginated transactions
        $transactions = DB::table('sales')
            ->join('company', 'sales.company_id', '=', 'company.id')
            ->select(
                'company.id as company_id',
                'company.name as company_name',
                'company.plan',
                DB::raw('COUNT(DISTINCT sales.id) as transaction_count')
            )
            ->whereYear('sales.created_at', $year)
            ->whereMonth('sales.created_at', $month)
            ->groupBy('company.id', 'company.name', 'company.plan')
            ->orderBy('transaction_count', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Analytics/Transactions', [
            'transactions' => $transactions,
            'totalTransactionCount' => $totalTransactionCount,
            'currentMonth' => $currentMonth,
            'currentYear' => $currentYear,
        ]);
    }

    /**
     * Display all business categories.
     *
     * @return \Inertia\Response
     */
    public function businessCategories()
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $categories = \App\Models\BusinessCategory::orderBy('name', 'asc')->get();

        return Inertia::render('Admin/BusinessCategories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a new business category.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function storeBusinessCategory(Request $request)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:business_category,slug',
        ]);

        \App\Models\BusinessCategory::create($validated);

        return redirect()->route('admin.business-categories')->with('success', 'Business category created successfully.');
    }

    /**
     * Update a business category.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $categoryId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateBusinessCategory(Request $request, $categoryId)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $category = \App\Models\BusinessCategory::findOrFail($categoryId);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:business_category,slug,' . $categoryId,
        ]);

        $category->update($validated);

        return redirect()->route('admin.business-categories')->with('success', 'Business category updated successfully.');
    }

    /**
     * Display all measurements.
     *
     * @return \Inertia\Response
     */
    public function measurements()
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $measurements = \App\Models\Measurement::orderBy('name', 'asc')->get();

        return Inertia::render('Admin/Measurements/Index', [
            'measurements' => $measurements,
        ]);
    }

    /**
     * Store a new measurement.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function storeMeasurement(Request $request)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'abbriviation' => 'required|string|max:50',
        ]);

        \App\Models\Measurement::create($validated);

        return redirect()->route('admin.measurements')->with('success', 'Measurement created successfully.');
    }

    /**
     * Update a measurement.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $measurementId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateMeasurement(Request $request, $measurementId)
    {
        // Check if user is admin
        if (auth()->user()->admin < 1) {
            abort(403, 'Unauthorized access. Admin privileges required.');
        }

        $measurement = \App\Models\Measurement::findOrFail($measurementId);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'abbriviation' => 'required|string|max:50',
        ]);

        $measurement->update($validated);

        return redirect()->route('admin.measurements')->with('success', 'Measurement updated successfully.');
    }

    /**
     * Display pricing plans management page
     */
    public function pricingPlans()
    {
        // Check if user is super admin
        if (auth()->user()->admin < 2) {
            abort(403, 'Unauthorized access. Super Admin privileges required.');
        }

        $plans = PricingPlan::ordered()->get();

        return Inertia::render('Admin/PricingPlans/Index', [
            'plans' => $plans,
        ]);
    }

    /**
     * Store a new pricing plan
     */
    public function storePricingPlan(Request $request)
    {
        // Check if user is super admin
        if (auth()->user()->admin < 2) {
            abort(403, 'Unauthorized access. Super Admin privileges required.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pricing_plans,slug',
            'price' => 'required|numeric|min:0',
            'currency' => 'required|string|max:10',
            'badge' => 'nullable|string|max:255',
            'features' => 'required|array',
            'features.*' => 'required|string',
            'color' => 'nullable|string|max:255',
            'is_highlighted' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        PricingPlan::create($validated);

        return redirect()->route('admin.pricing-plans')->with('success', 'Pricing plan created successfully.');
    }

    /**
     * Update a pricing plan
     */
    public function updatePricingPlan(Request $request, PricingPlan $plan)
    {
        // Check if user is super admin
        if (auth()->user()->admin < 2) {
            abort(403, 'Unauthorized access. Super Admin privileges required.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pricing_plans,slug,' . $plan->id,
            'price' => 'required|numeric|min:0',
            'currency' => 'required|string|max:10',
            'badge' => 'nullable|string|max:255',
            'features' => 'required|array',
            'features.*' => 'required|string',
            'color' => 'nullable|string|max:255',
            'is_highlighted' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $plan->update($validated);

        return redirect()->route('admin.pricing-plans')->with('success', 'Pricing plan updated successfully.');
    }

    /**
     * Delete a pricing plan
     */
    public function deletePricingPlan(PricingPlan $plan)
    {
        // Check if user is super admin
        if (auth()->user()->admin < 2) {
            abort(403, 'Unauthorized access. Super Admin privileges required.');
        }

        $plan->delete();

        return redirect()->route('admin.pricing-plans')->with('success', 'Pricing plan deleted successfully.');
    }
}
