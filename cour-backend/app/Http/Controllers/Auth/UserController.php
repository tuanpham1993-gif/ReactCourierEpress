<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    //
    public function updateProfile(Request $request)
    {
        $request->validate([
            'full_name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'nullable',
            'city' => 'nullable',
        ]);

        // tạm thời chưa auth → dùng id gửi từ frontend
        $user = User::find($request->id);

        if (!$user) {
            return response()->json([
                'message' => 'User không tồn tại'
            ], 404);
        }

        $user->update([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
        ]);

        return response()->json([
            'message' => 'Cập nhật thành công',
            'user' => $user
        ]);
    }
    public function getProfile($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User không tồn tại'
            ], 404);
        }

        return response()->json([
            'user' => $user
        ]);
    }
}
