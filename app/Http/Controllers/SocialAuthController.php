<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    /**
     * Redirect to Google for authentication
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google callback after authentication
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Check if user exists with this google_id
            $user = User::where('google_id', $googleUser->id)->first();

            if ($user) {
                // User exists, update last login and log them in
                $user->update([
                    'last_login_at' => now(),
                ]);
                Auth::login($user);
                return redirect()->intended('/home');
            }

            // Check if user exists with this email
            $user = User::where('email', $googleUser->email)->first();

            if ($user) {
                // Update existing user with google_id, mark as verified, and update last login
                $user->update([
                    'google_id' => $googleUser->id,
                    'email_verified_at' => now(),
                    'last_login_at' => now(),
                ]);
                Auth::login($user);
                return redirect()->intended('/home');
            }

            // Create new user with Google account (auto-verified)
            $user = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'email_verified_at' => now(), // Auto-verify Google users
                'last_login_at' => now(), // Record first login
                'password' => null,
                'phone' => '',
                'admin' => 0,
                'country' => 1,
            ]);

            Auth::login($user);
            return redirect('/home');

        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Failed to authenticate with Google. Please try again.');
        }
    }
}
