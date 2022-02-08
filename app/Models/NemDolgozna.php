<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NemDolgozna extends Model
{
    use HasFactory;
    protected $table = 'Nem_Dolgozna';
    protected $primaryKey = 'nemdolgozna_azon';
    public $timestamps = false;

    public function muszakeloszlas(){
        return $this->hasMany(MuszakEloszlas::class, 'muszakelo_azon', 'muszakelo_azon');
    }
}