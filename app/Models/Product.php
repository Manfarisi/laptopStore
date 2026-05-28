<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProductImage;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'brand',
        'slug',
        'description',
        'price',
        'stock',
        'image',
        'is_active',
        'processor',
        'ram',
        'storage',
        'display',
        'gpu',
        'os',
        'battery',
        'weight',
        'color',
        'warranty',
        'condition'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('order');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function averageRating()
    {
        return $this->reviews()->avg('rating');
    }
}
