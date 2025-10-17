<?php

namespace App\Http\Controllers;

use App\Models\BusinessCategory;
use App\Models\Company;
use App\Models\Employee;
use App\Models\FavouriteBusiness;
use App\Models\OnlineCategory;
use App\Models\OnlineProduct;
use App\Models\PricingPlan;
use App\Models\SubscriptionPayment;
use App\Mail\SubscriptionReceiptMail;
use App\Mail\TrialActivatedMail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $companies = Employee::with('company')->where('user_id', Auth::user()->id)->get();

        

        return Inertia::render('CompanyScreen', props: ['companies' => $companies]);
    }
    public function trial(Request $request)
    {
        $request->validate([
            'company_id' => 'required',
        ]);

        $expiry = Carbon::now()->addMonth();

        $company = Company::where('id', $request->company_id)->first();
        $company->update([
            'status'=>'active',
            'subscription_date'=> Carbon::now(),
            'subscription_expiry'=> Carbon::now()->addMonth()
        ]);

        // Send trial activation email
        try {
            if ($company->email) {
                Mail::to($company->email)->send(new TrialActivatedMail($company));
                Log::info('Trial activation email sent successfully to: ' . $company->email);
            }
        } catch (\Exception $e) {
            Log::error('Failed to send trial activation email: ' . $e->getMessage());
        }

        $companies = Employee::with('company')->where('user_id', Auth::user()->id)->get();
        return Inertia::render('CompanyScreen', ['companies' => $companies]);

        

    }
    public function pricing()
    {
        $plans = PricingPlan::active()->ordered()->get();
        return Inertia::render('PricingScreen', [
            'plans' => $plans
        ]);
    }

    public function getPricingPlans()
    {
        $plans = PricingPlan::active()->ordered()->get();
        return response()->json([
            'plans' => $plans
        ]);
    }

    public function renew_subscription(Request $request)
    {
        $request->validate([
            'company_id' => 'required',
            'plan_id' => 'nullable|exists:pricing_plans,id',
            'transaction_reference' => 'nullable|string', // FlutterWave transaction ref
            'payment_method' => 'nullable|string',
        ]);

        $expiry = Carbon::now();

        $company = Company::where('id', $request->company_id)->first();
        if ($company->subscription_expiry > Carbon::now()){
            $expiry = $company->subscription_expiry;
        }

        // Get the selected pricing plan
        $plan = null;
        if ($request->plan_id) {
            $plan = PricingPlan::find($request->plan_id);
        } else {
            // Default to basic plan if not specified
            $plan = PricingPlan::where('slug', 'basic')->first();
        }

        $subscriptionStart = Carbon::now();
        $subscriptionEnd = Carbon::parse($expiry)->addMonth();

        $updateData = [
            'subscription_date' => $subscriptionStart,
            'subscription_expiry' => $subscriptionEnd
        ];

        // Store the plan information in the company
        if ($plan) {
            // Update the main 'plan' enum field based on slug (for backward compatibility)
            // This ensures existing feature-checking logic continues to work
            $updateData['plan'] = $plan->slug; // This maps to 'basic', 'standard', or 'premium'
            
            // Store additional pricing details for record-keeping
            $updateData['pricing_plan_id'] = $plan->id;
            $updateData['pricing_plan_name'] = $plan->name;
            $updateData['pricing_plan_price'] = $plan->price;
        }

        $company->update($updateData);

        // Record the payment transaction
        if ($plan) {
            try {
                $payment = SubscriptionPayment::create([
                    'company_id' => $company->id,
                    'user_id' => Auth::id(),
                    'pricing_plan_id' => $plan->id,
                    'plan_name' => $plan->name,
                    'plan_type' => $plan->slug,
                    'amount' => $plan->price,
                    'currency' => $plan->currency,
                    'transaction_reference' => $request->transaction_reference ?? 'N/A',
                    'payment_method' => $request->payment_method ?? 'flutterwave',
                    'status' => 'completed',
                    'subscription_start' => $subscriptionStart,
                    'subscription_end' => $subscriptionEnd,
                    'receipt_number' => SubscriptionPayment::generateReceiptNumber(),
                    'payment_details' => [
                        'ip_address' => $request->ip(),
                        'user_agent' => $request->userAgent(),
                    ],
                ]);

                // Send receipt email if company has email
                if ($company->email) {
                    try {
                        Mail::to($company->email)->send(new SubscriptionReceiptMail($payment));
                    } catch (\Exception $e) {
                        // Log error but don't fail the subscription
                        Log::error('Failed to send subscription receipt email: ' . $e->getMessage());
                    }
                }
            } catch (\Exception $e) {
                // Log payment record error but don't fail the subscription
                Log::error('Failed to create subscription payment record: ' . $e->getMessage());
            }
        }

        $companies = Employee::with('company')->where('user_id', Auth::user()->id)->get();
        return Inertia::render('CompanyScreen', ['companies' => $companies]);
    }
    public function business()
    {
        //
        $category = BusinessCategory::all();

        

        return Inertia::render('RegisterCompanyScreen', ['category' => $category]);
    }
    public function businesses(Request $request)
    {
        
        return Inertia::render('UserHomeScreen');
    }

    public function getNearbyBusinesses(Request $request)
    {
        $businesses = Company::latest()->paginate(10);
        $business = Company::latest()->limit(5)->get();
        $products = OnlineProduct::with('product','category','company')->limit(4)->get();
        $latitude = $request->latitude;
        $longitude = $request->longitude;

        // return Response(['latitude' => $latitude, 'longitude'=>$longitude]);
        // Fetch all categories
        $categories = BusinessCategory::all();

        // Fetch nearest businesses for each category
        $categoriesWithBusinesses = $categories->map(function ($category) use ($latitude, $longitude) {
            $category->businesses = Company::selectRaw("*, ST_Distance_Sphere(point(longitude, latitude), point(?, ?)) as distance", [
                $longitude, $latitude
            ])
            ->where('category_id', $category->id)
            ->orderBy('distance')
            ->limit(4)
            ->get();
            return $category;
        });

        

        return Response( ['businesses' => $businesses, 'business' => $business, 'products'=>$products, 'categories'=>$categoriesWithBusinesses]); 
        return Inertia::render('UserHomeScreen', ['businesses' => $businesses, 'business' => $business, 'products'=>$products, 'categories'=>$categoriesWithBusinesses]); 
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
        $request->validate([
            'companyName' => 'required|string|max:255',
            'contact' => 'required|string',
            'location' => 'required|string',
            'email' => 'required|email',
            'categoryId' => 'required|exists:business_category,id',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $user = Auth::user();
        $date = Carbon::now()->format('YmdHisv');
        $value = $request->companyName . ' ' . $date . ' ' . Str::random();
        $logo_slug = Str::slug($value, '-');
        $company_name = $request->companyName . ' ' . Str::random();
        $company_slug = Str::slug($company_name, '-');

        // Handle logo upload only if provided
        $path = '';
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = $logo_slug . '.' . $file->extension();
            $path = $file->storeAs('/images/company', $filename, ['disk' => 'public_uploads']);
        }

        $company = Company::create([
            'name' => $request->companyName,
            'slug' => $company_slug,
            'logo' => $path,
            'contacts' => $request->contact,
            'category_id' => $request->categoryId,
            'location' => $request->location,
            'email' => $request->email,
            'latitude' => $request->latitude ?? null,
            'longitude' => $request->longitude ?? null,
            'slogan' => 'Thank you for supporting us!',
            'status' => 'inactive',
        ]);

        Employee::create([
            'company_id' => $company->id,
            'user_id' => $user->id,
            'position' => 'owner',
        ]);

        $companies = Employee::with('company')->where('user_id', Auth::user()->id)->get();
        return Inertia::render('CompanyScreen', ['companies' => $companies]);
    }

    /**
     * Display the specified resource.
     */
    public function show($company)
    {
        
         $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company.category', 'user')->where('user_id', Auth::user()->id)->first();
        return Inertia::render('DashboardHomeScreen', ['company' => $comp]);
    }
    public function view_business($company)
    {
        $business = Company::where('slug',$company)->first();

        $category = OnlineCategory::where('company_id',$business->id)->get();

        $products = OnlineProduct::with('product','category')->where('company_id',$business->id)->latest()->paginate(10);

        $favourite = 0;

        if(Auth::user()){

            $get_favourite = FavouriteBusiness::where('company_id', $business->id)->where('company_id', Auth::user()->id)->get();
            if ($get_favourite->isEmpty()){
                $favourite = 0;
            }
            else{
                $favourite = 1;
            }
        }
        

        return Inertia::render('UserBusinessScreen', ['business' => $business, 'category'=> $category, 'products' => $products, 'favourite'=> $favourite])
        ->withViewData([
            'title' => $business->name . ' | Biashari',
            'image' => url($business->logo),
        ]);;
        
        
    }

    public function view_business_category($company, $categoryId)
    {
        $business = Company::where('slug',$company)->first();

        $category = OnlineCategory::where('company_id',$business->id)->get();

        // Filter products by category
        $products = OnlineProduct::with('product','category')
            ->where('company_id',$business->id)
            ->where('category_id', $categoryId)
            ->latest()
            ->paginate(10);

        $favourite = 0;

        if(Auth::user()){

            $get_favourite = FavouriteBusiness::where('company_id', $business->id)->where('user_id', Auth::user()->id)->get();
            if ($get_favourite->isEmpty()){
                $favourite = 0;
            }
            else{
                $favourite = 1;
            }
        }
        

        return Inertia::render('UserBusinessScreen', ['business' => $business, 'category'=> $category, 'products' => $products, 'favourite'=> $favourite])
        ->withViewData([
            'title' => $business->name . ' | Biashari',
            'image' => url($business->logo),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
