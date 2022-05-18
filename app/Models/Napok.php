<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Napok extends Model
{
    use HasFactory;
    protected $table = 'napok';
    protected $primaryKey = 'nap';
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = [
        'nap', 'muszaktipus', 'allapot'
    ];
}
