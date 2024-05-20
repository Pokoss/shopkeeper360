<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
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
            'product_id' => 'required',
            'quantity' => 'required',
            'company_id' => 'required', 
        ]);

        $check_cart = CartItem::where('product_id',$request->product_id)->where('company_id',$request->company_id)
        ->where('user_id',Auth::user()->id)->first();

        if($check_cart!=null){
            $new_quantity = $check_cart->quantity + $request->quantity;
            $check_cart->update(['quantity'=> $new_quantity]);
        }
        else{
            $add_to_cart = CartItem::create([
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
    public function show(CartItem $cartItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CartItem $cartItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        CartItem::where('id',$request->itemId)->where('company_id',$request->company_id)->where('user_id',Auth::user()->id)->delete();
    }
    public function empty_cart_item(Request $request)
    {
        //
        CartItem::where('company_id',$request->company_id)->where('user_id',Auth::user()->id)->delete();
    }
}
