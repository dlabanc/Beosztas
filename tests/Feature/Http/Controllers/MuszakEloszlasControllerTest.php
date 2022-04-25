<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Alkalmazott;
use App\Models\BejelentkezesiAdatok;
use App\Models\MuszakEloszlas;
use App\Models\MuszakTipus;

class MuszakEloszlasControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_muszakeloszlasok(){
        $response = $this->get('/api/muszakeloszlasok');
        $response->assertStatus(302);
        $user = Alkalmazott::all()->random()->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get('/api/muszakeloszlasok');
        $response->assertStatus(200);
    }

    public function test_get_muszakeloszlas(){
        $user = Alkalmazott::all()->random()->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $muszakeloszlas = MuszakEloszlas::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->get("/api/muszakeloszlas/{$muszakeloszlas->muszakelo_azon}");
        $response->assertStatus(200);
        $response->assertJsonPath('muszakelo_azon', $muszakeloszlas->muszakelo_azon);
        $response->assertJsonPath('muszaktipus', $muszakeloszlas->muszaktipus);
        $response->assertJsonPath('muszakszam', $muszakeloszlas->muszakszam);
        $response->assertJsonPath('oratol', $muszakeloszlas->oratol);
        $response->assertJsonPath('oraig', $muszakeloszlas->oraig);
    }

    public function test_put_muszakeloszlas(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $muszakeloszlas = MuszakEloszlas::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->put( "/api/muszakeloszlas/{$muszakeloszlas->muszakelo_azon}",[
            'muszakelo_azon' => $muszakeloszlas->muszakelo_azon,
            'muszaktipus' => $muszakeloszlas->muszaktipus,
            'muszakszam' => 10,
            'oratol' => $muszakeloszlas->oratol,
            'oraig' => $muszakeloszlas->oraig
        ]);
        $response->assertStatus(200);
    }

    public function test_post_muszakeloszlas(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $muszaktipus = MuszakTipus::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->post( "/api/muszakeloszlas",[
            'muszaktipus' => $muszaktipus->tipus,
            'muszakszam' => 10,
            'oratol' => 22,
            'oraig' => 24
        ]);
        $response->assertStatus(200);

    }

    public function test_delete_muszakeloszlas(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $muszakeloszlas = MuszakEloszlas::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->delete("/api/muszakeloszlas/{$muszakeloszlas->muszakelo_azon}");
        $response->assertStatus(200);
    }
}
