<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Munkakor extends Model
{
    use HasFactory;
    protected $table = 'Munkakor';
    protected $primaryKey = 'munkakor';
    public $incrementing = false;
    public $timestamps = false;
    
    public function alkalmazott(){
        return $this->hasMany(Alkalmazott::class, 'munkakor', 'munkakor');
    }
    
}
