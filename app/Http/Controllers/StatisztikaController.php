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

    public function jovohet(){
        return DB::table('jovohet')->get();
    }

    public function aktualishet(){
        return DB::table('aktualis_het')->get();
    }

    public function alkalmazhatoak(){
        return DB::table('alkalmazhatoak')->get();
    }

    public function jovoheti_napimunkaeroigeny(){
        return DB::table('jovoheti_napimunkaeroigeny')->get();
    }

    public function aktualishetExpand(){
        $akthet = DB::table('aktualis_het')->get()->toArray();
        $muszak = DB::table('muszakeloszlas')->get()->toArray();

        foreach($akthet as $nap)
        {
            $nap->muszakeloszlas = array_filter($muszak, function($muszakelo) use ($nap) {
                return $muszakelo->muszaktipus === $nap->muszaktipus;
            });
        }

        return $akthet;
    }
}
