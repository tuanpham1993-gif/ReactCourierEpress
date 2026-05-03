<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    //
    public function updateProfile(Request $request)
    {
        $user = auth()->user();// lấy thông tin user hiện tại

        $request->validate([
            'full_name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'required',
            'address' => 'nullable',
            'city' => 'nullable',
        ]);

        $user->update($request->only([
            'full_name',
            'email',
            'phone',
            'address',
            'city'
        ]));

        return response()->json([
            'message' => 'Cập nhật thành công',
            'user' => $user
        ]);
    }
    public function getProfile()
    {
        return response()->json([
            'user' => Auth::user()// lấy thông tin user hiện tại
        ]);
    }
}
