<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alkalmazott extends Model
{
    use HasFactory;
    protected $table = 'Alkalmazott';
    protected $primaryKey = 'dolgozoi_azon';
    protected $keyType = 'int';
    public $timestamps = false;

    public function faliujsag(){
        return $this->hasMany(Faliujsag::class, 'dolgozoi_azon', 'dolgozoi_azon');
    }

    public function bejelentkezes(){
        return $this->hasOne(Bejelentkezes::class, 'user_login', 'dolgozoi_azon');
    }

    public function nemdolgozna(){
        return $this->hasMany(NemDolgozna::class, 'alkalmazott', 'dolgozoi_azon');
    }

    public function szabadsag(){
        return $this->hasMany(Szabadsag::class, 'alkalmazott', 'dolgozoi_azon');
    }

    public function beosztas(){
        return $this->hasMany(Beosztas::class, 'alkalmazott', 'dolgozoi_azon');
    }
}
