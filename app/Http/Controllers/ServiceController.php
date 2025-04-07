<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class ServiceController extends Controller
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
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        $services = Service::where('company_id',$comp->company_id)->with('employee')->latest()->paginate();


        return Inertia::render('ServicePanelScreen', ['company' => $comp, 'services'=>$services]);

    }
    public function details(Request $request, $company, $id)
    {
        //
        $search_text = $request->input('search');

        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        $service = Service::where('company_id',$comp->company_id)->with('employee')->where('service_id',$id)->first(); 

        return Inertia::render('ServiceDetailsScreen', ['company' => $comp, 'service'=>$service, 'service_id'=>$id ]);

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

        $transaction_id = mt_rand(1000, 9999) . Carbon::now()->format('ymdHis');

        $service = Service::create([
            'service_id' => $transaction_id,
            'name' => $request->service,
            'status' => 'pending',
            'employee' => Auth::user()->id,
            'company_id' => $request->companyId,
        ]);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }
}
