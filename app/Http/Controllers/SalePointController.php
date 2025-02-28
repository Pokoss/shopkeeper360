<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Employee;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Receipt;
use App\Models\Sale;
use App\Models\SalePoint;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SalePointController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request,$company)
    {
        //
        $query = $request->input('search');
       
        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();


        $products = Product::where('company_id', $comp->company_id)->with('measurement')->latest()->paginate(20);

        $cart_items = CartItem::with('product')->where('company_id',$comp->company_id)->where('user_id', Auth::user()->id)->latest()->get();

        return Inertia::render('PointOfSaleScreen', ['company' => $comp, 'products'=> $products,'cart_items'=>$cart_items]);
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
            'sale_total' => 'required',
        ]);

        $transaction_id = mt_rand(1000, 9999) . Carbon::now()->format('ymdHis');

        $receipt = Receipt::create([
            'sale_id' => $transaction_id,
            'sale_total' => $request->sale_total,
            'sold_by' => Auth::user()->id,
            'discount' => $request->discount,
            'company_id' => $request->company_id,
        ]);

        $cartItems = CartItem::with('product')->where('company_id',$request->company_id)->where('user_id', Auth::user()->id)->get();

        foreach ($cartItems as $cartItem) {

            Sale::create([
                'product_id' => $cartItem->product_id,
                'quantity' => $cartItem->quantity,
                'sale_price' => $cartItem->product->retail_price * $cartItem->quantity,
                'cost_price' => $cartItem->product->cost_price,
                'sale_id' => $transaction_id,
                'sold_by' => Auth::user()->id,
                'company_id' => $request->company_id,
            ]);
            $product = Product::where('id',$cartItem->product_id)->first();
            $new_available = $product->available - $cartItem->quantity;
            if($new_available<0){
                $new_available = 0;
            }
            $product->update(['available'=>$new_available]);
        }

        // Clear the cart
        CartItem::where('company_id',$request->company_id)->where('user_id', Auth::user()->id)->delete();

        
    }

    public function record_sale(Request $request)
    {
        $request->validate([
            'company_id' => 'required',
            'order_total' => 'required',
            'order_id' => 'required',
            'user_id' => 'required',
        ]);
        $transaction_id = mt_rand(1000, 9999) . Carbon::now()->format('ymdHis');

        $receipt = Receipt::create([
            'sale_id' => $transaction_id,
            'sale_total' => $request->order_total,
            'sold_by' => Auth::user()->id,
            'discount' => 0,
            'company_id' => $request->company_id,
        ]);

        $order_items = OrderItem::with('product')->where('company_id',$request->company_id)->where('user_id',$request->user_id)->where('order_id',$request->order_id)->get();

        foreach ($order_items as $order_item) {

            Sale::create([
                'product_id' => $order_item->product_id,
                'quantity' => $order_item->quantity,
                'sale_price' => $order_item->product->retail_price * $order_item->quantity,
                'cost_price' => $order_item->product->cost_price,
                'sale_id' => $transaction_id,
                'sold_by' => Auth::user()->id,
                'company_id' => $request->company_id,
            ]);
            $product = Product::where('id',$order_item->product_id)->first();
            $new_available = $product->available - $order_item->quantity;
            if($new_available<0){
                $new_available = 0;
            }
            $product->update(['available'=>$new_available]);
        }

        $status = Order::where('order_id',$request->order_id)->first();

        $status->update([
            'status'=>'finished'
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(SalePoint $salePoint)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SalePoint $salePoint)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SalePoint $salePoint)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SalePoint $salePoint)
    {
        //
    }
}
