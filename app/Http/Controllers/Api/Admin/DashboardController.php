<?php

namespace App\Http\Controllers\Api\Admin;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Enums\OrderStatus;
use App\Traits\ReportTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\OrderResource;

class DashboardController extends Controller
{
    use ReportTrait;

    public function usersCount()
    {
        return User::query()->count();
    }

    public function activeProducts()
    {
        return Product::where('published', '=', 1)->count();
    }

    public function paidOrders()
    {
        $fromDate = $this->getFromDate();
        $query = Order::query()->where('status', OrderStatus::Paid->value);

        if ($fromDate) {
            $query->where('created_at', '>', $fromDate);
        }

        return $query->count();
    }

    public function totalIncome()
    {
        $fromDate = $this->getFromDate();
        $query = Order::query()->where('status', OrderStatus::Paid->value);

        if ($fromDate) {
            $query->where('created_at', '>', $fromDate);
        }
        return round($query->sum('total_price'));
    }

    public function latestOrders()
    {
        return OrderResource::collection(
            Order::query()
                ->select([
                    'o.id', 'o.total_price', 'o.created_at', DB::raw('COUNT(oi.id) AS items')
                ])
                ->from('orders AS o')
                ->join('order_items AS oi', 'oi.order_id', '=', 'o.id')
                ->where('o.status', OrderStatus::Paid->value)
                ->limit(10)
                ->orderBy('o.created_at', 'desc')
                ->groupBy('o.id', 'o.total_price', 'o.created_at')
                ->get()
        );
    }

    public function latestUsers()
    {
        return User::query()
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();
    }

    public function latestProducts()
    {
        return Product::query()
            ->orderBy('created_at', 'desc')
            ->with('user')
            ->limit(3)
            ->get();
    }
}
