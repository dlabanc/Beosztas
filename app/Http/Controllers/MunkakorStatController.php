<?php

namespace App\Http\Controllers;

use App\Models\MunkakorStat;
use Illuminate\Http\Request;

class MunkakorStatController extends Controller
{
    public function index()
    {
        $stat=MunkakorStat::all();
        return $stat;
    }
}
