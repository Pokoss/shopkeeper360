<?php

namespace App\Http\Controllers;

use App\Models\FavouriteBusiness;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavouriteBusinessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $favourite_businesses = FavouriteBusiness::with('company')->where('user_id', Auth::user()->id)->latest()->paginate(10);

        return Inertia::render('UserFavouriteBusinessScreen', ['businesses' => $favourite_businesses]);
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
            'company_id' => 'required',
        ]);


        $check_favourite = FavouriteBusiness::where('company_id',$request->company_id)->where('user_id',Auth::user()->id)->get();

        if($check_favourite->isEmpty()){

            FavouriteBusiness::create([
                
                'user_id' => Auth::user()->id,
                'company_id' => $request->company_id
            ]);
  
        }
        else{
           $delete_like = FavouriteBusiness::where('user_id',Auth::user()->id)->where('company_id', $request->company_id)->first();
            $delete_like->delete();
           
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(FavouriteBusiness $favouriteBusiness)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FavouriteBusiness $favouriteBusiness)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FavouriteBusiness $favouriteBusiness)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FavouriteBusiness $favouriteBusiness)
    {
        //
    }
}
