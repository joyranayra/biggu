<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'user_id',
    'total_price',
    'status',
    'payment_status',
    'shipping_status',
    'shipping_address',
    'estimated_delivery',
    'is_cod',
])]
class Order extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime',
        'estimated_delivery' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}