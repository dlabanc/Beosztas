<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MuszakEloszlas extends Model
{
    use HasFactory;
    protected $table = 'muszakeloszlas';
    protected $primaryKey = 'muszakelo_azon';
    public $timestamps = false;
    protected $fillable = [
      'muszakelo_azon', 'muszaktipus', 'muszakszam', 'oratol', 'oraig'  
    ];
}
