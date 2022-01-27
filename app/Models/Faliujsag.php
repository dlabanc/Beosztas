<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faliujsag extends Model
{
    use HasFactory;
    protected $table = 'Faliujsag';
    protected $primaryKey = 'azonosito';
    public $timestamps = false;
}
