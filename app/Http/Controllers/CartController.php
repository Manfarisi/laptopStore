<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    // Tampilkan isi keranjang
    public function index()
    {
        $carts = Cart::with('product.category')
            ->where('user_id', auth()->id())
            ->get();

        $total = $carts->sum(fn($cart) => $cart->product->price * $cart->quantity);

        return Inertia::render('Cart/Index', [
            'carts' => $carts,
            'total' => $total,
            'auth'  => ['user' => auth()->user()],
            'cartCount' => auth()->check()
                ? Cart::where('user_id', auth()->id())->sum('quantity')
                : 0,

        ]);
    }


    // Tambah ke keranjang
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Cek apakah sudah ada di keranjang
        $cart = Cart::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cart) {
            // Update quantity
            $newQty = $cart->quantity + $request->quantity;
            $cart->update([
                'quantity' => min($newQty, $product->stock)
            ]);
        } else {
            // Buat baru
            Cart::create([
                'user_id'    => auth()->id(),
                'product_id' => $request->product_id,
                'quantity'   => min($request->quantity, $product->stock),
            ]);
        }

        return back()->with('success', 'Produk ditambahkan ke keranjang!');
    }

    // Update quantity
    public function update(Request $request, $id)
    {
        $cart = Cart::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $request->validate(['quantity' => 'required|integer|min:1']);

        $cart->update(['quantity' => min($request->quantity, $cart->product->stock)]);

        return back();
    }

    // Hapus dari keranjang
    public function destroy($id)
    {
        Cart::where('id', $id)
            ->where('user_id', auth()->id())
            ->delete();

        return back()->with('success', 'Produk dihapus dari keranjang!');
    }
}
