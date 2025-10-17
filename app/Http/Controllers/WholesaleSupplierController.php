<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\WholesaleSupplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WholesaleSupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $company)
    {
        //
        $search_text = $request->input('search');

        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company.category', 'user')->where('user_id', Auth::user()->id)->first();

        $supplier = WholesaleSupplier::where('name', 'LIKE', "%{$search_text}%")->latest()->paginate(10);

        return Inertia::render('WholeSaleSupplierScreen', ['company' => $comp, 'supplier'=> $supplier]);

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
        $request->validate([
            'name' => 'required',
            'phone' => 'required',
        ]);

        $supplier = WholesaleSupplier::create([
            'name' => $request->name,
            'contact' => $request->phone,
            'address' => $request->address,
            'location' => $request->location,
            'email' => $request->emailAddress,
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(WholesaleSupplier $wholesaleSupplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WholesaleSupplier $wholesaleSupplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WholesaleSupplier $wholesaleSupplier)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WholesaleSupplier $wholesaleSupplier)
    {
        //
    }
}
