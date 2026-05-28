<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\MidtransController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

// Halaman publik
Route::get('/', [ShopController::class, 'index'])->name('home');
Route::get('/shop', [ShopController::class, 'shop'])->name('shop');
Route::get('/shop/{slug}', [ShopController::class, 'show'])->name('product.show');

// Webhook Midtrans (di luar auth)
Route::post('/midtrans/webhook', [MidtransController::class, 'webhook'])->name('midtrans.webhook');

// Halaman yang butuh login
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', fn() => redirect('/'))->name('dashboard');

    // Cart
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::put('/cart/{id}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

    // Checkout
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    // Order
    Route::get('/orders', [OrderController::class, 'index'])->name('order.index');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('order.show');

    // Profile
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Review
    Route::post('/reviews', [ReviewController::class, 'store'])->name('review.store');
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy'])->name('review.destroy');
});

require __DIR__ . '/auth.php';