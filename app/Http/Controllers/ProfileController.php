<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Cart;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Profile/Index', [
            'auth'  => ['user' => auth()->user()],
            'flash' => ['success' => session('success')],
            'cartCount' => auth()->check()
                ? Cart::where('user_id', auth()->id())->sum('quantity')
                : 0,
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:users,email,' . $user->id,
            'phone'       => 'nullable|string|max:20',
            'address'     => 'nullable|string',
            'city'        => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:10',
        ]);

        $user->update($request->only([
            'name',
            'email',
            'phone',
            'address',
            'city',
            'postal_code'
        ]));

        return back()->with('success', 'Profile berhasil diupdate!');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password'         => 'required|min:8|confirmed',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors([
                'current_password' => 'Password lama tidak sesuai'
            ]);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Password berhasil diubah!');
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
