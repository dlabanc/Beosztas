<?php

namespace App\Http\Controllers;

use App\Models\DolgozottNapokStat;
use Illuminate\Http\Request;

class DolgozottNapokStatController extends Controller
{
    public function index()
    {
        $stat = DolgozottNapokStat::all();
        return $stat;
    }

}
