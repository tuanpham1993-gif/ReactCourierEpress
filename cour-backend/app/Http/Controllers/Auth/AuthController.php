<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
     public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'full_name' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'city' => 'required'
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'role_id' => 3,
            'branch_id' => null,
            'full_name' => $request->full_name,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'status' => 'active'
        ]);

        // ❗ Ẩn password
        $user->makeHidden(['password']);

        return response()->json([
            'message' => 'Đăng ký thành công',
            'user' => $user
        ]);
    }

    // LOGIN (ĐÚNG CHUẨN SANCTUM)
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('username', $request->username)
            ->orWhere('email', $request->username)
            ->first();

        if (!$user) {
            return response()->json(['message' => 'Sai tài khoản hoặc mật khẩu'], 401);
        }

        if (!Hash::check(trim($request->password), $user->password)) {
            return response()->json(['message' => 'Sai tài khoản hoặc mật khẩu'], 401);
        }

        return response()->json([
            'user' => $user
        ]);
    }
    // GET USER LOGIN

    // LOGOUT
    public function logout()
    {
        return response()->json([
            'message' => 'OK'
        ]);
    }
}
