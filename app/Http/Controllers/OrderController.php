<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with(['items.item', 'payment'])
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return OrderResource::collection($orders);
    }

    public function show($id)
    {
        $order = Order::with(['items.item', 'payment'])->findOrFail($id);

        return new OrderResource($order);
    }
    public function cancel(Request $request)
    {
        $user = auth()->user();

        $order = Order::findOrFail($request->order_id);

        if ($order->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($order->payment_status === 'paid') {
            return response()->json(['message' => 'Already paid'], 400);
        }

        $order->update([
            'status' => 'cancelled',
            'payment_status' => 'unpaid',
        ]);

        return response()->json(['message' => 'Order cancelled']);
    }
}