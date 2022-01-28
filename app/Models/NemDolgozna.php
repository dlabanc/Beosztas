<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasCompositePrimaryKey;

class NemDolgozna extends Model
{
    use HasFactory;
    use HasCompositePrimaryKey;
    protected $table = 'Nem_Dolgozna';
    protected $primaryKey = ['alkalmazott','datum','muszaktipus','muszakszam'];
    public $incrementing = false;
    public $timestamps = false;
}
