<?php

namespace App\Http\Controllers;

use App\Models\Napok;
use Illuminate\Http\Request;

class NapokController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $napok = Napok::all();
        return $napok;
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
        $nap = new Napok();
        $nap->nap = $request->nap;
        $nap->muszaktipus = $request->muszaktipus;
        $nap->allapot = $request->allapot;
        $nap->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Napok  $napok
     * @return \Illuminate\Http\Response
     */
    public function show($napId)
    {
        $nap = Napok::find($napId);
        return $nap;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Napok  $napok
     * @return \Illuminate\Http\Response
     */
    public function edit(Napok $napok)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Napok  $napok
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $napId)
    {
        $nap = Napok::find($napId);   
        $nap->nap = $request->nap;
        $nap->muszaktipus = $request->muszaktipus;
        $nap->allapot = $request->allapot;
        $nap->save();     
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Napok  $napok
     * @return \Illuminate\Http\Response
     */
    public function destroy($napId)
    {
        $nap = Napok::find($napId);
        $nap->delete();
    }
}
