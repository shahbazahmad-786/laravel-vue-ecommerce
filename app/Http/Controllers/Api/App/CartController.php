<?php

namespace App\Http\Controllers\Api\App;

use App\Models\CartItem;
use App\Models\Api\Product;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    public function index()
    {
        $request = \request();
        $user_id = $request->user()->id;
        $cartItems = CartItem::where('user_id', $user_id)->get()->map(
            fn ($item) => ['product_id' => $item->product_id, 'quantity' => $item->quantity]
        );

        $ids = Arr::pluck($cartItems, 'product_id');
        $products = Product::query()->whereIn('id', $ids)->get();
        $cartItems = Arr::keyBy($cartItems, 'product_id');

        $total = 0;
        foreach ($products as $product) {
            $total += $product->price * $cartItems[$product->id]['quantity'];
        }

        return response([
            'cartProducts' => $products,
            'cartQuantities' => $cartItems,
            'total' => $total
        ]);
    }

    public function add(Request $request)
    {
        $cartItem = CartItem::where([
            'user_id' => $request->user()->id,
            'product_id' => $request->product_id
        ])->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->update();
        } else {
            $query = [
                'user_id' => $request->user()->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity
            ];

            CartItem::create($query);
        }
    }

    public function remove(Request $request, $product_id)
    {
        $user_id = $request->user()->id;
        $cartItem = CartItem::query()
            ->where(['user_id' => $user_id, 'product_id' => $product_id])
            ->first();

        if ($cartItem) {
            $cartItem->delete();
        }

        return response()->noContent();
    }

    public function update(Request $request)
    {
        $cartItem = CartItem::where([
            'user_id' => $request->user()->id,
            'product_id' => $request->product_id
        ])->first();

        $cartItem->quantity = $request->quantity;
        $cartItem->update();
    }

    public function count()
    {
        $cartCount = CartItem::where('user_id', \request()->user()->id)->count();

        return response([
            'cartCount' => $cartCount
        ]);
    }
}
