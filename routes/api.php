<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\App\CartController;
use App\Http\Controllers\Api\App\OrderController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\App\ProductController;
use App\Http\Controllers\Api\App\CheckoutController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;

/* ---------------------------- Admin Routes ---------------------------- */

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
  /* Auth-Routes */
  Route::get('/admin-user', [AuthController::class, 'getAdminUser']);
  Route::post('/admin-logout', [AuthController::class, 'adminLogout']);

  /* Product-ApiResource-Route */
  Route::apiResource('products', AdminProductController::class);

  /* User-Routes */
  Route::prefix('/users')->controller(UserController::class)->group(function () {
    Route::get('/', 'index');
    Route::put('/{user}',  'changeRole');
    Route::delete('/{user}',  'destroy');
  });

  /* Orders-Routes */
  Route::prefix('/orders')->controller(AdminOrderController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{order}', 'view');
    Route::get('/statuses',  'getStatuses');
    Route::post('/change-status/{order}/{status}', 'changeStatus');
  });

  /* Dashboard-Routes */
  Route::prefix('/dashboard')->controller(DashboardController::class)->group(function () {
    Route::get('/users-count',  'usersCount');
    Route::get('/products-count',  'activeProducts');
    Route::get('/orders-count',  'paidOrders');
    Route::get('/income-amount',  'totalIncome');
    Route::get('/latest-orders',  'latestOrders');
    Route::get('/latest-users',  'latestUsers');
    Route::get('/latest-products',  'latestProducts');
  });
});

/* ----------------------------- App Routes ----------------------------- */

Route::middleware(['auth:sanctum'])->group(function () {
  /* Auth-Routes */
  Route::get('/normal-user', [AuthController::class, 'getNormalUser']);
  Route::post('/logout', [AuthController::class, 'logout']);

  /* Cart-Routes */
  Route::prefix('/cart')->controller(CartController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/add', 'add');
    Route::post('/update', 'update');
    Route::delete('/remove/{product_id}', 'remove');
    Route::get('/count', 'count');
  });

  /* Checkout-Route */
  Route::post('/checkout', [CheckoutController::class, 'checkout']);

  /* Orders-Routes */
  Route::prefix('/app-orders')->controller(OrderController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/view/{order_id}', 'view');
    Route::put('/payment/{order_id}', 'updatePayment');
  });
});

/* Auth-Routes */
Route::controller(AuthController::class)->group(function () {
  Route::post('/register',  'register');
  Route::post('/login',  'login');
  Route::post('/admin-login',  'adminLogin');
});

/* App-Products-Routes */
Route::controller(ProductController::class)->group(function () {
  Route::get('/app-products',  'appProducts');
  Route::get('/product-details/{slug}',  'productDetails');
  Route::get('/search-products',  'searchProducts');
});
