<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Inertia\Inertia;

use App\Models\Product;
use App\Models\Workshop;
use App\Models\Order;

use App\Http\Controllers\MidtransController;
use App\Http\Controllers\CodController;
use App\Http\Resources\OrderResource;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\WorkshopController;
use App\Http\Controllers\Admin\OrderAdminController;
use App\Http\Controllers\Admin\DashboardController;

/*
| Public Routes
*/

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'products' => Product::latest()->get(),
        'workshops' => Workshop::latest()->get(),
    ]);
})->name('home');

Route::get('/shop', function () {
    return Inertia::render('products/product', [
        'products' => Product::latest()->get()
    ]);
})->name('shop');

// Route::get('/workshop', function () {
//     return 'workshop route works';
// });

Route::get('/workshop', function () {
    return Inertia::render('workshops/workshop', [
        'workshops' => Workshop::latest()->get()
    ]);
})->name('workshop');

Route::get('/about-us', function () {
    return Inertia::render('about/about');
})->name('about-us');

Route::get('/contact', function () {
    return Inertia::render('contact/contact');
})->name('contact');

Route::get('/cart', function () {
    return Inertia::render('cart/cart');
})->name('cart');


/*
| Authenticated Routes
*/

Route::get('/order', function () {
    $orders = Order::with(['items.item', 'payment'])
        ->where('user_id', auth()->id())
        ->latest()
        ->get();

    return Inertia::render('order/order', [
        'orders' => OrderResource::collection($orders)
    ]);
})->middleware('auth');

Route::post('/order/cancel', [OrderController::class, 'cancel'])
    ->middleware('auth');

/*
| Admin
*/

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('admin.dashboard');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('admin.products');
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/workshops', [WorkshopController::class, 'index'])->name('admin.workshops');
    Route::post('/workshops', [WorkshopController::class, 'store']);
    Route::put('/workshops/{id}', [WorkshopController::class, 'update']);
    Route::delete('/workshops/{id}', [WorkshopController::class, 'destroy']);
});

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/orders', [OrderAdminController::class, 'index'])->name('admin.orders');
    Route::post('/orders/{id}/status', [OrderAdminController::class, 'updateStatus']);
});

Route::post('/cod/create', [CodController::class, 'create'])->middleware('auth');

/*
| Payment
*/
Route::post('/midtrans/token/cart', [MidtransController::class, 'tokenCart']);
Route::post('/midtrans/token/order', [MidtransController::class, 'tokenOrder']);
Route::post('/midtrans/callback', [MidtransController::class, 'callback']);

/*
| Settings
*/

require __DIR__.'/settings.php';