<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Receipt;
use App\Models\Sale;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $company)
    {
        //
        // $search_text = $request->input('search');
        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        if (empty($startDate)) {
            $startDate = now()->toDateString();
        }

        // Validate the start date
        $request->validate([
            'start_date' => 'date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        // Query the records
        $query = Sale::query();
        $query2 = Receipt::query();
        $sales_total = 0;
        $profit = 0;
        $discount =0;
   

        if ($startDate && $endDate) {
            // If both dates are provided, filter between the dates
            $query->with(['product', 'roomBooking.room'])->where('company_id', $comp->company_id)->whereBetween('created_at', [$startDate, $endDate])->latest();

            $query2->where('company_id', $comp->company_id)->whereBetween('created_at', [$startDate, $endDate]);
        } elseif ($startDate) {
            // If only the start date is provided, filter records for that date
            $query->with(['product', 'roomBooking.room'])->where('company_id', $comp->company_id)->whereDate('created_at', $startDate)->latest();

            $query2->where('company_id', $comp->company_id)->whereDate('created_at', $startDate);
        }
        $sales_profit = $query->get();
        foreach ($sales_profit as $p) {
            $profit = $profit + ($p->sale_price - ($p->cost_price * $p->quantity));
        }  
        $sales = $query->paginate(10);
        $the_total = $query2->get();
        foreach ($the_total as $sale) {
                $sales_total = $sales_total + ($sale->sale_total - $sale->discount);
            }  
            $discount = $the_total->sum('discount');
            $profit = $profit - $discount;
        
        return Inertia::render('SalesScreen', ['company' => $comp, 'sales' => $sales, 'sales_today' => $sales_total,'profit'=>$profit]);
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
    public function show(Sale $sale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
