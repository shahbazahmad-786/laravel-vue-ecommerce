<?php

namespace App\Http\Controllers\Api\App;

use App\Models\Order;
use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\OrderItem;

class OrderController extends Controller
{
    public function index()
    {
        $userId = \request()->user()->id;

        $orders = Order::query()
            ->where('created_by', $userId)
            ->with('items')
            ->orderBy('created_at', 'desc')
            ->get();

        return response([
            'orders' => $orders,
        ]);
    }

    public function view($order_id)
    {
        $userId = \request()->user()->id;

        /* Get Single Order */
        $order = Order::query()
            ->where(['id' => $order_id, 'created_by' => $userId])
            ->get();

        /* Get Order-Items with Products */
        $orderItems = OrderItem::query()
            ->where('order_id', $order_id)
            ->with('product')
            ->get();

        return response([
            'order' => $order,
            'orderItems' => $orderItems
        ]);
    }

    public function updatePayment($order_id)
    {
        $userId = \request()->user()->id;

        $order = Order::where([
            'id' => $order_id,
            'created_by' => $userId
        ])->first();

        if ($order) {
            $order->status = OrderStatus::Paid;
            $order->update();
        }

        return response()->noContent();
    }
}
