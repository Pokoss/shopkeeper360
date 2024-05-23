<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $companies = Employee::with('company')->where('user_id', Auth::user()->id)->get();

        

        return Inertia::render('CompanyScreen', ['companies' => $companies]);
    }
    public function businesses()
    {
        //
        $businesses = Company::latest()->paginate(10);
        

        return Inertia::render('UserHomeScreen', ['businesses' => $businesses]);
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
         //
         $request->validate([
            'companyName' => 'required',
            'contact' => 'required',
            'location' => 'required',
            'email' => 'required',
            'logo' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $user = Auth::user();
        $date = Carbon::now()->format('YmdHisv');
        $value = $request->companyName . ' ' . $date . ' ' . Str::random();
        $logo_slug = Str::slug($value, '-');
        $company_name = $request->companyName . ' ' . Str::random();
        $company_slug = Str::slug($company_name, '-');

        $file = $request->file('logo');
        $filename = $logo_slug . '.' . $file->extension();
        $path = $file->storeAs('/images/company', $filename, ['disk' => 'public_uploads']);

        $company = Company::create([
            'name' => $request->companyName,
            'slug' => $company_slug,
            'logo' => $path,
            'contacts' => $request->contact,
            'location' => $request->location,
            'email' => $request->email,
        ]);

        Employee::create([
            'company_id' => $company->id,
            'user_id' => $user->id,
            'position' => 'owner',
        ]);

        $companies = Employee::with('company')->where('user_id', Auth::user()->id)->get();
        return Inertia::render('CompanyScreen', ['companies' => $companies]);
    }

    /**
     * Display the specified resource.
     */
    public function show($company)
    {
        
         $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();
        return Inertia::render('DashboardHomeScreen', ['company' => $comp]);
    }
    public function view_business($company)
    {
        $business = Company::where('slug',$company)->first();

        return Inertia::render('UserBusinessScreen', ['business' => $business]);
        
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
