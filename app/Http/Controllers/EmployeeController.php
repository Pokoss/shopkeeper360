<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($company, Request $request)
    {
        //
        $search_text = $request->input('search');
       
        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        $employees = Employee::with('user')->where('company_id',$comp->company_id)->latest()->paginate(10);

        return Inertia::render('EmployeeScreen', ['company' => $comp,'employees'=>$employees]);
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
        // $company = Company::where('id', $request->companyId);

        $user = User::where('email', $request->employeeEmail)->first();

        $check_email = Employee::where('user_id',$user->id)->where('company_id',$request->companyId)->exists();
        if(!$check_email){
            Employee::create([
                'company_id' => $request->companyId,
                'user_id' => $user->id,
                'position' => $request->position,
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
