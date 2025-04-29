<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceItem;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'service_id' => 'required',
            'product_id' => 'required',
            'quantity' => 'required',
            'company_id' => 'required', 
        ]);
        
        
        $check_cart = ServiceItem::where('product_id',$request->product_id)->where('company_id',$request->company_id)
        ->where('service_id',$request->service_id)->first();

        if($check_cart!=null){
            $new_quantity = $check_cart->quantity + $request->quantity;
            $check_cart->update(['quantity'=> $new_quantity]);
        }
        else{
            $add_to_cart = ServiceItem::create([
                'service_id'=>$request->service_id,
                'product_id'=>$request->product_id,
                'quantity'=> $request->quantity,
                'company_id'=>$request->company_id,
                'user_id'=>Auth::user()->id,
            ]);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceItem $serviceItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceItem $serviceItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ServiceItem $serviceItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        ServiceItem::where('id',$request->itemId)->where('company_id',$request->company_id)->where('service_id', $request->service_id)->delete();
    }

    public function empty_service_items(Request $request)
    {
        //
        ServiceItem::where('company_id',$request->company_id)->where('service_id',$request->service_id)->delete();

        Service::where('service_id',$request->service_id)->where('company_id',$request->company_id)->delete();
    }
}
