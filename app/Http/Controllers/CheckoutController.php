<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

class CheckoutController extends Controller
{
    public function index()
    {
        $carts = Cart::with('product')
            ->where('user_id', auth()->id())
            ->get();

        if ($carts->isEmpty()) {
            return redirect()->route('cart.index');
        }

        $total = $carts->sum(fn($c) => $c->product->price * $c->quantity);

        return Inertia::render('Checkout/Index', [
            'carts' => $carts,
            'total' => $total,
            'auth'  => ['user' => auth()->user()],
            'cartCount' => auth()->check()
                ? Cart::where('user_id', auth()->id())->sum('quantity')
                : 0,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shipping_name'        => 'required|string|max:255',
            'shipping_phone'       => 'required|string|max:20',
            'shipping_address'     => 'required|string',
            'shipping_city'        => 'required|string|max:100',
            'shipping_postal_code' => 'required|string|max:10',
            'notes'                => 'nullable|string',
        ]);

        $carts = Cart::with('product')
            ->where('user_id', auth()->id())
            ->get();

        if ($carts->isEmpty()) {
            return redirect()->route('cart.index');
        }

        $total = $carts->sum(fn($c) => $c->product->price * $c->quantity);

        // Buat order
        $order = Order::create([
            'user_id'              => auth()->id(),
            'order_number'         => 'ORD-' . strtoupper(Str::random(8)),
            'total_price'          => $total,
            'status'               => 'pending',
            'shipping_name'        => $request->shipping_name,
            'shipping_phone'       => $request->shipping_phone,
            'shipping_address'     => $request->shipping_address,
            'shipping_city'        => $request->shipping_city,
            'shipping_postal_code' => $request->shipping_postal_code,
            'notes'                => $request->notes,
        ]);

        // Buat order items & kurangi stok
        foreach ($carts as $cart) {
            OrderItem::create([
                'order_id'     => $order->id,
                'product_id'   => $cart->product_id,
                'product_name' => $cart->product->name,
                'price'        => $cart->product->price,
                'quantity'     => $cart->quantity,
                'subtotal'     => $cart->product->price * $cart->quantity,
            ]);
            $cart->product->decrement('stock', $cart->quantity);
        }

        // Kosongkan keranjang
        Cart::where('user_id', auth()->id())->delete();

        // Setup Midtrans
        Config::$serverKey    = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
        Config::$isSanitized  = true;
        Config::$is3ds        = true;

        $params = [
            'transaction_details' => [
                'order_id'     => $order->order_number,
                'gross_amount' => (int) $order->total_price,
            ],
            'customer_details' => [
                'first_name' => $order->shipping_name,
                'phone'      => $order->shipping_phone,
                'email'      => auth()->user()->email,
            ],
            'item_details' => $order->orderItems->map(fn($item) => [
                'id'       => (string) $item->product_id,
                'price'    => (int) $item->price,
                'quantity' => (int) $item->quantity,
                'name'     => substr($item->product_name, 0, 50),
            ])->toArray(),
        ];

        $snapToken = Snap::getSnapToken($params);

        return redirect()->route('order.show', $order->id)
            ->with('snap_token', $snapToken);
    }
}
