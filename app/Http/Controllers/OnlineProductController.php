<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\OnlineCategory;
use App\Models\OnlineProduct;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class OnlineProductController extends Controller
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

        $products = OnlineProduct::whereHas('product', function ($query) use ($search_text){
            $query->where('name', 'LIKE', "%{$search_text}%");
        })->with('product','category')->where('company_id',$comp->company_id)->latest()->paginate(10);


        $product = Product::where('company_id', $comp->company_id)->latest()->paginate(20);

        $category = OnlineCategory::where('company_id', $comp->id)->get();

        return Inertia::render('OnlineProductScreen', ['company' => $comp, 'products' => $products, 'product'=> $product, 'category'=>$category]);
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
            'productId' => 'required',
            'image' => 'required',
            'categoryId' => 'required',
            'description' => 'required',
            'companyId' => 'required',
            'productName' => 'required',
            
        ]);


        $date = Carbon::now()->format('YmdHisv');
        $value = $request->productName . ' ' . $date . ' ' . Str::random();
        $logo_slug = Str::slug($value, '-');
        $product_name = $request->productName . ' ' . Str::random();
        $product_slug = Str::slug($product_name, '-');

        $file = $request->file('image');
        $filename = $logo_slug . '.' . $file->extension();
        $path = $file->storeAs('/images/products', $filename, ['disk' => 'public_uploads']);



        $product = OnlineProduct::create([
            'product_id'=>$request->productId,
            'slug' => $product_slug,
            'category_id'=>$request->categoryId,
            'image'=> $path,
            'company_id' =>$request->companyId,
            'added_by' => Auth::user()->id,
            'description' => $request->description,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        //
        $product = OnlineProduct::with('product','category','company')->where('slug',$slug)->first();
        return Inertia::render('UserProductDetailsScreen', ['product' => $product]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OnlineProduct $onlineProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OnlineProduct $onlineProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OnlineProduct $onlineProduct)
    {
        //
    }
}
