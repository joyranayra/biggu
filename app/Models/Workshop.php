<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name',
    'description',
    'price',
    'image',
    'category',
    'badge',
    'date',
    'time',
    'location',
    'spots_total',
    'spots_left',
    'rating',
    'reviews',
    'difficulty',
    'includes',
    'created_by',
])]
class Workshop extends Model
{
    use HasFactory;

    protected $casts = [
        'price' => 'integer',
        'date' => 'datetime',
        'rating' => 'float',
        'includes' => 'array',
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