<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;
use App\Models\Cart;
class OrderController extends Controller
{
    // Riwayat semua order
    public function index()
    {
        $orders = Order::with('orderItems')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Order/Index', [
            'orders' => $orders,
            'auth'   => ['user' => auth()->user()],
        ]);
    }

    // Detail order (halaman sukses)
    public function show($id)
    {
        $order = Order::with('orderItems.product')
            ->where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        return Inertia::render('Order/Show', [
            'order' => $order,
            'auth'  => ['user' => auth()->user()],
            'flash' => [
                'snap_token' => session('snap_token'),
            ],
            'cartCount' => auth()->check()
                ? Cart::where('user_id', auth()->id())->sum('quantity')
                : 0,
        ]);
    }
}
