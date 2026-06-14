<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'order_id',
    'midtrans_order_id',
    'transaction_id',
    'gross_amount',
    'payment_type',
    'transaction_status',
    'snap_token',
    'redirect_url',
    'payload',
    'paid_at',
])]
class Payment extends Model
{
    use HasFactory;

    protected $casts = [
        'gross_amount' => 'integer',
        'payload' => 'array',
        'paid_at' => 'datetime',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}