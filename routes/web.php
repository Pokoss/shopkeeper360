<?php

use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardHomeController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SalePointController;
use App\Http\Controllers\StockItemController;
use App\Http\Controllers\SupplierController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', function () {
    return Inertia::render('HomeScreen');
});

Route::get('/business/register', function () {
    return Inertia::render('RegisterCompanyScreen');
});
Route::get('/dashboard/pos', function () {
    return Inertia::render('PointOfSaleScreen');
});

Route::get('/dashboard/inventory/product', function () {
    return Inertia::render('ProductScreen');
});
Route::get('/dashboard/inventory/stock', function () {
    return Inertia::render('StockScreen');
});
Route::get('/dashboard/hr/employee', function () {
    return Inertia::render('EmployeeScreen');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/business', [CompanyController::class, 'index']);
    Route::get('/dashboard/{company}', [CompanyController::class, 'show']);
    
    Route::get('/dashboard/{company}', [DashboardHomeController::class, 'index']);

    Route::get('/dashboard/{company}/inventory/supplier', [SupplierController::class, 'index']);
    Route::get('/dashboard/{company}/inventory/product', [ProductController::class, 'index']);
    Route::get('/dashboard/{company}/inventory/stock', [StockItemController::class, 'index']);
    Route::post('/add-supplier', [SupplierController::class, 'store']);
    
    Route::post('/add-product', [ProductController::class, 'store']);
    Route::post('/edit-product', [ProductController::class, 'edit']);
    Route::post('/delete-product', [ProductController::class, 'destroy']);

    Route::post('/add-stock', [StockItemController::class, 'store']);
    Route::get('/search_stock', [StockItemController::class, 'search']);
    
    Route::get('/dashboard/{company}/pos', [SalePointController::class, 'index']);
    
    
    Route::get('/dashboard/{company}/hr/employee', [EmployeeController::class, 'index']);

    Route::post('/addtocart', [CartItemController::class, 'store']);
    Route::post('/delete_cart_item', [CartItemController::class, 'destroy']);
    Route::post('/empty_cart_item', [CartItemController::class, 'empty_cart_item']);
    
    Route::post('/register_pay', [SalePointController::class, 'store']);

    Route::get('/dashboard/{company}/accounting/receipts', [ReceiptController::class, 'index']);
    Route::get('/dashboard/{company}/accounting/expenses', [ExpenseController::class, 'index']);
    Route::get('/dashboard/{company}/accounting/purchases', [PurchaseController::class, 'index']);

    Route::get('/dashboard/{company}/sales', [SaleController::class, 'index']);

    Route::get('/getlastsale', [ReceiptController::class, 'sale']);
});

require __DIR__.'/auth.php';
