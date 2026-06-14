<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name',
    'price',
    'image',
    'category',
    'badge',
    'rating',
    'reviews',
    'in_stock',
    'stock',    
    'created_by',
])]
class Product extends Model
{
    use HasFactory;

    protected $casts = [
        'price' => 'integer',
        'rating' => 'float',
        'in_stock' => 'boolean',
        'stock' => 'integer',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function orderItems()
    {
        return $this->morphMany(OrderItem::class, 'item');
    }
}