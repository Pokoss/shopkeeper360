<?php

namespace App\Http\Controllers;

use App\Models\DashboardHome;
use App\Models\Employee;
use App\Models\Order;
use App\Models\Product;
use App\Models\Receipt;
use App\Models\Sale;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardHomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */public function index(Request $request, $company)
{
    $search_text = $request->input('search');
    $comp = Employee::whereHas('company', function ($query) use ($company) {
        $query->where('slug', $company);
    })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

    if(($comp->company->status == 'inactive')){
        return Inertia::render('StartTrialScreen', ['company' => $comp,]);
    }
    if(($comp->company->status == 'active' && $comp->company->subscription_expiry < Carbon::now())){
        return Inertia::render('SubscriptionExpiredScreen', ['company' => $comp,]);
    }

    // Initialize variables
    $salesData = [];
    $sales_today = 0;
    $profit = 0;

    // Check if user is admin/owner/accountant
    $isAdmin = $comp->position == 'admin' || $comp->position == 'owner' || $comp->position == 'accountant';

    // Build base queries
    $receiptQuery = Receipt::where('company_id', $comp->company->id);
    $saleQuery = Sale::where('company_id', $comp->company->id);

    // Apply user filter for non-admin roles
    if (!$isAdmin) {
        $receiptQuery->where('sold_by', $comp->user_id);
        $saleQuery->where('sold_by', $comp->user_id);
    }

    // === TODAY'S PROFIT CALCULATION ===
    $sales_profit = (clone $saleQuery)->whereDate('created_at', Carbon::today())->get();
    
    foreach ($sales_profit as $p) {
        $profit += ($p->sale_price - ($p->cost_price * $p->quantity));
    }

    $discount = (clone $receiptQuery)->whereDate('created_at', Carbon::today())->sum('discount');
    $profit -= $discount;
    // === END TODAY'S PROFIT CALCULATION ===

    // Loop through the last 7 days
    for ($i = 6; $i >= 0; $i--) {
        $date = Carbon::now()->subDays($i);
        $dayLabel = $date->format('l');
        
        // Clone the query to avoid modifying the base query
        $dailyReceiptQuery = clone $receiptQuery;
        $totalSales = $dailyReceiptQuery->whereDate('created_at', $date->toDateString())->sum('sale_total');
        
        $salesData[] = [
            'day' => $dayLabel,
            'total_sales' => $totalSales
        ];
    }

    // Get today's sales for sales_today calculation
    $todaySales = (clone $receiptQuery)->whereDate('created_at', Carbon::today())->get();
    
    foreach ($todaySales as $sale) {
        $sales_today += ($sale->sale_total - $sale->discount);
    }

    $onlineOrders = Order::where('status', 'pending')->where('company_id', $comp->company->id)->count();

    $threeMonthsAgo = Carbon::now()->subMonths(1);
    
    // For top products, admins see company-wide, others see their own
    $topProductsQuery = Sale::select('product_id', DB::raw('SUM(quantity) as total_quantity'))
        ->where('company_id', $comp->company->id)
        ->where('created_at', '>=', $threeMonthsAgo)
        ->where('type', 'product')
        ->groupBy('product_id')
        ->orderByDesc('total_quantity')
        ->with('product')
        ->take(5);

    if (!$isAdmin) {
        $topProductsQuery->where('sold_by', $comp->user_id);
    }

    $topProducts = $topProductsQuery->get();

    // For out of stock, this is always company-wide
    $out = Product::where('company_id', $comp->company_id)
        ->where('type', 'product')
        ->where('available', '<', 1)
        ->where('type', 'product')
        ->get();

    $out_of_stock = $out->count();
    $customer_visits = $todaySales->count();

    // Prepare data array
    $renderData = [
        'company' => $comp,
        'sales_today' => $sales_today,
        'customer_visits' => $customer_visits,
        'out_of_stock' => $out_of_stock,
        'top_products' => $topProducts,
        'sales_data' => $salesData,
        'orders' => $onlineOrders,
        'profit' => $profit
    ];

    return Inertia::render('DashboardHomeScreen', $renderData);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DashboardHome $dashboardHome)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DashboardHome $dashboardHome)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DashboardHome $dashboardHome)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DashboardHome $dashboardHome)
    {
        //
    }
}
