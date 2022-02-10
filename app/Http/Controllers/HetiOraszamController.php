<?php

namespace App\Http\Controllers;

use App\Models\HetiOraszamStat;
use Illuminate\Http\Request;

class HetiOraszamController extends Controller
{
    public function index()
    {
        $hstat=HetiOraszamStat::all();
        return $hstat;
    }
}
