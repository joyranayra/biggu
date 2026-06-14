<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Snap;
use Midtrans\Config;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Support\Facades\Log;

class MidtransController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = false;
    }

    public function tokenCart(Request $request)
    {
        $user = auth()->user();
        $items = $request->items;

        if (empty($items)) {
            return response()->json(['message' => 'Items required'], 400);
        }

        $subtotal = collect($items)->sum(fn($i) => $i['price'] * $i['quantity']);
        $tax = (int) ($subtotal * 0.1);
        $grossAmount = $subtotal + $tax;

        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => $grossAmount,
            'status' => 'pending',
            'payment_status' => 'pending',
            'shipping_address' => $request->shipping_address,
        ]);

        foreach ($items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'item_type' => $item['type'] === 'product'
                    ? \App\Models\Product::class
                    : \App\Models\Workshop::class,
                'item_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        $itemDetails = collect($items)->map(fn($item) => [
            'id' => (string) $item['id'],
            'price' => (int) $item['price'],
            'quantity' => (int) $item['quantity'],
            'name' => substr($item['name'], 0, 50),
        ])->toArray();

        $itemDetails[] = [
            'id' => 'tax',
            'price' => $tax,
            'quantity' => 1,
            'name' => 'Pajak (10%)',
        ];

        return $this->createSnap($order, $grossAmount, $itemDetails, $user);
    }

    public function tokenOrder(Request $request)
    {
        $user = auth()->user();

        $order = Order::with('items')->findOrFail($request->order_id);

        if ($order->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if (!in_array($order->payment_status, ['pending', 'unpaid'])) {
            return response()->json(['message' => 'Invalid payment state'], 400);
        }

        $grossAmount = $order->total_price;

        $itemDetails = $order->items->map(function ($item) {
            return [
                'id' => (string) $item->item_id,
                'price' => (int) $item->price,
                'quantity' => (int) $item->quantity,
                'name' => substr(data_get($item, 'item.name', 'Item'), 0, 50),
            ];
        })->toArray();

        return $this->createSnap($order, $grossAmount, $itemDetails, $user);
    }

    private function createSnap($order, $grossAmount, $itemDetails, $user)
    {
        $midtransOrderId = 'ORDER-' . $order->id . '-' . uniqid();

        $payment = Payment::where('order_id', $order->id)->first();

        if ($payment && $payment->transaction_status === 'pending' && $payment->snap_token) {
            return response()->json([
                'token' => $payment->snap_token,
                'order_id' => $order->id,
            ]);
        }

        $params = [
            'transaction_details' => [
                'order_id' => $midtransOrderId,
                'gross_amount' => $grossAmount,
            ],
            'item_details' => $itemDetails,
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
            'callbacks' => [
                'finish' => url('/order'),
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
        } catch (\Exception $e) {
            Log::error('MIDTRANS ERROR: ' . $e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }

        if ($payment) {
            $payment->update([
                'midtrans_order_id' => $midtransOrderId,
                'snap_token' => $snapToken,
                'transaction_status' => 'pending',
            ]);
        } else {
            Payment::create([
                'order_id' => $order->id,
                'midtrans_order_id' => $midtransOrderId,
                'gross_amount' => $grossAmount,
                'snap_token' => $snapToken,
                'transaction_status' => 'pending',
            ]);
        }

        return response()->json([
            'token' => $snapToken,
            'order_id' => $order->id,
        ]);
    }

    public function callback(Request $request)
    {
        Log::info('MIDTRANS CALLBACK', $request->all());

        $payment = Payment::where('midtrans_order_id', $request->order_id)->first();

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $payment->update([
            'transaction_id' => $request->transaction_id,
            'payment_type' => $request->payment_type,
            'transaction_status' => $request->transaction_status,
            'payload' => $request->all(),
            'paid_at' => in_array($request->transaction_status, ['settlement', 'capture']) ? now() : null,
        ]);

        $order = $payment->order;

        if (in_array($request->transaction_status, ['settlement', 'capture'])) {
            $order->update([
                'payment_status' => 'paid',
                'status' => 'processing',
            ]);
        } elseif ($request->transaction_status === 'pending') {
            $order->update([
                'payment_status' => 'pending',
            ]);
        } elseif (in_array($request->transaction_status, ['expire', 'cancel'])) {
            $order->update([
                'payment_status' => 'unpaid',
                'status' => 'pending',
            ]);
        }

        return response()->json(['message' => 'OK']);
    }
}