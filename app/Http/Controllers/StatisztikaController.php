<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisztikaController extends Controller
{
    public function dolgozottnapok(){
        return DB::table('dolgozottstat_nev')->get();
    }

    public function munkakor(){
        return DB::table('munkakordb')->get();
    }

    public function hetioraszam(){
        return DB::table('hetioraszamdb')->get();
    }

    public function szabadsagstat(){
        return DB::table('szabadsagstat')->get();
    }

    public function napiposzt(){
        return DB::table('aktualis_poszt')->get();
    }

    public function szabadsag_kerok(){
        return DB::table('szabadsag_kerok')->get();
    }
}
