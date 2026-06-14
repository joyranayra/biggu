<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CodController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'items'            => 'required|array|min:1',
            'items.*.id'       => 'required|integer',
            'items.*.type'     => 'required|in:product,workshop',
            'items.*.price'    => 'required|integer|min:0',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|string',
        ]);

        $user  = auth()->user();
        $items = $request->items;

        $subtotal    = collect($items)->sum(fn($i) => $i['price'] * $i['quantity']);
        $tax         = (int) ($subtotal * 0.1);
        $grossAmount = $subtotal + $tax;

        DB::beginTransaction();

        try {
            $order = Order::create([
                'user_id'          => $user->id,
                'total_price'      => $grossAmount,
                // 'status'           => 'processing',
                'status'           => 'pending',
                'payment_status'   => 'unpaid',
                'shipping_status'  => 'not_shipped',
                'shipping_address' => $request->shipping_address,
                'is_cod'           => true,
            ]);

            foreach ($items as $item) {
                OrderItem::create([
                    'order_id'  => $order->id,
                    'item_type' => $item['type'] === 'product'
                        ? Product::class
                        : Workshop::class,
                    'item_id'   => $item['id'],
                    'quantity'  => $item['quantity'],
                    'price'     => $item['price'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message'  => 'Order COD berhasil dibuat',
                'order_id' => $order->id,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Gagal membuat order COD',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}