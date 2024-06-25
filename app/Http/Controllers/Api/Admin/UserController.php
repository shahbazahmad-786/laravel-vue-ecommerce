<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function index()
    {
        $perPage = request('per_page', 10);
        $search = request('search', '');
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');

        $query = User::query()
            ->where('name', 'like', "%{$search}%")
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage);

        return UserResource::collection($query);
    }

    public function changeRole(User $user)
    {
        if ($user->is_admin === 0) {
            $user->is_admin = 1;
        } elseif ($user->is_admin === 1) {
            $user->is_admin = 0;
        }

        $user->update();

        return response()->noContent();
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->noContent();
    }
}
