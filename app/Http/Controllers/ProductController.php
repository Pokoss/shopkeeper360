<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Measurement;
use App\Models\OnlineProduct;
use App\Models\Product;
use App\Models\Sale;
use App\Models\StockItem;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
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

        $products = Product::where('name', 'LIKE', "%{$search_text}%")->with('measurement')->where('type','product')->where('company_id', $comp->company_id)->latest()->paginate(10);
        // $products =  Product::with('measurement')->where('company_id',$comp->company_id)->where('name', 'LIKE', "%{$search_text}%")->latest()->paginate(10);
        $measurement = Measurement::get();
        return Inertia::render('ProductScreen', ['company' => $comp, 'products' => $products, 'measurements' => $measurement]);
    }
    //Displaying services
    public function getServices(Request $request, $company)
    {
        //
        $search_text = $request->input('search');

        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        $services = Product::where('name', 'LIKE', "%{$search_text}%")->where('type', 'service')->where('company_id', $comp->company_id)->latest()->paginate(10);
        // $products =  Product::with('measurement')->where('company_id',$comp->company_id)->where('name', 'LIKE', "%{$search_text}%")->latest()->paginate(10);
        $measurement = Measurement::get();
        return Inertia::render('ServicesScreen', ['company' => $comp, 'services' => $services]);
    }
    public function products(Request $request)
    {
        //

        $latitude = $request->latitude;
        $longitude = $request->longitude;

        // $products = OnlineProduct::whereHas('company', function ($query) use ($latitude,$longitude) {
        //     $query->selectRaw("*, ST_Distance_Sphere(point(longitude, latitude), point(?, ?)) as distance", [
        //         $longitude, $latitude
        //     ]);
        // })->get();

        $search = $request->search;
        $radius = 10000; // Radius in meters (10 km)

        $products = OnlineProduct::selectRaw(
            "online_product.*, company.name as business_name, 
            ST_Distance_Sphere(point(company.longitude, company.latitude), point(?, ?)) AS distance",
            [$longitude, $latitude]
        )
            ->join('company', 'online_product.company_id', '=', 'company.id')
            // ->whereRaw("ST_Distance_Sphere(point(company.longitude, company.latitude), point(?, ?)) < ?", 
            // [$longitude, $latitude, $radius])
            ->whereHas('product', function ($query) use ($search) {
                $query->where('name', 'LIKE', "%{$search}%");
            })
            ->with('product')
            // ->where('products.name', 'like', '%' . $query . '%')
            ->orderBy("distance")
            ->paginate(10);



            


        return Inertia::render('UserNearProductScreen', ['products' => $products,]);
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
            'companyId' => 'required',
            'measurement' => 'required',
            'sellingPrice' => 'required',
            'costPrice' => 'required',
        ]);

        $product = Product::create([
            'name' => $request->product,
            'measurement' => $request->measurement,
            'available' => 0,
            'retail_price' => $request->sellingPrice,
            'type' => 'product',
            'cost_price' => $request->costPrice,
            'barcode' => $request->barcode,
            'company_id' => $request->companyId,
            'created_by' => Auth::user()->id,
        ]);
    }
    public function storeService(Request $request)
    {
        //
        $request->validate([
            'service' => 'required',
            'companyId' => 'required',
            'sellingPrice' => 'required',
            'costPrice' => 'required',
        ]);

        $product = Product::create([
            'name' => $request->service,
            'measurement' => 0,
            'available' => 0,
            'retail_price' => $request->sellingPrice,
            'type' => 'service',
            'cost_price' => $request->costPrice,
            'barcode' => '',
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
        $product = Product::where('id', $request->productId)->first();

        // return Response([$product]);

        $product->update([
            'name' => $request->editProduct,
            'measurement' => $request->editMeasurement,
            'available' => $request->editAvailable,
            'retail_price' => $request->editSellingPrice,
            'cost_price' => $request->editCostPrice,
        ]);
    }
    public function editService(Request $request)
    {
        //
        $service = Product::where('id', $request->serviceId)->first();

        // return Response([$product]);

        $service->update([
            'name' => $request->editService,
            'retail_price' => $request->editSellingPrice,
            'cost_price' => $request->editCostPrice,
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
        $check1 = StockItem::where('product_id',$request->productId)->count(); 
        $check2 = Sale::where('product_id',$request->productId)->count();
        $check3 = OnlineProduct::where('product_id',$request->productId)->count();

        if($check1>0 || $check2>0 ||$check3>0){
            return Response('Operation not possible because this product as many attachments and it cant be deleted as it will damange the business statistics, please call Biashari team for assistance to safely delete it');
        }
        else{
            $product = Product::where('id', $request->productId)->first();
            $product->delete();
        }
        
       
    }
    public function destroyService(Request $request)
    {
        //
        // return Response(['oi']);
        $check1 = StockItem::where('product_id',$request->serviceId)->count(); 
        $check2 = Sale::where('product_id',$request->serviceId)->count();
        $check3 = OnlineProduct::where('product_id',$request->serviceId)->count();

        if($check1>0 || $check2>0 ||$check3>0){
            return Response('Operation not possible because this product as many attachments and it cant be deleted as it will damange the business statistics, please call Biashari team for assistance to safely delete it');
        }
        else{
            $service = Product::where('id', $request->serviceId)->first();
            $service->delete();
        }
        
       
    }
}
