<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Models\BejelentkezesiAdatok;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class JelszoVisszaAllitasController extends Controller
{
    public function sendResetLink(Request $request){
        $email=$request->only('email');
        $status = Password::sendResetLink(
            $email
        );
     
        return $status === Password::RESET_LINK_SENT
                    ? throw ValidationException::withMessages(['status' => __($status)])
                    : throw ValidationException::withMessages(['email' => __($status)]);
    }


    public function passwordReset(Request $request){
        if(!strcmp($request->password,$request->password_confirm)==0){
            throw ValidationException::withMessages(['passerror'=>'A két jelszó nem egyezik!']);
        }
        $alk = BejelentkezesiAdatok::where('email',$request->only('email'))->get()->first();
        $credentials=['user_login' => $alk->user_login, 'password' => $request->only('password')['password'], 'email'=>$alk->email, 'token'=>$request->reset_token];
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
                    ? redirect()->route('bejelentkezes')
                    : throw ValidationException::withMessages(['reseterror' => __($status)]);
    }
}
