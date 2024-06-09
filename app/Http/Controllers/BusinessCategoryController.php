<?php

namespace App\Http\Controllers;

use App\Models\BusinessCategory;
use App\Models\Company;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($category)
    {
        //
        $business_category = BusinessCategory::where('slug',$category)->first();
        return Inertia::render('UserBusinessCategoryScreen',['category'=>$business_category]);
    }
    public function business(Request $request, $category)
    {
        //
        $latitude = $request->latitude;
        $longitude = $request->longitude;

        $business_category = BusinessCategory::where('slug',$category)->first();
        $businesses = Company::selectRaw("*, ST_Distance_Sphere(point(longitude, latitude), point(?, ?)) as distance", [
            $longitude, $latitude
            ])
            ->where('category_id', $business_category->id)
            ->orderBy('distance')
            ->paginate(12);
            return Response(['businesses' => $businesses,'latitude'=>$latitude,'longitude'=>$longitude]);
        // return Inertia::render('UserBusinessCategoryScreen',['category'=>$business_category,'businesses'=> $businesses]);
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
    public function show(BusinessCategory $businessCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BusinessCategory $businessCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BusinessCategory $businessCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BusinessCategory $businessCategory)
    {
        //
    }
}
