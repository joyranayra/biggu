<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'total' => $this->total_price,
            'created_at' => $this->created_at->toISOString(),

            'payment_status' => $this->payment_status,
            'shipping_status' => $this->shipping_status,
            'shipping_address' => $this->shipping_address,
            'estimated_delivery' => optional($this->estimated_delivery)?->toDateString(),
            'is_cod' => $this->is_cod,

            'items' => $this->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => data_get($item, 'item.name', 'Item tidak ditemukan'),
                    'image' => data_get($item, 'item.image', null),
                    'price' => $item->price,
                    'quantity' => $item->quantity,
                    'type' => str_contains($item->item_type, 'Product') ? 'product' : 'workshop',
                    'note' => $item->note,
                ];
            }),
        ];
    }
}