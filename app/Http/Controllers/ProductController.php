<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Measurement;
use App\Models\Product;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request,$company)
    {
        //
        $search_text = $request->input('search');
       
        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        $products =  Product::with('measurement')->where('company_id',$comp->company_id)->where('name', 'LIKE', "%{$search_text}%")->orWhere('brand', 'LIKE', "%{$search_text}%")->latest()->paginate(10);
        $measurement = Measurement::get();

        return Inertia::render('ProductScreen', ['company' => $comp,'products' => $products,'measurements'=>$measurement]);


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
            'product' => 'required',
            'brand' => 'required',
            'companyId' => 'required',
            'measurement' => 'required',
            'barcode' => 'required',
            'sellingPrice' => 'required',
            'costPrice' => 'required',
            'wholeSaleSellingPrice' => 'required',
        ]);

        $product = Product::create([
            'name' => $request->product,
            'brand' => $request->brand,
            'measurement' => $request->measurement,
            'available' => 0,
            'retail_price' => $request->sellingPrice,
            'wholesale_price' => $request->wholeSaleSellingPrice,
            'cost_price' => $request->costPrice,
            'barcode' => $request->barcode,
            'company_id' => $request->companyId,
            'created_by' => Auth::user()->id,
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        //
        $product = Product::where('id',$request->productId)->first();

        // return Response([$product]);

        $product->update([
            'name' => $request->editProduct,
            'brand' => $request->editBrand,
            'measurement' => $request->editMeasurement,
            'available' => $request->editAvailable,
            'retail_price' => $request->editSellingPrice,
            'wholesale_price' => $request->editWholeSaleSellingPrice,
            'cost_price' => $request->editCostPrice,
            'barcode' => $request->editBarcode,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        // return Response(['oi']);
        $product = Product::where('id',$request->productId)->first();
        $product->delete();

    }
}