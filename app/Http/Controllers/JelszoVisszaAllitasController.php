<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Models\BejelentkezesiAdatok;
use App\Models\Alkalmazott;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class JelszoVisszaAllitasController extends Controller
{
    public function linkKuldes(Request $request){
        $email=$request->only('email');
        $status = Password::sendResetLink(
            $email
        );
     
        return $status === Password::RESET_LINK_SENT
                    ? back()->with(['status' => __($status)])
                    : back()->withErrors(['email' => __($status)]);
    }


    public function jelszoVisszaallitas(Request $request){
        $alk = BejelentkezesiAdatok::where('email',$request->only('email'))->get()->first();
        $credentials=['user_login' => $alk->user_login, 'password' => $request->only('password')['password'], 'email'=>$alk->email, 'token'=>$request->token2];
        $status = Password::reset(
            $credentials,
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ]);
     
                $user->save();
     
                event(new PasswordReset($user));
            }
        );
     
        return $status === Password::PASSWORD_RESET
                    ? redirect()->route('bejelentkezes')->with('status', __($status))
                    : back()->withErrors(['email' => [__($status)]]);
    }
}
