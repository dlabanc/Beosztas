<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Alkalmazott;
use App\Models\BejelentkezesiAdatok;
use App\Models\NapiMunkaeroIgeny;
use App\Models\Munkakor;
use App\Models\MuszakEloszlas;
use App\Models\Napok;

class NapiMunkaeroIgenyControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_napimunkaeroigenyek(){
        $response = $this->get('/api/napimunkaeroigenyek');
        $response->assertStatus(302);
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get('/api/napimunkaeroigenyek');
        $response->assertStatus(200);
    }

    public function test_get_napimunkaeroigeny(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $napimunkaeroigeny = NapiMunkaeroIgeny::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->get("/api/napimunkaeroigeny/{$napimunkaeroigeny->napim_azonosito}");
        $response->assertStatus(200);
        $response->assertJsonPath('napim_azonosito', $napimunkaeroigeny->napim_azonosito);
        $response->assertJsonPath('datum', $napimunkaeroigeny->datum);
        $response->assertJsonPath('muszakelo_azon', $napimunkaeroigeny->muszakelo_azon);
        $response->assertJsonPath('munkakor', $napimunkaeroigeny->munkakor);
    }

    public function test_put_napimunkaeroigeny(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $napimunkaeroigeny = NapiMunkaeroIgeny::all()->random()->first();
        $muszakeloszlas = MuszakEloszlas::all()->random()->first();
        $munkakor = Munkakor::all()->random()->first();
        $nap = Napok::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->put( "/api/napimunkaeroigeny/{$napimunkaeroigeny->napim_azonosito}",[
            'napim_azonosito' => $napimunkaeroigeny->napim_azonosito,
            'datum' => $nap->nap,
            'muszakelo_azon' => $muszakeloszlas->muszakelo_azon,
            'munkakor' => $munkakor->megnevezes,
            'db' => 1,
        ]);
        $response->assertStatus(200);
    }

    public function test_post_napimunkaeroigeny(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $muszakeloszlas = MuszakEloszlas::all()->random()->first();
        $munkakor = Munkakor::all()->random()->first();
        $nap = Napok::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->post( "/api/napimunkaeroigeny",[
            'datum' => $nap->nap,
            'muszakelo_azon' => $muszakeloszlas->muszakelo_azon,
            'munkakor' => $munkakor->megnevezes,
            'db' => 1,
        ]);
        $response->assertStatus(200);

    }

    public function test_delete_napimunkaeroigeny(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $napimunkaeroigeny = NapiMunkaeroIgeny::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->delete("/api/napimunkaeroigeny/{$napimunkaeroigeny->napim_azonosito}");
        $response->assertStatus(200);
    }
}
