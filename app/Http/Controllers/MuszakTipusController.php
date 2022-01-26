<?php

namespace App\Http\Controllers;

use App\Models\MuszakTipus;
use Illuminate\Http\Request;

class MuszakTipusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $muszaktipusok=MuszakTipus::all();
        return $muszaktipusok;
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
        $muszaktipus = new MuszakTipus();
        $muszaktipus->tipus = $request->tipus;
        $muszaktipus->leiras = $request->leiras;
        $muszaktipus->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MuszakTipus  $muszakTipus
     * @return \Illuminate\Http\Response
     */
    public function show($muszaktipusId)
    {
        $muszaktipus = MuszakTipus::find($muszaktipusId);
        return $muszaktipus;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MuszakTipus  $muszakTipus
     * @return \Illuminate\Http\Response
     */
    public function edit(MuszakTipus $muszakTipus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MuszakTipus  $muszakTipus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $muszaktipusId)
    {
        $muszaktipus = MuszakTipus::find($muszaktipusId);
        $muszaktipus->tipus = $request->tipus;
        $muszaktipus->leiras = $request->leiras;
        $muszaktipus->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MuszakTipus  $muszakTipus
     * @return \Illuminate\Http\Response
     */
    public function destroy($muszaktipusId)
    {
        $muszaktipus=Muszaktipus::find($muszaktipusId);
        $muszaktipus->delete();
    }
}
