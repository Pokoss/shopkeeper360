<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
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

        $orders = Order::with('items.product','user')->where('company_id',$comp->company_id)->where('order_id','like','%'.$search_text.'%')->latest()->paginate(10);

        return Inertia::render('OnlineOrdersScreen', ['company' => $comp,'orders'=>$orders]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    public function single(Request $request)
    {
        //
        $request->validate([
            'product_id' => 'required',
            'company_id' => 'required',
            'order_total' => 'required',
            'quantity' => 'required',
            'retail_price' => 'required',
            'cost_price' => 'required',
            'location' => 'required',
            'contact' => 'required',
        ]);

        $transaction_id = mt_rand(1000, 9999) . Carbon::now()->format('ymdHis');

        $order = Order::create([
            'order_id' => $transaction_id,
            'user_id' => Auth::user()->id,
            'company_id' => $request->company_id,
            'order_total' => $request->order_total,
            'status' => 'pending',
            'location' => $request->location,
            'contact' => $request->contact,
        ]);

        $orderItem = OrderItem::create([
            'order_id' => $transaction_id,
            'product_id'=>$request->product_id,
            'quantity' => $request->quantity,
            'order_price' => $request->order_total,
            'cost_price' => $request->cost_price,
            'user_id' => Auth::user()->id,
            'company_id' => $request->company_id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'company_id' => 'required',
            'order_total' => 'required',
            'location' => 'required',
            'contact' => 'required',
        ]);

        $transaction_id = mt_rand(1000, 9999) . Carbon::now()->format('ymdHis');

        $order = Order::create([
            'order_id' => $transaction_id,
            'sale_total' => $request->sale_total,
            'user_id' => Auth::user()->id,
            'company_id' => $request->company_id,
        ]);

        //You comented the code below because it was irrelevant but the upper part is important just edit the cretare at the time you wanted only to add one order not many

        // $orderItems = OrderItem::with('product')->where('company_id',$request->company_id)->where('user_id', Auth::user()->id)->get();

        // foreach ($cartItems as $cartItem) {

        //     Sale::create([
        //         'product_id' => $cartItem->product_id,
        //         'quantity' => $cartItem->quantity,
        //         'sale_price' => $cartItem->product->retail_price * $cartItem->quantity,
        //         'cost_price' => $cartItem->product->cost_price,
        //         'sale_id' => $transaction_id,
        //         'sold_by' => Auth::user()->id,
        //         'company_id' => $request->company_id,
        //     ]);
        //     $product = Product::where('id',$cartItem->product_id)->first();
        //     $new_available = $product->available - $cartItem->quantity;
        //     if($new_available<0){
        //         $new_available = 0;
        //     }
        //     $product->update(['available'=>$new_available]);
        // }

        // // Clear the cart
        // CartItem::where('company_id',$request->company_id)->where('user_id', Auth::user()->id)->delete();

    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
