<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Alkalmazott;
use App\Models\BejelentkezesiAdatok;
use App\Models\Beosztas;
use App\Models\NapimunkaeroIgeny;

class BeosztasControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_beosztasok(){
        $response = $this->get('/api/beosztasok');
        $response->assertStatus(302);
        $response->assertRedirect('/');
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->first();
        $response = $this->get('/api/beosztasok');
        $response->assertStatus(302);
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get('/api/beosztasok');
        $response->assertStatus(200);
    }

    public function test_get_beosztas(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $beosztas = Beosztas::all()->random();
        $response = $this->get("/api/beosztas/{$beosztas->beo_azonosito}");
        $response->assertStatus(200);
        $response->assertJsonPath('beo_azonosito', $beosztas->beo_azonosito);
        $response->assertJsonPath('napim_azonosito', $beosztas->napim_azonosito);
        $response->assertJsonPath('alkalmazott', $beosztas->alkalmazott);
    }

    public function test_put_beosztas(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $beosztas = Beosztas::all()->random();
        $napimunkaeroigeny = NapimunkaeroIgeny::all()->random();
        $response = $this->put("/api/beosztas/{$beosztas->beo_azonosito}", [
            'napim_azonosito' => $napimunkaeroigeny->napim_azonosito,
            'alkalmazott' => $user->dolgozoi_azon,
        ]);
        $response->assertStatus(200);
    }

    public function test_post_beosztas(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $napimunkaeroigeny = NapimunkaeroIgeny::all()->random();
        $response = $this->post("/api/beosztas/", [
            'napim_azonosito' => $napimunkaeroigeny->napim_azonosito,
            'alkalmazott' => $user->dolgozoi_azon,
        ]);
        $response->assertStatus(200);
    }

    public function test_delete_beosztas(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $beosztas = Beosztas::all()->random();
        $response = $this->delete("/api/beosztas/{$beosztas->beo_azonosito}");
        $response->assertStatus(200);
    }
    
}
