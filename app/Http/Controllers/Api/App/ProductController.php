<?php

namespace App\Http\Controllers\Api\App;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Api\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
  public  function  appProducts()
  {
    $perPage = request('per_page',8);
    $sortField = request('sort_field','created_at');
    $sort_direction = request('sort_direction','desc');

    $query = Product::query()
      ->where('published',1)
      ->orderBy($sortField,$sort_direction)
      ->paginate($perPage);

    return ProductResource::collection($query);
  }

  public function productDetails($slug)
  {
    $query = Product::query()->where('slug',$slug)->get();
    return ProductResource::collection($query);
  }

  public function searchProducts()
  {
    $search = request('search','');
    $query = Product::query()
      ->where('title','like',"%{$search}%")
      ->paginate(8);

    return ProductResource::collection($query);
  }
}
