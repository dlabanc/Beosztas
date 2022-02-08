<?php

namespace App\Http\Controllers;

use App\Models\NemDolgozna;
use Illuminate\Http\Request;

class NemDolgoznaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $nemdolgozna = NemDolgozna::all();
        return $nemdolgozna;
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
        $nemdolgozna = new NemDolgozna();
        $nemdolgozna->alkalmazott = $request->alkalmazott;
        $nemdolgozna->datum = $request->datum;
        $nemdolgozna->muszakelo_azon = $request->muszakelo_azon;
        $nemdolgozna->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\NemDolgozna  $nemDolgozna
     * @return \Illuminate\Http\Response
     */
    public function show($nemdolgozna_azon)
    {
        $nemdolgozna = NemDolgozna::find($nemdolgozna_azon);
        return $nemdolgozna;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\NemDolgozna  $nemDolgozna
     * @return \Illuminate\Http\Response
     */
    public function edit(NemDolgozna $nemDolgozna)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\NemDolgozna  $nemDolgozna
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $nemdolgozna_azon)
    {
        $nemdolgozna = NemDolgozna::find($nemdolgozna_azon);
        $nemdolgozna->alkalmazott = $request->alkalmazott;
        $nemdolgozna->datum = $request->datum;
        $nemdolgozna->muszakelo_azon = $request->muszakelo_azon;
        $nemdolgozna->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\NemDolgozna  $nemDolgozna
     * @return \Illuminate\Http\Response
     */
    public function destroy($nemdolgozna_azon)
    {
        $nemdolgozna = NemDolgozna::find($nemdolgozna_azon);
        $nemdolgozna->delete();
    }

    public function expandAll(){
        $nemdolgozna = NemDolgozna::with('muszakeloszlas')->get();
        return $nemdolgozna;
    }

    public function expandId($nemdolgozna_azon){
        $nemdolgozna = NemDolgozna::with('muszakeloszlas')->find($nemdolgozna_azon);
        return $nemdolgozna;
    }
}
