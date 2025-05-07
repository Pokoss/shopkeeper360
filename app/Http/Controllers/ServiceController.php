<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Product;
use App\Models\Receipt;
use App\Models\Sale;
use App\Models\Service;
use App\Models\ServiceItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Response;

class ServiceController extends Controller
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

        $services = Service::where('service_id', 'LIKE', "%{$search_text}%")->where('company_id',$comp->company_id)->with('employee','service_items.product')->latest()->paginate();


        return Inertia::render('ServicePanelScreen', ['company' => $comp, 'services'=>$services]);

    }
    public function details(Request $request, $company, $id)
    {
        //
        $search_text = $request->input('search');

        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        $service = Service::where('company_id',$comp->company_id)->with('employee')->where('service_id',$id)->first(); 

        $service_items = Product::where('company_id', $comp->company_id)->latest()->paginate(20);

        $cart_items = ServiceItem::with('product')->where('company_id',$comp->company_id)->where('service_id',$id)->where('user_id', Auth::user()->id)->latest()->get();

        return Inertia::render('ServiceDetailsScreen', ['company' => $comp, 'service'=>$service,'service_items'=>$service_items,  'service_id'=>$id,'cart_items'=>$cart_items ]);

    }

    public function service_id(Request $request)
    {
        $last_id = Service::where('company_id',$request->company_id)->where('employee',Auth::user()->id)->latest()->first();

        return Response(['service_id'=> $last_id->service_id]);
    }
    public function register(Request $request)
    {
        
        $request->validate([
            'company_id' => 'required',
            'sale_total' => 'required',
            'service_id' => 'required',
        ]);

       
        $transaction_id = mt_rand(1000, 9999) . Carbon::now()->format('ymdHis');

        $receipt = Receipt::create([
            'sale_id' => $transaction_id,
            'sale_total' => $request->sale_total,
            'sold_by' => Auth::user()->id,
            'discount' => $request->discount,
            'company_id' => $request->company_id,
        ]);


        $cartItems = ServiceItem::with('product')->where('service_id', $request->service_id)->where('company_id',$request->company_id)->get();

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
        ServiceItem::where('company_id',$request->company_id)->where('service_id', $request->service_id)->delete();

        Service::where('service_id', $request->service_id)->where('company_id',$request->company_id)->delete();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $transaction_id = mt_rand(1000, 9999) . Carbon::now()->format('ymdHis');

        $service = Service::create([
            'service_id' => $transaction_id,
            'name' => $request->service,
            'status' => 'pending',
            'employee' => Auth::user()->id,
            'company_id' => $request->companyId,
        ]);

       
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }
}
