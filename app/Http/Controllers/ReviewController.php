<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'order_id'   => 'required|exists:orders,id',
            'rating'     => 'required|integer|min:1|max:5',
            'comment'    => 'nullable|string|max:500',
        ]);

        // Pastikan order milik user yang login
        $order = Order::where('id', $request->order_id)
            ->where('user_id', auth()->id())
            ->where('status', 'delivered')
            ->firstOrFail();

        // Pastikan produk ada di order tersebut
        $orderItem = OrderItem::where('order_id', $order->id)
            ->where('product_id', $request->product_id)
            ->firstOrFail();

        // Cek sudah review atau belum
        $existing = Review::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->where('order_id', $request->order_id)
            ->first();

        if ($existing) {
            return back()->withErrors(['review' => 'Kamu sudah memberikan ulasan untuk produk ini.']);
        }

        Review::create([
            'user_id'    => auth()->id(),
            'product_id' => $request->product_id,
            'order_id'   => $request->order_id,
            'rating'     => $request->rating,
            'comment'    => $request->comment,
        ]);

        return back()->with('success', 'Ulasan berhasil dikirim!');
    }

    public function destroy($id)
    {
        $review = Review::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $review->delete();

        return back()->with('success', 'Ulasan berhasil dihapus!');
    }
}