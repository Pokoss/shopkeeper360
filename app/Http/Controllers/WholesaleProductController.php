<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\WholesaleCategory;
use App\Models\WholesaleProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WholesaleProductController extends Controller
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

        $products = WholesaleProduct::where('name', 'LIKE', "%{$search_text}%")->latest()->paginate(10);

        $category = WholesaleCategory::all();

        return Inertia::render('WholesaleProductScreen', ['company' => $comp, 'products'=> $products]);
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
    public function show(WholesaleProduct $wholesaleProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WholesaleProduct $wholesaleProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WholesaleProduct $wholesaleProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WholesaleProduct $wholesaleProduct)
    {
        //
    }
}
