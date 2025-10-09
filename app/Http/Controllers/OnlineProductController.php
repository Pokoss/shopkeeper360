<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\OnlineCategory;
use App\Models\OnlineProduct;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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

        $category = OnlineCategory::where('company_id', $comp->company_id)->get();

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
        try {
            Log::info('Online Product Store Request', [
                'productId' => $request->productId,
                'categoryId' => $request->categoryId,
                'companyId' => $request->companyId,
                'productName' => $request->productName,
                'has_image' => $request->hasFile('image'),
            ]);
            
            $validated = $request->validate([
                'productId' => 'required',
                'image' => 'required|file|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'categoryId' => 'required',
                'description' => 'required',
                'companyId' => 'required',
                'productName' => 'required',
            ], [
                'image.required' => 'Product image is required',
                'image.file' => 'The uploaded file is not valid',
                'image.mimes' => 'Image must be a JPEG, PNG, JPG, GIF, or WEBP file',
                'image.max' => 'Image size must not exceed 5MB',
            ]);
            
            Log::info('Validation passed', [
                'has_file' => $request->hasFile('image'),
                'file_info' => $request->file('image') ? [
                    'size' => $request->file('image')->getSize(),
                    'mime' => $request->file('image')->getMimeType(),
                    'original_name' => $request->file('image')->getClientOriginalName(),
                ] : null
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

            Log::info('Online Product Created Successfully', ['product_id' => $product->id]);

            return redirect()->back()->with('success', 'Product added successfully');
        } catch (\Exception $e) {
            Log::error('Online Product Store Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
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
    public function update(Request $request, $id)
    {
        try {
            Log::info('Online Product Update Request', [
                'id' => $id,
                'productId' => $request->productId,
                'categoryId' => $request->categoryId,
                'has_image' => $request->hasFile('image'),
            ]);

            $onlineProduct = OnlineProduct::findOrFail($id);
            
            $validated = $request->validate([
                'productId' => 'required',
                'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'categoryId' => 'required',
                'description' => 'required',
                'companyId' => 'required',
                'productName' => 'required',
            ], [
                'image.file' => 'The uploaded file is not valid',
                'image.mimes' => 'Image must be a JPEG, PNG, JPG, GIF, or WEBP file',
                'image.max' => 'Image size must not exceed 5MB',
            ]);

            // Update basic fields
            $onlineProduct->product_id = $request->productId;
            $onlineProduct->category_id = $request->categoryId;
            $onlineProduct->description = $request->description;

            // Update image if provided
            if ($request->hasFile('image')) {
                $date = Carbon::now()->format('YmdHisv');
                $value = $request->productName . ' ' . $date . ' ' . Str::random();
                $logo_slug = Str::slug($value, '-');

                $file = $request->file('image');
                $filename = $logo_slug . '.' . $file->extension();
                $path = $file->storeAs('/images/products', $filename, ['disk' => 'public_uploads']);

                // Delete old image if it exists
                if ($onlineProduct->image && file_exists(public_path($onlineProduct->image))) {
                    unlink(public_path($onlineProduct->image));
                }

                $onlineProduct->image = $path;
            }

            $onlineProduct->save();

            Log::info('Online Product Updated Successfully', ['product_id' => $onlineProduct->id]);

            return redirect()->back()->with('success', 'Product updated successfully');
        } catch (\Exception $e) {
            Log::error('Online Product Update Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OnlineProduct $onlineProduct)
    {
        //
    }
}
