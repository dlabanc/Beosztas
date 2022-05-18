<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Session;
use Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class HitelesitesController extends Controller
{
    public function index()
    {
        return view('login/login');
    }

    public function authenticate(Request $request){
        $credentials = $request->only('user_login', 'password');
        if (RateLimiter::tooManyAttempts('login', 3)) {
            $seconds = RateLimiter::availableIn('login');
            throw ValidationException::withMessages(['loginlimit'=>'Túl sok sikertelen próbálkozás! Próbáld újra '.$seconds.' másodperc múlva!']); 
        }

        if(Auth::attempt($credentials))
        {
            RateLimiter::clear('login');
            if (Auth::user()->alkalmazott->munkakor!='Adminisztrátor' && Auth::user()->alkalmazott->munkakor!='Üzletvezető') {
                return redirect('/usermenu');
            }          
            return redirect('/');           
        }
        else{ 
            RateLimiter::hit('login', $seconds = 60);
            $tries = RateLimiter::remaining('login',3);
            throw ValidationException::withMessages(['wrongpass'=>'Hibás jelszó! '.$tries.' próbálkozás maradt!']);
        }
        return redirect('/login');
    }

    public function loggedInUser(){
        return Auth::user()->user_login;
    }

    public function changePassword(Request $request)
    {       
        $user = Auth::user();
        
        $userPassword = $user->password;
        
        if (!Hash::check($request->oldpwd, $userPassword)) {
            throw ValidationException::withMessages(['oldpwd'=>'A jelszó nem egyezzik!']); 
        }

        if (Hash::check($request->newpwd, $userPassword)) {
            throw ValidationException::withMessages(['newpwd'=>'Az új jelszó nem lehet ugyanaz mint a régi jelszó!']);
        }

        if(!strcmp($request->newpwd,$request->confirmpwd)==0){
            throw ValidationException::withMessages(['confirmpwd'=>'A megadott jelszó nem egyezik meg az új jelszóval!']);
        }

        $user->password = Hash::make($request->newpwd);
        $user->timestamps = false;
        $user->save();

        return redirect()->back();
    }


    public function logout() {
        Session::flush();
        Auth::logout();
        return redirect('/login');
    }
}
