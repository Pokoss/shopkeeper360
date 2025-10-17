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
        })->with('company.category', 'user')->where('user_id', Auth::user()->id)->first();

        $employees = Employee::whereHas('user', function ($query) use ($search_text){
            $query->where('name', 'LIKE', "%{$search_text}%");
        })->with('user')->where('company_id',$comp->company_id)->latest()->paginate(10);

        // $employees = Employee::with('user')->where('company_id',$comp->company_id)->latest()->paginate(10);

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

        $check_email = Employee::where('user_id',$user->id)->where('company_id',$request->company_id)->exists();
        if(!$check_email){
            Employee::create([
                'company_id' => $request->company_id,
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
    public function edit(Request $request)
    {
        //
        $employee = Employee::where('id',$request->editEmployeeId)->first();

        if($employee->position == 'owner'){
            return;
        }

        $employee->update([
            'position'=> $request->editPosition
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
        // $employee = Employee::where('id',$request->employee_id)->where('company_id',$request->company_id)->first();

        // $update = $employee->update([
        //     'position'=> $request->position
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        $employee = Employee::where('id', $request->editEmployeeId)->first();
        if($employee->position == 'owner'){
            return;
        }

        $employee->delete();
    }
}