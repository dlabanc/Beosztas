<?php

namespace App\Http\Controllers;

use App\Models\Beosztas;
use Illuminate\Http\Request;

class BeosztasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $beosztasok = Beosztas::all();
        return $beosztasok;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $beosztas = new Beosztas();
        $beosztas->datum = $request->datum;
        $beosztas->muszaktipus = $request->muszaktipus;
        $beosztas->muszakszam = $request->muszakszam;        
        $beosztas->munkakor = $request->munkakor;
        $beosztas->alkalmazott = $request->alkalmazott;       
        $beosztas->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Beosztas  $beosztas
     * @return \Illuminate\Http\Response
     */
    public function show($datum, $muszakTipus, $muszakSzam, $munkakor, $alkalmazott)
    {
        $beosztas = Beosztas::where('datum','=',$datum)->where('muszaktipus','=',$muszakTipus)->where('muszakszam','=',$muszakSzam)
        ->where('munkakor','=',$munkakor)->where('alkalmazott','=',$alkalmazott)->first();
        return $beosztas;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Beosztas  $beosztas
     * @return \Illuminate\Http\Response
     */
    public function edit(Beosztas $beosztas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Beosztas  $beosztas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $datum, $muszakTipus, $muszakSzam, $munkakor, $alkalmazott)
    {
        $beosztas = Beosztas::where('datum','=',$datum)->where('muszaktipus','=',$muszakTipus)->where('muszakszam','=',$muszakSzam)
        ->where('munkakor','=',$munkakor)->where('alkalmazott','=',$alkalmazott)->first();
        $muszakeloszlas->muszaktipus = $request->muszaktipus;
        $muszakeloszlas->muszakszam = $request->muszakszam;
        $muszakeloszlas->oratol = $request->oratol;
        $muszakeloszlas->oraig = $request->oraig;
        $muszakeloszlas->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Beosztas  $beosztas
     * @return \Illuminate\Http\Response
     */
    public function destroy($datum, $muszakTipus, $muszakSzam, $munkakor, $alkalmazott)
    {
        $beosztas=Beosztas::where('datum','=',$datum)->where('muszaktipus','=',$muszakTipus)->where('muszakszam','=',$muszakSzam)
        ->where('munkakor','=',$munkakor)->where('alkalmazott','=',$alkalmazott)->first();
        $beosztas->delete();
    }
}
