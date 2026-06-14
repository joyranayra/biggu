<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Workshop;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'products' => Product::count(),
            'workshops' => Workshop::count(),
            'orders' => Order::count(),

            'revenue' => Order::where('status', 'completed')
                ->sum('total_price'),

            'today_orders' => Order::whereDate('created_at', today())
                ->count(),

            'today_revenue' => Order::whereDate('created_at', today())
                ->where('status', 'completed')
                ->sum('total_price'),

            'pending_orders' => Order::where('status', 'pending')
                ->count(),

            'top_products' => OrderItem::select(
                    DB::raw("
                        CASE
                            WHEN item_type LIKE '%Product%' THEN products.name
                            ELSE workshops.name
                        END as name
                    "),
                    DB::raw("SUM(quantity) as total")
                )
                ->leftJoin('products', function ($join) {
                    $join->on('order_items.item_id', '=', 'products.id')
                        ->where('order_items.item_type', 'LIKE', '%Product%');
                })
                ->leftJoin('workshops', function ($join) {
                    $join->on('order_items.item_id', '=', 'workshops.id')
                        ->where('order_items.item_type', 'LIKE', '%Workshop%');
                })
                ->groupBy('name')
                ->orderByDesc('total')
                ->limit(5)
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => $item->name ?? 'Unknown',
                        'total' => (int) $item->total,
                    ];
                }),
        ];

        return Inertia::render('admin/dashboard/index', [
            'stats' => $stats
        ]);
    }
}