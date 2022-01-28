<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasCompositePrimaryKey;

class MuszakEloszlas extends Model
{
    use HasFactory;
    use HasCompositePrimaryKey;
    protected $table = 'Muszakeloszlas';
    protected $primaryKey = ['muszaktipus', 'muszakszam'];
    public $incrementing = false;
    public $timestamps = false;
}
