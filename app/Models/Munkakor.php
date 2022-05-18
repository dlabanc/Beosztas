<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Munkakor extends Model
{
    use HasFactory;
    protected $table = 'munkakor';
    protected $primaryKey = 'megnevezes';
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = [
      'megnevezes', 'leiras', 'munkafonok'  
    ];
    
    public function alkalmazott(){
        return $this->hasMany(Alkalmazott::class, 'munkakor', 'munkakor');
    }
    
}
