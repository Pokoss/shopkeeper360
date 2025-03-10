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
     */
    public function index(Request $request, $company)
    {
        $search_text = $request->input('search');
        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        if(($comp->company->status== 'inactive')){
            return Inertia::render('StartTrialScreen', ['company' => $comp,]);
        }
        if(($comp->company->status== 'active' && $comp->company->subscription_expiry < Carbon::now())){
            return Inertia::render('SubscriptionExpiredScreen', ['company' => $comp,]);
        }
        $salesData = [];
        
        $sales_today = 0;
        // Loop through the last 7 days
        if ($comp->position == 'admin' || $comp->position == 'owner' || $comp->position == 'accountant') {

            for ($i = 6; $i >= 0; $i--) {
                $date = Carbon::now()->subDays($i);
                $dayLabel = $date->format('l'); // Get the day name (e.g., Monday)
                $totalSales = Receipt::where('company_id', $comp->company->id)->whereDate('created_at', $date->toDateString())
                    ->sum('sale_total');
                $salesData[] = [
                    'day' => $dayLabel,
                    'total_sales' => $totalSales
                ];
            }
            
            $sales = Receipt::whereDate('created_at', Carbon::today())->where('company_id', $comp->company->id)->get();
            foreach ($sales as $sale) {
                $sales_today = $sales_today + ($sale->sale_total - $sale->discount);
            }
        } else {
            for ($i = 6; $i >= 0; $i--) {
                $date = Carbon::now()->subDays($i);
                $dayLabel = $date->format('l'); // Get the day name (e.g., Monday)
                $totalSales = Receipt::where('company_id', $comp->company->id)->whereDate('created_at', $date->toDateString())->where('sold_by', $comp->user_id)
                    ->sum('sale_total');
                $salesData[] = [
                    'day' => $dayLabel,
                    'total_sales' => $totalSales
                ];
            }
            $sales = Receipt::whereDate('created_at', Carbon::today())->where('company_id', $comp->company->id)->where('sold_by',$comp->user_id)->get();
            foreach ($sales as $sale) {
                $sales_today = $sales_today + ($sale->sale_total - $sale->discount);
            }
        }
        $onlineOrders = Order::where('status', 'pending')->where('company_id', $comp->company->id)->count();
        //Get the date 1 months ago from today. It was supposed to be 3 months but because of the resources this query was chewing
        //we reduced it to 1 month hence the variable threeMonthsAgo 

        $threeMonthsAgo = Carbon::now()->subMonths(1);
        // Query to get the top 5 most sold products in the past 1 months
        $topProducts = Sale::select('product_id', DB::raw('SUM(quantity) as total_quantity'))
            ->where('company_id', $comp->company->id)
            ->where('created_at', '>=', $threeMonthsAgo)
            ->groupBy('product_id')
            ->orderByDesc('total_quantity')
            ->with('product') // Eager load the related products
            ->take(5)
            ->get();
       
        $out = Product::where('company_id', $comp->company_id)->where('available', '<', 1)->get();
        $out_of_stock = $out->count();
        $customer_visits = $sales->count();
        return Inertia::render('DashboardHomeScreen', ['company' => $comp, 'sales_today' => $sales_today, 'customer_visits' => $customer_visits, 'out_of_stock' => $out_of_stock, 'top_products' => $topProducts, 'sales_data' => $salesData, 'orders' => $onlineOrders]);
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
