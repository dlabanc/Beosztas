<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MuszakEloszlas extends Model
{
    use HasFactory;
    protected $table = 'Muszakeloszlas';
    protected $primaryKey = ['muszaktipus', 'muszakszam'];
    public $incrementing = false;
    public $timestamps = false;
}
