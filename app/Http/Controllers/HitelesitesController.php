<?php

namespace App\Http\Controllers;

use App\Models\BejelentkezesiAdatok;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Session;
use Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Exception;

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
            return  redirect()->back()->withErrors(['loginlimit'=>'Too many failed login attempts!'.$seconds.' s left to try again!']);
        }

        if(Auth::attempt($credentials))
        {
            RateLimiter::clear('login');          
            return redirect('/usermenu');           
        }
        else{
            RateLimiter::hit('login', $seconds = 60);
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
        
        // $request->validate([
        //     'oldpwd' => 'required',
        //     'newpwd' => 'same:confirmpwd|min:6',
        //     'confirmpwd' => 'required',
        // ]);
        
        if (!Hash::check($request->oldpwd, $userPassword)) {
            return redirect()->back()->withErrors(['oldpwd'=>'A jelszó nem egyezzik!']);
        }

        if (Hash::check($request->newpwd, $userPassword)) {
            return redirect()->back()->withErrors(['newpwd'=>'Az új jelszó nem lehet ugyanaz mint a régi jelszó!']);
        }

        if(!strcmp($request->newpwd,$request->confirmpwd)==0){
            return redirect()->back()->withErrors(['currentpwd'=>'A megadott jelszó nem egyezik meg az új jelszóval!']);
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
