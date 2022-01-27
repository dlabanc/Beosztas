<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Napok extends Model
{
    use HasFactory;
    protected $table = 'Napok';
    protected $primaryKey = 'nap';
    public $incrementing = false;
    public $timestamps = false;
}