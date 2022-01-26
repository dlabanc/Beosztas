<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MuszakTipus extends Model
{
    use HasFactory;
    protected $table = 'Muszaktipus';
    protected $primaryKey = 'tipus';
    public $incrementing = false;
    public $timestamps = false;
}
