<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Workshop;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderAdminController extends Controller
{
    /**
     * 📋 List semua order (admin)
     */
    public function index()
    {
        $orders = Order::with(['items.item', 'payment', 'user'])
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'status' => $order->status,
                    'total' => $order->total_price,
                    'created_at' => $order->created_at,
                    'payment_status' => $order->payment_status,
                    'shipping_status' => $order->shipping_status,
                    'shipping_address' => $order->shipping_address,
                    'estimated_delivery' => $order->estimated_delivery,
                    'is_cod' => $order->is_cod,
                    'customer_name' => $order->user?->name,

                    'items' => $order->items->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'name' => data_get($item, 'item.name', 'Item'),
                            'image' => data_get($item, 'item.image', ''),
                            'price' => $item->price,
                            'quantity' => $item->quantity,
                            'type' => str_contains($item->item_type, 'Product')
                                ? 'product'
                                : 'workshop',
                            'note' => $item->note,
                        ];
                    }),
                ];
            });

        return Inertia::render('admin/orders/index', [
            'orders' => $orders
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $orderitem = OrderItem::where('order_id', $id)->first();

        $oldStatus = $order->status;

        $request->validate([
            'status' => 'required|in:pending,paid,processing,shipped,completed,cancelled',
        ]);

        if ($oldStatus !== 'paid' && $request->status === 'paid') {
             if ($orderitem->item_type === 'App\Models\Workshop') {
                $workshop = Workshop::find($orderitem->item_id);
                if ($workshop) {
                    $workshop->decrement('spots_left', $orderitem->quantity);
                }
            }

            if ($orderitem->item_type === 'App\Models\Product') {
                $product = Product::find($orderitem->item_id);
                if ($product) {
                    $product->decrement('stock', $orderitem->quantity);
                }
            }
        }

        $order->status = $request->status;

        if ($request->status === 'paid') {
            $order->payment_status = 'paid';
        }

        if ($request->status === 'shipped') {
            $order->shipping_status = 'shipped';
        }

        if ($request->status === 'completed') {
            $order->shipping_status = 'delivered';
        }

        if ($request->status === 'cancelled') {
            $order->payment_status = 'unpaid';
        }

        $order->save();

        return back()->with('success', 'Status updated');
    }
}