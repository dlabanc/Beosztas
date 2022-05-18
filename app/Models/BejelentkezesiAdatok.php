<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class BejelentkezesiAdatok extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $table = 'bejelentkezesi_adatok';
    protected $primaryKey = 'user_login';
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = [
        'user_login', 'password', 'email',
    ];
    protected $hidden = ['email'];

    public function alkalmazott(){
        return $this->hasOne(Alkalmazott::class, 'dolgozoi_azon', 'user_login');
    }

    public function hasRole($role){
        return $this->alkalmazott->where('munkakor', $role)->get();
    }
}
