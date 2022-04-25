<?php

namespace App\Http\Controllers;

use App\Models\BejelentkezesiAdatok;
use Illuminate\Http\Request;

class BejelentkezesiAdatokController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bejelentkezesiAdatok = BejelentkezesiAdatok::all();
        return $bejelentkezesiAdatok;
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
        $bejelentkezesiAdat = new BejelentkezesiAdatok();
        $bejelentkezesiAdat->user_login = $request->user_login;
        $bejelentkezesiAdat->password = $request->password;
        $bejelentkezesiAdat->email = $request->email;
        
        $bejelentkezesiAdat->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BejelentkezesiAdatok  $bejelentkezesiAdatok
     * @return \Illuminate\Http\Response
     */
    public function show($bejelentkezesiAdatokId)
    {
        $bejelentkezesiAdat = BejelentkezesiAdatok::find($bejelentkezesiAdatokId);
        return $bejelentkezesiAdat;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BejelentkezesiAdatok  $bejelentkezesiAdatok
     * @return \Illuminate\Http\Response
     */
    public function edit(BejelentkezesiAdatok $bejelentkezesiAdatok)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BejelentkezesiAdatok  $bejelentkezesiAdatok
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $bejelentkezesiAdatokId)
    {
        $bejelentkezesiAdat = BejelentkezesiAdatok::find($bejelentkezesiAdatokId);
        $bejelentkezesiAdat->user_login = $request->user_login;
        $bejelentkezesiAdat->password = $request->password;
        $bejelentkezesiAdat->email = $request->email;

        $bejelentkezesiAdat->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BejelentkezesiAdatok  $bejelentkezesiAdatok
     * @return \Illuminate\Http\Response
     */
    public function destroy($bejelentkezesiAdatokId)
    {
        $bejelentkezesiAdat = BejelentkezesiAdatok::find($bejelentkezesiAdatokId);
        $bejelentkezesiAdat->delete();
    }
}
