<?php

namespace App\Http\Controllers\Api\App;

use App\Models\Order;
use App\Models\Payment;
use App\Models\CartItem;
use App\Models\OrderItem;
use App\Enums\OrderStatus;
use App\Models\Api\Product;
use Illuminate\Support\Arr;
use App\Enums\PaymentStatus;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $user_id = $request->user()->id;
        $cartItems = CartItem::where('user_id', $user_id)->get()->map(
            fn ($item) => ['product_id' => $item->product_id, 'quantity' => $item->quantity]
        );

        $ids = Arr::pluck($cartItems, 'product_id');
        $products = Product::query()->whereIn('id', $ids)->get();
        $cartItems = Arr::keyBy($cartItems, 'product_id');

        $orderItems = [];
        $lineItems = [];
        $totalPrice = 0;
        foreach ($products as $product) {
            $quantity = $cartItems[$product->id]['quantity'];
            $totalPrice += $product->price * $quantity;
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $product->title,
                    ],
                    'unit_amount' => $product->price * 100,
                ],
                'quantity' => $quantity,
            ];
            $orderItems[] = [
                'product_id' => $product->id,
                'quantity' => $quantity,
                'unit_price' => $product->price
            ];
        }

        /* Create Order */
        $orderData = [
            'total_price' => $totalPrice,
            'status' => OrderStatus::Unpaid,
            'created_by' => $user_id,
            'updated_by' => $user_id,
        ];
        $order = Order::create($orderData);

        /* Create Order Items */
        foreach ($orderItems as $orderItem) {
            $orderItem['order_id'] = $order->id;
            OrderItem::create($orderItem);
        }

        /* Create Payment */
        $paymentData = [
            'order_id' => $order->id,
            'amount' => $totalPrice,
            'status' => PaymentStatus::Pending,
            'type' => 'cc',
            'created_by' => $user_id,
            'updated_by' => $user_id
        ];
        Payment::create($paymentData);

        /* Delete CartItems after Checkout */
        CartItem::where(['user_id' => $user_id])->delete();
    }
}
