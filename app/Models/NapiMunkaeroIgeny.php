<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NapiMunkaeroIgeny extends Model
{
    use HasFactory;
    protected $table = 'Napimunkaeroigeny';
    protected $primaryKey = 'napim_azonosito';
    public $timestamps = false;

    public function muszakeloszlas(){
        return $this->hasMany(MuszakEloszlas::class, 'muszakelo_azon', 'muszakelo_azon');
    }
}
