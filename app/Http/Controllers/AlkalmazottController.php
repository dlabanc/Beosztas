<?php

namespace App\Http\Controllers;

use App\Models\Alkalmazott;
use Illuminate\Http\Request;

class AlkalmazottController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $alkalmazottak = Alkalmazott::all();
        return $alkalmazottak;
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
        $alkalmazott=new Alkalmazott();
        $alkalmazott->dolgozoi_azon = $request->dolgozoi_azon;
        $alkalmazott->nev = $request->nev;
        $alkalmazott->munkakor = $request->munkakor;
        $alkalmazott->adoazonosito = $request->adoazonosito;
        $alkalmazott->taj = $request->taj;
        $alkalmazott->elerhetoseg = $request->elerhetoseg;
        $alkalmazott->email = $request->email;
        $alkalmazott->heti_oraszam = $request->heti_oraszam;
        $alkalmazott->lakcim = $request->lakcim;
        $alkalmazott->szuletesi_datum = $request->szuletesi_datum;
        $alkalmazott->munkaviszony_kezdete = $request->munkaviszony_kezdete;
        $alkalmazott->munkaviszony_vege = $request->munkaviszony_vege;

        $alkalmazott->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Alkalmazott  $alkalmazott
     * @return \Illuminate\Http\Response
     */
    public function show($alkalmazottId)
    {
        $alkalmazott = Alkalmazott::find($alkalmazottId);
        return response()->json($alkalmazott);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Alkalmazott  $alkalmazott
     * @return \Illuminate\Http\Response
     */
    public function edit(Alkalmazott $alkalmazott)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Alkalmazott  $alkalmazott
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $alkalmazottId)
    {
        $alkalmazott = Alkalmazott::find($alkalmazottId);
        $alkalmazott->dolgozoi_azon = $request->dolgozoi_azon;
        $alkalmazott->nev = $request->nev;
        $alkalmazott->munkakor = $request->munkakor;
        $alkalmazott->adoazonosito = $request->adoazonosito;
        $alkalmazott->taj = $request->taj;
        $alkalmazott->elerhetoseg = $request->elerhetoseg;
        $alkalmazott->email = $request->email;
        $alkalmazott->heti_oraszam = $request->heti_oraszam;
        $alkalmazott->lakcim = $request->lakcim;
        $alkalmazott->szuletesi_datum = $request->szuletesi_datum;
        $alkalmazott->munkaviszony_kezdete = $request->munkaviszony_kezdete;
        $alkalmazott->munkaviszony_vege = $request->munkaviszony_vege;
        $alkalmazott->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Alkalmazott  $alkalmazott
     * @return \Illuminate\Http\Response
     */
    public function destroy($alkalmazottId)
    {
        $alkalmazott = Alkalmazott::find($alkalmazottId);
        $alkalmazott->delete();
    }

    public function search(Request $request)
    {
        $queryString = $request->query('q');
        $alkalmazottak=Alkalmazott::select('*');

        $columns = \Schema::getColumnListing('alkalmazott');

        foreach ($columns as $column) {
            $alkalmazottak->orWhere(function ($alkalmazottak) use ($column, $queryString){
                $alkalmazottak->orWhere($column,'like', '%' . $queryString . '%');
            });
        }
        return $alkalmazottak->get();
    }

    public function sortBy(Request $request)
    {
        $column = $request->_sort;
        if ($request->has('_order')){
            $order=$request->_order;
            $alkalmazottak=Alkalmazott::orderBy($column, $order)->get();
        }
        else{
            $alkalmazottak=Alkalmazott::orderBy($column, 'asc')->get();
        }
        return response()->json($alkalmazottak);
    }
}
