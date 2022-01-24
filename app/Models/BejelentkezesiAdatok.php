<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BejelentkezesiAdatok extends Model
{
    use HasFactory;
    protected $table = 'Bejelentkezesi_Adatok';
    protected $primaryKey = 'user_login';
    public $timestamps = false;

    public function alkalmazott(){
        return $this->hasOne(Alkalmazott::class, 'dolgozoi_azon', 'user_login');
    }
}
