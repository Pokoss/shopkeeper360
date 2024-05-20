<?php

namespace App\Http\Controllers;

use App\Models\DashboardHome;
use App\Models\Employee;
use App\Models\Product;
use App\Models\Receipt;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardHomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request,$company)
    {
        //
        $search_text = $request->input('search');
       
        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        $sales = Receipt::whereDate('created_at',Carbon::today())->where('company_id',$comp->company->id)->get();
        $sales_today = 0;
        foreach ($sales as $sale) {
            $sales_today= $sales_today + ($sale->sale_total - $sale->discount);            
        }
        // $sales_today = $sales->sum('sale_price');
        // $sales_quantity = $sales->sum('sale_price');
        // $tickets_today = $sales->sum('number');

        // $events = Event::where('company_id', $comp->company->id)->where('start_date','>',Carbon::now())->get();
        $out = Product::where('company_id',$comp->company_id)->where('available','<',1)->get();
        $out_of_stock = $out->count();
        $customer_visits = $sales->count();

        return Inertia::render('DashboardHomeScreen', ['company' => $comp, 'sales_today'=>$sales_today,'customer_visits'=>$customer_visits, 'out_of_stock'=> $out_of_stock]);
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
