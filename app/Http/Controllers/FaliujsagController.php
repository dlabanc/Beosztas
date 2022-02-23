<?php

namespace App\Http\Controllers;

use App\Models\Faliujsag;
use Illuminate\Http\Request;

class FaliujsagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $faliujsagok = Faliujsag::all();
        return $faliujsagok;
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
        $faliujsag = new Faliujsag();
        $faliujsag->dolgozoi_azon = $request->dolgozoi_azon;
        $faliujsag->mikor = $request->mikor;
        $faliujsag->cim = $request->cim;
        $faliujsag->tartalom = $request->tartalom;
        $faliujsag->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Faliujsag  $faliujsag
     * @return \Illuminate\Http\Response
     */
    public function show($faliujsagId)
    {
        $faliujsag = Faliujsag::find($faliujsagId);
        return $faliujsag;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Faliujsag  $faliujsag
     * @return \Illuminate\Http\Response
     */
    public function edit(Faliujsag $faliujsag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Faliujsag  $faliujsag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $faliujsagId)
    {
        $faliujsag = Faliujsag::find($faliujsagId);
        $faliujsag->dolgozoi_azon = $request->dolgozoi_azon;
        $faliujsag->mikor = $request->mikor;
        $faliujsag->cim = $request->cim;
        $faliujsag->tartalom = $request->tartalom;
        $faliujsag->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Faliujsag  $faliujsag
     * @return \Illuminate\Http\Response
     */
    public function destroy($faliujsagId)
    {
        $faliujsag = Faliujsag::find($faliujsagId);
        $faliujsag->delete();
    }

    public function search(Request $request)
    {
        $queryString = $request->query();
        foreach ($queryString as $key => $value) {
            $explodedKey=explode('_',$key);
            $column=$explodedKey[0];
            $expression=$explodedKey[1];
            $tasks=Faliujsag::where($column, $expression, '%' . $value . '%')->get();
        }
        return $tasks;
    }
}
