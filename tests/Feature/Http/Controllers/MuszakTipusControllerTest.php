<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Alkalmazott;
use App\Models\BejelentkezesiAdatok;
use App\Models\MuszakTipus;

class MuszakTipusControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_muszakeloszlasok(){
        $response = $this->get('/api/muszaktipusok');
        $response->assertStatus(302);
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get('/api/muszaktipusok');
        $response->assertStatus(200);
    }

    public function test_get_muszaktipus(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $muszaktipus = MuszakTipus::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->get("/api/muszaktipus/{$muszaktipus->tipus}");
        $response->assertStatus(200);
        $response->assertJsonPath('tipus', $muszaktipus->tipus);
        $response->assertJsonPath('leiras', $muszaktipus->leiras);
    }

    public function test_put_muszaktipus(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $muszaktipus = MuszakTipus::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->put( "/api/muszaktipus/{$muszaktipus->tipus}",[
            'tipus' => $muszaktipus->tipus,
            'leiras' => 'Frissített leírás',
        ]);
        $response->assertStatus(200);
    }

    public function test_post_muszaktipus(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->post( "/api/muszaktipus",[
            'tipus' => 'Új tp',
            'leiras' => 'Új leírás',
        ]);
        $response->assertStatus(200);

    }

    public function test_delete_muszaktipus(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $muszaktipus = MuszakTipus::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->delete("/api/muszaktipus/{$muszaktipus->tipus}");
        $response->assertStatus(200);
    }
}
