<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NemDolgozna extends Model
{
    use HasFactory;
    protected $table = 'Nem_Dolgozna';
    protected $primaryKey = ['alkalmazott','datum','muszaktipus','muszakszam'];
    public $incrementing = false;
    public $timestamps = false;
}
