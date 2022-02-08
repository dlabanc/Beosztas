<?php

namespace App\Http\Controllers;

use App\Models\MunkakorStat;
use Illuminate\Http\Request;

class MunkakorStatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stat=MunkakorStat::all();
        return $stat;
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MunkakorStat  $munkakorStat
     * @return \Illuminate\Http\Response
     */
    public function show(MunkakorStat $munkakorStat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MunkakorStat  $munkakorStat
     * @return \Illuminate\Http\Response
     */
    public function edit(MunkakorStat $munkakorStat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MunkakorStat  $munkakorStat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MunkakorStat $munkakorStat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MunkakorStat  $munkakorStat
     * @return \Illuminate\Http\Response
     */
    public function destroy(MunkakorStat $munkakorStat)
    {
        //
    }
}
