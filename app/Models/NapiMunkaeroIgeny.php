<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasCompositePrimaryKey;

class NapiMunkaeroIgeny extends Model
{
    use HasFactory;
    use HasCompositePrimaryKey;
    protected $table = 'Napimunkaeroigeny';
    protected $primaryKey = ['datum', 'muszaktipus', 'muszakszam', 'munkakor'];
    public $incrementing = false;
    public $timestamps = false;
}
