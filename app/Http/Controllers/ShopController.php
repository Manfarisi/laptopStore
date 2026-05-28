<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Category;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    // Halaman Home
    public function index()
    {
        $products = Product::with('category')
            ->where('is_active', true)
            ->latest()
            ->take(8)
            ->get();

        $categories = Category::where('is_active', true)->get();

        return Inertia::render('Home', [
            'products' => $products,
            'categories' => $categories,
            'cartCount' => auth()->check()
                ? Cart::where('user_id', auth()->id())->sum('quantity')
                : 0,
        ]);
    }

    // Halaman Shop (semua produk)
    public function shop(Request $request)
    {
        $query = Product::with('category')->where('is_active', true);

        if ($request->category) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter harga
        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sort
        if ($request->sort === 'price_asc') {
            $query->orderBy('price', 'asc');
        } elseif ($request->sort === 'price_desc') {
            $query->orderBy('price', 'desc');
        } else {
            $query->latest();
        }

        $products  = $query->paginate(12);
        $categories = Category::where('is_active', true)->get();

        return Inertia::render('Shop/Index', [
            'products'   => $products,
            'categories' => $categories,
            'filters'    => $request->only(['search', 'category', 'min_price', 'max_price', 'sort']),
            'auth'       => ['user' => auth()->user()],
            'cartCount'  => auth()->check()
                ? Cart::where('user_id', auth()->id())->sum('quantity')
                : 0,
        ]);
    }

    // Halaman Detail Produk
    public function show($slug)
    {
        $product = Product::with([
            'category',
            'images',
            'reviews.user'
        ])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $relatedProducts = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->take(4)
            ->get();

        // Cek apakah user sudah pernah beli produk ini
        $canReview = false;
        $userReview = null;
        $reviewableOrders = [];

        if (auth()->check()) {
            $reviewableOrders = \App\Models\Order::where('user_id', auth()->id())
                ->where('status', 'delivered')
                ->whereHas('orderItems', function ($q) use ($product) {
                    $q->where('product_id', $product->id);
                })
                ->whereDoesntHave('reviews', function ($q) use ($product) {
                    $q->where('product_id', $product->id)
                        ->where('user_id', auth()->id());
                })
                ->get();

            $canReview = $reviewableOrders->isNotEmpty();

            $userReview = Review::where('user_id', auth()->id())
                ->where('product_id', $product->id)
                ->first();
        }

        return Inertia::render('Shop/Show', [
            'product'          => $product,
            'relatedProducts'  => $relatedProducts,
            'auth'             => ['user' => auth()->user()],
            'cartCount'        => auth()->check()
                ? Cart::where('user_id', auth()->id())->sum('quantity')
                : 0,
            'canReview'        => $canReview,
            'userReview'       => $userReview,
            'reviewableOrders' => $reviewableOrders,
        ]);
    }
}
