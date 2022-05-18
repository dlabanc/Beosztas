<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beosztas extends Model
{
    use HasFactory;
    protected $table = 'beosztas';
    protected $primaryKey = 'beo_azonosito';
    protected $keyType = 'int';
    public $timestamps = false;
    protected $fillable = [
        'beo_azonosito', 'napim_azonosito', 'alkalmazott'
    ];

    public function napimunkaeroigeny(){
        return $this->hasMany(NapiMunkaeroIgeny::class, 'napim_azonosito', 'napim_azonosito');
    }

    public function alkalmazottAdat(){
        return $this->hasMany(Alkalmazott::class, 'dolgozoi_azon', 'alkalmazott');
    }
}
