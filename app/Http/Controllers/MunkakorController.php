<?php

namespace App\Http\Controllers;

use App\Models\Munkakor;
use Illuminate\Http\Request;

class MunkakorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $munkakorok = Munkakor::all();
        return $munkakorok;
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
        $munkakor = new Munkakor;
        $munkakor->megnevezes = $request->megnevezes;
        $munkakor->leiras = $request->leiras;
        $munkakor->munkafonok = $request->munkafonok;
        $munkakor->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Munkakor  $munkakor
     * @return \Illuminate\Http\Response
     */
    public function show($megnevezes)
    {
        $munkakor = Munkakor::find($megnevezes);
        return $munkakor;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Munkakor  $munkakor
     * @return \Illuminate\Http\Response
     */
    public function edit(Munkakor $munkakor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Munkakor  $munkakor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $megnevezes)
    {
        $munkakor = Munkakor::find($megnevezes);
        $munkakor->megnevezes = $request->megnevezes;
        $munkakor->leiras = $request->leiras;
        $munkakor->munkafonok = $request->munkafonok;
        $munkakor->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Munkakor  $munkakor
     * @return \Illuminate\Http\Response
     */
    public function destroy($megnevezes)
    {
        $munkakor = Munkakor::find($megnevezes);
        $munkakor->delete();
    }
}
