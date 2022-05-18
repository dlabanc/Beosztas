<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Szabadsag extends Model
{
    use HasFactory;
    protected $table = 'szabadsag';
    protected $primaryKey = 'szabadsag_azonosito';
    public $timestamps = false;
    protected $fillable = [
        'szabadsag_azonosito', 'alkalmazott', 'tol', 'ig', 'szabadsagtipus'
    ];

    public function alkalmazottAdat(){
        return $this->hasMany(Alkalmazott::class, 'dolgozoi_azon', 'alkalmazott');
    }
}
