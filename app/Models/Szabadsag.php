<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasCompositePrimaryKey;

class Szabadsag extends Model
{
    use HasFactory;
    use HasCompositePrimaryKey;
    protected $table = 'Szabadsag';
    protected $primaryKey = ['alkalmazott','tol','ig'];
    public $incrementing = false;
    public $timestamps = false;
}
