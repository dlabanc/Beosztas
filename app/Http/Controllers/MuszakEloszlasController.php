<?php

namespace App\Http\Controllers;

use App\Models\MuszakEloszlas;
use Illuminate\Http\Request;

class MuszakEloszlasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $muszakeloszlas = MuszakEloszlas::all();
        return $muszakeloszlas;
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
        $muszakeloszlas = new MuszakEloszlas();
        $muszakeloszlas->muszaktipus = $request->muszaktipus;
        $muszakeloszlas->muszakszam = $request->muszakszam;
        $muszakeloszlas->oratol = $request->oratol;
        $muszakeloszlas->oraig = $request->oraig;
        $muszakeloszlas->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MuszakEloszlas  $muszakEloszlas
     * @return \Illuminate\Http\Response
     */
    public function show($muszakelo_azon)
    {
        $muszakeloszlas = MuszakEloszlas::find($muszakelo_azon);
        return $muszakeloszlas;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MuszakEloszlas  $muszakEloszlas
     * @return \Illuminate\Http\Response
     */
    public function edit(MuszakEloszlas $muszakEloszlas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MuszakEloszlas  $muszakEloszlas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $muszakelo_azon)
    {
        $muszakeloszlas = MuszakEloszlas::find($muszakelo_azon);
        $muszakeloszlas->muszaktipus = $request->muszaktipus;
        $muszakeloszlas->muszakszam = $request->muszakszam;
        $muszakeloszlas->oratol = $request->oratol;
        $muszakeloszlas->oraig = $request->oraig;
        $muszakeloszlas->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MuszakEloszlas  $muszakEloszlas
     * @return \Illuminate\Http\Response
     */
    public function destroy($muszakelo_azon)
    {
        $muszakeloszlas = MuszakEloszlas::find($muszakelo_azon);
        $muszakeloszlas->delete();
    }
}
