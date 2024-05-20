<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Receipt;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReceiptController extends Controller
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

        $receipts = Receipt::with('sales.product','user')->where('company_id',$comp->company_id)->where('sale_id','like','%'.$search_text.'%')->latest()->paginate(10);

        return Inertia::render('ReceiptScreen', ['company' => $comp, 'receipts'=> $receipts]);
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
    public function sale(Request $request)
    {
        //
        $receipt = Receipt::with('sales.product','user')->where('company_id',1)->where('sold_by', Auth::user()->id)->latest()->first();

        return Response(['receipts'=>$receipt]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Receipt $receipt)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Receipt $receipt)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Receipt $receipt)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Receipt $receipt)
    {
        //
    }
}
