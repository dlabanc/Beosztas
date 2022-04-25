<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Alkalmazott;
use App\Models\BejelentkezesiAdatok;
use App\Models\NemDolgozna;
use App\Models\MuszakEloszlas;

class NemDolgoznaControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_nemdolgoznaossz(){
        $response = $this->get('/api/nemdolgoznaossz');
        $response->assertStatus(302);
        $user = Alkalmazott::all()->random()->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get('/api/nemdolgoznaossz');
        $response->assertStatus(200);
    }

    public function test_get_nemdolgozna(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $nemdolgozna = NemDolgozna::all()->random();
        $this->actingAs($authenticable);
        $response = $this->get("/api/nemdolgozna/{$nemdolgozna->nemdolgozna_azon}");
        $response->assertStatus(200);
        $response->assertJsonPath('nemdolgozna_azon', $nemdolgozna->nemdolgozna_azon);
        $response->assertJsonPath('alkalmazott', $nemdolgozna->alkalmazott);
        $response->assertJsonPath('datum', $nemdolgozna->datum);
        $response->assertJsonPath('muszakelo_azon', $nemdolgozna->muszakelo_azon);
    }

    public function test_put_nemdolgozna(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $nemdolgozna = Nemdolgozna::all()->random();
        $this->actingAs($authenticable);
        $response = $this->put( "/api/nemdolgozna/{$nemdolgozna->nemdolgozna_azon}",[
            'nemdolgozna_azon' => $nemdolgozna->nemdolgozna_azon,
            'alkalmazott' => $user->dolgozoi_azon,
            'datum' => '2022-04-22',
            'muszakelo_azon' => $nemdolgozna->muszakelo_azon,
        ]);
        $response->assertStatus(200);
    }

    public function test_post_nemdolgozna(){
        $user = Alkalmazott::all()->random()->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $muszakeloszlas = MuszakEloszlas::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->post( "/api/nemdolgozna",[
            'alkalmazott' => $user->dolgozoi_azon,
            'datum' => '2022-04-25',
            'muszakelo_azon' => $muszakeloszlas->muszakelo_azon,
        ]);
        $response->assertStatus(200);
    }

    public function test_delete_nemdolgozna(){
        $user = Alkalmazott::all()->random()->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $nemdolgozna = Nemdolgozna::all()->random();
        $this->actingAs($authenticable);
        $response = $this->delete("/api/nemdolgozna/{$nemdolgozna->nemdolgozna_azon}");
        $response->assertStatus(200);
    }
}
