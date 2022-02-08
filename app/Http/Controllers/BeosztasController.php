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
        $beosztas->napim_azonosito = $request->napim_azonosito;
        $beosztas->alkalmazott = $request->alkalmazott;       
        $beosztas->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Beosztas  $beosztas
     * @return \Illuminate\Http\Response
     */
    public function show($beo_azonosito)
    {
        $beosztas = Beosztas::find($beo_azonosito);
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
    public function update(Request $request, $beo_azonosito)
    {
        $beosztas = Beosztas::find($beo_azonosito);
        $beosztas->napim_azonosito = $request->napim_azonosito;
        $beosztas->alkalmazott = $request->alkalmazott;       
        $beosztas->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Beosztas  $beosztas
     * @return \Illuminate\Http\Response
     */
    public function destroy($beo_azonosito)
    {
        $beosztas = Beosztas::find($beo_azonosito);
        $beosztas->delete();
    }

    public function expandAll(){
        $beosztas = Beosztas::with('alkalmazottAdat')->with('napimunkaeroigeny')->get();
        return $beosztas;
    }

    public function expandId($beo_azonosito){
        $beosztas = Beosztas::with('alkalmazottAdat')->with('napimunkaeroigeny')->find($beo_azonosito);
        return $beosztas;
    }
}
