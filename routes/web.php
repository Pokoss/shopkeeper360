<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\BusinessAccountController;
use App\Http\Controllers\BusinessCategoryController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardHomeController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\FavouriteBusinessController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\OnlineCategoryController;
use App\Http\Controllers\OnlineProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SalePointController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceItemController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\StockItemController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\WholesaleCategoryController;
use App\Http\Controllers\WholesaleHomeController;
use App\Http\Controllers\WholesaleProductController;
use App\Http\Controllers\WholesaleSupplierController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Sitemap
Route::get('/sitemap.xml', function () {
    return Sitemap::create()
        ->add(Url::create('/')
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            ->setPriority(1.0))
        ->add(Url::create('/pricing')
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
            ->setPriority(0.9))
        ->add(Url::create('/login')
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
            ->setPriority(0.9))
        ->add(Url::create('/register')
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_YEARLY)
            ->setPriority(0.3))
        ->toResponse(request());
});

// Google OAuth routes
Route::get('/auth/google/redirect', [SocialAuthController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback'])->name('google.callback');

// Public pages
Route::get('/', fn() => Inertia::render('HomeScreen'));
Route::get('/home', [CompanyController::class, 'businesses']);
Route::get('/business/{slug}', [CompanyController::class, 'view_business']);
Route::get('/business/{slug}/category/{categoryId}', [CompanyController::class, 'view_business_category']);
Route::get('/business/category/{category}', [BusinessCategoryController::class, 'index']);
Route::post('/business/category/{category}', [BusinessCategoryController::class, 'business']);
Route::get('/product/{slug}', [OnlineProductController::class, 'show']);
Route::get('/products/nearby', [ProductController::class, 'products']);
Route::post('/home', [CompanyController::class, 'getNearbyBusinesses']);

Route::get('/wholesale', [WholesaleHomeController::class, 'index']);
Route::get('/pricing', fn() => Inertia::render('PricingScreen'));

// Inquiry form submission
Route::post('/submit-inquiry', [InquiryController::class, 'submitInquiry']);

// Restaurant web template
Route::prefix('res')->group(function () {
    Route::get('/', fn() => Inertia::render('WebTemplates/Restaurant/HomeScreen'));
    Route::get('/menu', fn() => Inertia::render('WebTemplates/Restaurant/MenuScreen'));
    Route::get('/aboutus', fn() => Inertia::render('WebTemplates/Restaurant/AboutUsScreen'));
    Route::get('/reservations', fn() => Inertia::render('WebTemplates/Restaurant/ReservationsScreen'));
});

// Dashboard
Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    /**
     * Profile
     */
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /**
     * Room Management + Bookings
     */
    Route::prefix('dashboard/{company}/rooms')->group(function () {
        Route::get('/', [RoomController::class, 'index'])->name('rooms.index');
        Route::post('/', [RoomController::class, 'store'])->name('rooms.store');
        Route::put('/{room}', [RoomController::class, 'update'])->name('rooms.update');

        // Booking-related
        Route::post('/{room}/book', [RoomController::class, 'book'])->name('rooms.book');
        Route::post('/bookings/{booking}/checkin', [RoomController::class, 'checkin'])->name('rooms.checkin');
        Route::post('/bookings/{booking}/checkout', [RoomController::class, 'checkout'])->name('rooms.checkout');
        Route::post('/bookings/{booking}/cancel', [RoomController::class, 'cancel'])->name('rooms.cancel');
        Route::post('/bookings/{booking}/services', [RoomController::class, 'addService'])->name('rooms.add-service');
        Route::get('/bookings', [RoomController::class, 'bookings'])->name('rooms.bookings');
    });

    /**
     * Analytics
     */
    Route::prefix('dashboard/{company}/analytics')->group(function () {
        Route::get('/', [AnalyticsController::class, 'index'])->name('analytics.index');
    });

    /**
     * Subscription / Company Management
     */
    Route::get('/start-trial', fn() => Inertia::render('StartTrialScreen'));
    Route::get('/inactive', fn() => Inertia::render('SubscriptionExpiredScreen'));
    Route::post('/start-free-trial', [CompanyController::class, 'trial']);
    Route::post('/renew-subscription', [CompanyController::class, 'renew_subscription']);
    Route::get('/company', [CompanyController::class, 'index']);
    Route::get('/company/register', [CompanyController::class, 'business']);
    Route::get('/dashboard/{company}', [DashboardHomeController::class, 'index']);
    Route::post('/register-company', [CompanyController::class, 'store']);

    /**
     * Inventory, POS, HR, Sales, Accounting, Online portal, etc.
     * (I kept your existing structure here — only Room/Booking section was refactored)
     */
    Route::get('/dashboard/{company}/inventory/supplier', [SupplierController::class, 'index']);
    Route::get('/dashboard/{company}/inventory/product', [ProductController::class, 'index']);
    Route::get('/dashboard/{company}/inventory/services', [ProductController::class, 'getServices']);
    Route::get('/dashboard/{company}/service/panel', [ServiceController::class, 'index']);
    Route::get('/dashboard/{company}/service/panel/{id}', [ServiceController::class, 'details']);
    Route::get('/dashboard/{company}/inventory/stock', [StockItemController::class, 'index']);
    Route::post('/add-supplier', [SupplierController::class, 'store']);
    Route::post('/add-product', [ProductController::class, 'store']);
    Route::post('/add-service', [ProductController::class, 'storeService']);
    Route::post('/edit-product', [ProductController::class, 'edit']);
    Route::post('/edit-service', [ProductController::class, 'editService']);
    Route::post('/delete-product', [ProductController::class, 'destroy']);
    Route::post('/delete-service', [ProductController::class, 'destroyService']);
    Route::post('/add-running-service', [ServiceController::class, 'store']);
    Route::post('/addtoservice', [ServiceItemController::class, 'store']);
    Route::post('/delete_service_item', [ServiceItemController::class, 'destroy']);
    Route::post('/empty_service_items', [ServiceItemController::class, 'empty_service_items']);
    Route::post('/add-stock', [StockItemController::class, 'store']);
    Route::get('/search_stock', [StockItemController::class, 'search']);
    Route::get('/search_services', [StockItemController::class, 'service']);
    Route::post('/edit-stock', [StockItemController::class, 'edit']);
    Route::post('/delete-stock', [StockItemController::class, 'destroy']);
    Route::get('/dashboard/{company}/pos', [SalePointController::class, 'index']);
    Route::get('/dashboard/{company}/hr/employee', [EmployeeController::class, 'index']);
    Route::post('/add-employee', [EmployeeController::class, 'store']);
    Route::post('/edit-employee', [EmployeeController::class, 'edit']);
    Route::post('/delete-employee', [EmployeeController::class, 'destroy']);
    Route::post('/addtocart', [CartItemController::class, 'store']);
    Route::post('/delete_cart_item', [CartItemController::class, 'destroy']);
    Route::post('/empty_cart_item', [CartItemController::class, 'empty_cart_item']);
    Route::post('/register_pay', [SalePointController::class, 'store']);
    Route::post('/record_service_sale', [ServiceController::class, 'register']);
    Route::get('/dashboard/{company}/accounting/receipts', [ReceiptController::class, 'index']);
    Route::get('/dashboard/{company}/accounting/expenses', [ExpenseController::class, 'index']);
    Route::get('/dashboard/{company}/accounting/purchases', [PurchaseController::class, 'index']);
    Route::get('/dashboard/{company}/wholesale/supplier', [WholesaleSupplierController::class, 'index']);
    Route::get('/dashboard/{company}/wholesale/category', [WholesaleCategoryController::class, 'index']);
    Route::get('/dashboard/{company}/wholesale/products', [WholesaleProductController::class, 'index']);
    Route::get('/dashboard/{company}/sales', [SaleController::class, 'index']);
    Route::get('/service_id', [ServiceController::class, 'service_id']);
    Route::get('/getlastsale', [ReceiptController::class, 'sale']);
    Route::get('/dashboard/{company}/online-portal/category', [OnlineCategoryController::class, 'index']);
    Route::post('/add-online-category', [OnlineCategoryController::class, 'store']);
    Route::post('/update-online-category/{id}', [OnlineCategoryController::class, 'update']);
    Route::get('/dashboard/{company}/online-portal/product', [OnlineProductController::class, 'index']);
    Route::get('/dashboard/{company}/online-portal/orders', [OrderController::class, 'index']);
    Route::post('/add-online-product', [OnlineProductController::class, 'store']);
    Route::post('/update-online-product/{id}', [OnlineProductController::class, 'update']);
    Route::post('/record_sale', [SalePointController::class, 'record_sale']);
    Route::post('/order-item', [OrderController::class, 'single']);
    Route::post('/favourite-business', [FavouriteBusinessController::class, 'store']);
    Route::get('/favourite-business', [FavouriteBusinessController::class, 'index']);
    Route::post('/wholesale/addsupplier', [WholesaleSupplierController::class, 'store']);
    Route::post('/wholesale/addcategory', [WholesaleCategoryController::class, 'store']);
    Route::get('/dashboard/{company}/business-account/profile', [BusinessAccountController::class, 'index']);
    Route::get('/dashboard/{company}/business-account/subscription', [BusinessAccountController::class, 'subscription']);
    Route::get('/dashboard/{company}/business-account/qr', [BusinessAccountController::class, 'qr_code']);
    Route::post('/accounting/expense', [ExpenseController::class, 'store']);
});

/**
 * Admin Panel Routes
 * Only accessible to users with admin >= 1
 */
Route::middleware(['auth', 'admin:1'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/users', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'users'])->name('admin.users');
    Route::get('/users/admins', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'adminUsers'])->name('admin.users.admins');
    Route::get('/companies', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'companies'])->name('admin.companies');
    Route::get('/companies/{company}/edit', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'editCompany'])->name('admin.companies.edit');
    Route::put('/companies/{company}', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'updateCompany'])->name('admin.companies.update');
    
    // Business Categories
    Route::get('/business-categories', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'businessCategories'])->name('admin.business-categories');
    Route::post('/business-categories', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'storeBusinessCategory'])->name('admin.business-categories.store');
    Route::put('/business-categories/{category}', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'updateBusinessCategory'])->name('admin.business-categories.update');
    
    // Measurements
    Route::get('/measurements', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'measurements'])->name('admin.measurements');
    Route::post('/measurements', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'storeMeasurement'])->name('admin.measurements.store');
    Route::put('/measurements/{measurement}', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'updateMeasurement'])->name('admin.measurements.update');
    
    Route::get('/analytics', fn() => Inertia::render('Admin/Analytics'))->name('admin.analytics');
    
    // Admin level 2+ routes (Super Admin)
    Route::middleware(['admin:2'])->group(function () {
        Route::post('/users/{user}/admin-level', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'updateAdminLevel'])->name('admin.users.update-level');
        Route::delete('/users/{user}', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'deleteUser'])->name('admin.users.delete');
        Route::get('/settings/general', fn() => Inertia::render('Admin/Settings/General'))->name('admin.settings.general');
        Route::get('/settings/security', fn() => Inertia::render('Admin/Settings/Security'))->name('admin.settings.security');
        Route::get('/activity-logs', fn() => Inertia::render('Admin/ActivityLogs'))->name('admin.activity-logs');
    });
});

require __DIR__.'/auth.php';
