<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\OnlineCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OnlineCategoryController extends Controller
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

        $category = OnlineCategory::where('company_id', $comp->company_id)->where('name', 'LIKE', "%{$search_text}%")->latest()->paginate(10);

        return Inertia::render('OnlineCategoryScreen', ['company' => $comp, 'category'=>$category]);

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
            'categoryName' => 'required',
            'companyId' => 'required',

            
        ]);

        $category = OnlineCategory::create([
            'name' => $request->categoryName,
            'company_id' => $request->companyId,
            'added_by' => Auth::user()->id 
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(OnlineCategory $onlineCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OnlineCategory $onlineCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OnlineCategory $onlineCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OnlineCategory $onlineCategory)
    {
        //
    }
}
