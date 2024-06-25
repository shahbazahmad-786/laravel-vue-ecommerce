<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
  /* ---------------- Register-Method ---------------- */
  public function register(Request $request)
  {
    /* Validation */
    $data = $request->validate([
      'name' => 'required|string',
      'email' => 'required|email|string|unique:users,email',
      'password' => [
        'required',
        'confirmed',
        Password::min(8)->mixedCase()->numbers()->symbols()
      ]
    ]);

    /* Create User */
    $user = User::create([
      'name' => $data['name'],
      'email' => $data['email'],
      'password' => bcrypt($data['password']),
      'email_verified_at' => now(),
      'is_admin' => false
    ]);

    /* Create Token */
    $token = $user->createToken('main')->plainTextToken;

    /* Return Response */
    return response([
      'user' => new UserResource($user),
      'token' => $token
    ]);
  }

  /* --------------- Admin-Login-Method -------------- */
  public function adminLogin(Request $request)
  {
    /* Validation */
    $credentials = $request->validate([
      'email' => ['required', 'email'],
      'password' => 'required',
      'remember' => 'boolean',
    ]);

    /* Remember-Me */
    $remember = $credentials['remember'] ?? false;
    unset($credentials['remember']);

    /* Match User-Data */
    if (!Auth::attempt($credentials, $remember)) {
      return response([
        'message' => 'Email or password is incorrect'
      ], 422);
    }

    $user = Auth::user();

    /* Check is_admin */
    if (!$user->is_admin) {
      Auth::logout();

      return response([
        'message' => 'You don\'t have permission to authenticate as admin'
      ], 403);
    }

    /* Verified Email */
    if (!Auth::user()->email_verified_at) {
      Auth::logout();

      return response([
        'message' => 'Your email address is not verified'
      ], 403);
    }

    /* Create Token */
    $token = $user->createToken('main')->plainTextToken;

    /* Return Response */
    return response([
      'user' => new UserResource($user),
      'token' => $token,
    ]);
  }

  /* --------------- App-Login-Method ---------------- */
  public function login(Request $request)
  {
    /* Validation */
    $credentials = $request->validate([
      'email' => ['required', 'email'],
      'password' => 'required',
      'remember' => 'boolean',
    ]);

    /* Remember-Me */
    $remember = $credentials['remember'] ?? false;
    unset($credentials['remember']);

    /* Match User-Data */
    if (!Auth::attempt($credentials, $remember)) {
      return response([
        'message' => 'Email or password is incorrect'
      ], 422);
    }

    $user = Auth::user();

    /* Verified Email */
    if (!Auth::user()->email_verified_at) {
      Auth::logout();

      return response([
        'message' => 'Your email address is not verified'
      ], 403);
    }

    /* Create Token */
    $token = $user->createToken('main')->plainTextToken;

    /* Return Response */
    return response([
      'user' => new UserResource($user),
      'token' => $token,
    ]);
  }

  /* --------------- Admin-Logout-Method ------------- */
  public function adminLogout()
  {
    $user = Auth::user();

    /* Delete Token */
    $user->currentAccessToken()->delete();

    /* Return Response */
    return response([
      'message' => 'Logout successfully'
    ], 204);
  }

  /* --------------- App-Logout-Method --------------- */
  public function logout()
  {
    $user = Auth::user();

    /* Delete Token */
    $user->currentAccessToken()->delete();

    /* Return Response */
    return response([
      'message' => 'Logout successfully'
    ], 204);
  }

  /* ------------- Admin-Get-User-Method ------------- */
  public function getAdminUser(Request $request)
  {
    return new UserResource($request->user());
  }

  /* -------------- App-Get-User-Method -------------- */
  public function getNormalUser(Request $request)
  {
    return new UserResource($request->user());
  }
}
