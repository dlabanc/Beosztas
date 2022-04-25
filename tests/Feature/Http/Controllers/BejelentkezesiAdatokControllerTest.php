<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Alkalmazott;
use App\Models\BejelentkezesiAdatok;
use Hash;

class BejelentkezesiAdatokControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_bejelentkezesiadatok(){
        $response = $this->get('/api/bejelentkezesiadatok');
        $response->assertStatus(302);
        $response->assertRedirect('/');
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->first();
        $response = $this->get('/api/bejelentkezesiadatok');
        $response->assertStatus(302);
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get('/api/bejelentkezesiadatok');
        $response->assertStatus(200);
    }

    public function test_get_bejelentkezesiadat(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get("/api/bejelentkezesiadat/{$user->dolgozoi_azon}");
        $response->assertStatus(200);
    }

    public function test_put_bejelentkezesiadat(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $password = Hash::make('qwe123');
        $this->actingAs($authenticable);
        $response = $this->put("/api/bejelentkezesiadat/{$user->dolgozoi_azon}", [
            'user_login' => $user->dolgozoi_azon,
            'password' => $password,
            'email' => $user->email,
        ]);
        $response->assertStatus(200);
    }

    public function test_delete_bejelentkezesiadat(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->delete("/api/bejelentkezesiadat/{$user->dolgozoi_azon}");
        $response->assertStatus(200);
    }
}
