<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NapiMunkaeroIgeny extends Model
{
    use HasFactory;
    protected $table = 'Napimunkaeroigeny';
    protected $primaryKey = ['datum', 'muszaktipus', 'muszakszam', 'munkakor'];
    public $incrementing = false;
    public $timestamps = false;
}
