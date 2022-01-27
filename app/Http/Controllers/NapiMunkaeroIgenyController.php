<?php

namespace App\Http\Controllers;

use App\Models\NapiMunkaeroIgeny;
use Illuminate\Http\Request;

class NapiMunkaeroIgenyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $igenyek = NapiMunkaeroIgeny::all();
        return $igenyek;
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
        $igeny = new NapiMunkaeroIgeny();
        $igeny->datum = $request->datum;
        $igeny->muszaktipus = $request->muszaktipus;
        $igeny->muszakszam = $request->muszakszam;
        $igeny->munkakor = $request->munkakor;
        $igeny->db = $request->db;
        $igeny->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\NapiMunkaeroIgeny  $napiMunkaeroIgeny
     * @return \Illuminate\Http\Response
     */
    public function show($datum, $muszkaTipus, $muszakSzam, $munkakor)
    {
        $igeny = NapiMunkaeroIgeny::where('datum','=',$datum)->where('muszaktipus','=',$muszkaTipus)
        ->where('muszakszam','=',$muszakSzam)->where('munkakor','=',$munkakor)->first();
        return $igeny;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\NapiMunkaeroIgeny  $napiMunkaeroIgeny
     * @return \Illuminate\Http\Response
     */
    public function edit(NapiMunkaeroIgeny $napiMunkaeroIgeny)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\NapiMunkaeroIgeny  $napiMunkaeroIgeny
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $datum, $muszkaTipus, $muszakSzam, $munkakor)
    {
        $igeny = NapiMunkaeroIgeny::where('datum','=',$datum)->where('muszaktipus','=',$muszkaTipus)
        ->where('muszakszam','=',$muszakSzam)->where('munkakor','=',$munkakor)->first();
        $igeny->datum = $request->datum;
        $igeny->muszaktipus = $request->muszaktipus;
        $igeny->muszakszam = $request->muszakszam;
        $igeny->munkakor = $request->munkakor;
        $igeny->db = $request->db;
        $igeny->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\NapiMunkaeroIgeny  $napiMunkaeroIgeny
     * @return \Illuminate\Http\Response
     */
    public function destroy($datum, $muszkaTipus, $muszakSzam, $munkakor)
    {
        $igeny = NapiMunkaeroIgeny::where('datum','=',$datum)->where('muszaktipus','=',$muszkaTipus)
        ->where('muszakszam','=',$muszakSzam)->where('munkakor','=',$munkakor)->first();
        $igeny->delete();
    }
}
