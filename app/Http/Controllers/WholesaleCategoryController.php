<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\WholesaleCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;
class WholesaleCategoryController extends Controller
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

        $category = WholesaleCategory::where('name', 'LIKE', "%{$search_text}%")->latest()->paginate(10);

        return Inertia::render('WholesaleCategoryScreen', ['company' => $comp, 'category'=> $category]);

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
            
        ]);

        $value = $request->categoryName . ' ' . Str::random();
        $category_slug = Str::slug($value, '-');

        $category = WholesaleCategory::create([
            'name' => $request->categoryName,
            'slug' => $category_slug,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(WholesaleCategory $wholesaleCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WholesaleCategory $wholesaleCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WholesaleCategory $wholesaleCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WholesaleCategory $wholesaleCategory)
    {
        //
    }
}
