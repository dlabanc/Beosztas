<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faliujsag extends Model
{
    use HasFactory;
    protected $table = 'faliujsag';
    protected $primaryKey = 'faliu_azonosito';
    public $timestamps = false;
    protected $fillable = [
        'faliu_azonosito', 'dolgozoi_azon', 'mikor', 'cim', 'tartalom'
    ];
}
