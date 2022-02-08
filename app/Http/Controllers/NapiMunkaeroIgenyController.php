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
        $igeny->muszakelo_azon = $request->muszakelo_azon;
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
    public function show($napim_azonosito)
    {
        $igeny = NapiMunkaeroIgeny::find($napim_azonosito);
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
    public function update(Request $request, $napim_azonosito)
    {
        $igeny = NapiMunkaeroIgeny::find($napim_azonosito);
        $igeny->datum = $request->datum;
        $igeny->muszakelo_azon = $request->muszakelo_azon;
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
    public function destroy($napim_azonosito)
    {
        $igeny = NapiMunkaeroIgeny::find($napim_azonosito);
        $igeny->delete();
    }

    public function expandAll()
    {
        $igeny = NapiMunkaeroIgeny::with('muszakeloszlas')->get();
        return $igeny;
    }

    public function expandId($napim_azonosito)
    {
        $igeny = NapiMunkaeroIgeny::with('muszakeloszlas')->find($napim_azonosito);
        return $igeny;
    }
}
