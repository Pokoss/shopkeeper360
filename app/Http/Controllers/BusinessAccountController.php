<?php

namespace App\Http\Controllers;

use App\Models\BusinessAccount;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BusinessAccountController extends Controller
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

        return Inertia::render('BusinessProfileScreen', ['company' => $comp,]);
    }
    public function subscription(Request $request, $company)
    {
        //
        $search_text = $request->input('search');

        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company.category', 'user')->where('user_id', Auth::user()->id)->first();

        return Inertia::render('BusinessSubscriptionScreen', ['company' => $comp,]);
    }
    public function qr_code(Request $request, $company)
    {
        //
        $search_text = $request->input('search');

        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company.category', 'user')->where('user_id', Auth::user()->id)->first();

        return Inertia::render('BusinessQrScreen', ['company' => $comp,]);
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
    public function show(BusinessAccount $businessAccount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BusinessAccount $businessAccount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BusinessAccount $businessAccount)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BusinessAccount $businessAccount)
    {
        //
    }
}
