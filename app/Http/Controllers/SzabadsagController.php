<?php

namespace App\Http\Controllers;

use App\Models\Szabadsag;
use Illuminate\Http\Request;

class SzabadsagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $szabadsagok = Szabadsag::all();
        return $szabadsagok;
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
        $szabadsag = new Szabadsag();
        $szabadsag->alkalmazott = $request->alkalmazott;
        $szabadsag->tol = $request->tol;
        $szabadsag->ig = $request->ig;
        $szabadsag->szabadsagtipus = $request->szabadsagtipus;
        $szabadsag->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Szabadsag  $szabadsag
     * @return \Illuminate\Http\Response
     */
    public function show($szabadsag_azonosito)
    {
        $szabadsag = Szabadsag::find($szabadsag_azonosito);
        return $szabadsag;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Szabadsag  $szabadsag
     * @return \Illuminate\Http\Response
     */
    public function edit(Szabadsag $szabadsag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Szabadsag  $szabadsag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $szabadsag_azonosito)
    {
        $szabadsag = Szabadsag::find($szabadsag_azonosito);
        $szabadsag->alkalmazott = $request->alkalmazott;
        $szabadsag->tol = $request->tol;
        $szabadsag->ig = $request->ig;
        $szabadsag->szabadsagtipus = $request->szabadsagtipus;
        $szabadsag->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Szabadsag  $szabadsag
     * @return \Illuminate\Http\Response
     */
    public function destroy($szabadsag_azonosito)
    {
        $szabadsag = Szabadsag::find($szabadsag_azonosito);
        $szabadsag->delete();
    }

    public function expandAll(){
        $szabadsag = Szabadsag::with('alkalmazottAdat')->get();
        return $szabadsag;
    }
}
