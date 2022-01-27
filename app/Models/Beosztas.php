<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beosztas extends Model
{
    use HasFactory;
    protected $table = 'Beosztas';
    protected $primaryKey = ['datum', 'muszaktipus', 'muszakszam', 'munkakor', 'alkalmazott'];
    public $incrementing = false;
    public $timestamps = false;
}
