<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Product;
use App\Models\StockItem;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StockItemController extends Controller
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
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        // $stock = StockItem::with('product')->where('company_id',$comp->company_id)->get();

        $stock = StockItem::whereHas('product', function ($query) use ($search_text){
            $query->where('name', 'LIKE', "%{$search_text}%");
        })->with('product')->where('company_id',$comp->company_id)->latest()->paginate(10);

        $product = Product::where('company_id', $comp->company_id)->latest()->paginate(20);

        // return Response(['product'=> $product]);

        return Inertia::render('StockScreen', ['company' => $comp, 'stock_item'=> $stock,'product'=> $product]);
        
        
    }

    public function search(Request $request)
    {
        $query = $request->input('q');
        $company_id = $request->input('company_id');
        

        // $products = Product::where('company_id',$company_id)->where('name', 'LIKE', "%{$query}%")->latest()->paginate(20);
        
        $products = Product::where(function ($q) use ($query){
            $q->where('name', 'LIKE', "%{$query}%");
        })->where('company_id',$company_id)->latest()->paginate(20);

        return Response(['product' => $products]);
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
            'companyId' => 'required',
        ]);

        $product = Product::where('id',$request->product_id)->first();

        $stock = StockItem::create([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'batch' => $request->batch,
            'expiry_date' => $request->expiry,
            'created_by' => Auth::user()->id,
            'company_id' => $request->companyId,
        ]);

        

        $quantity = $product->available + $request->quantity;

        $product->update([
            'available'=>$quantity
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(StockItem $stockItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        //
        $stock = StockItem::where('id',$request->stockId)->first();

        //first subtract from product
        $product = Product::where('product_id',$stock->product_id)->first();
        $old_available = $product->available - $stock->quantity;

        $stock->update([
            'quantity' => $request->editQuantity,
            'batch' => $request->editBatch,
            'expiry_date' => $request->editExpiry,
        ]);

        $new_available = $old_available + $request->editQuantity;

        $product->update([
            'available' => $new_available
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StockItem $stockItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        $stock = StockItem::where('id',$request->stockId)->first();
        $stock->delete();
    }
}
