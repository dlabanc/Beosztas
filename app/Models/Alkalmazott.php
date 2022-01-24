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
}
