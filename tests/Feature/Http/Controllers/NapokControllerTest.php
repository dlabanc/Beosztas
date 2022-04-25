<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Alkalmazott;
use App\Models\BejelentkezesiAdatok;
use App\Models\Napok;
use App\Models\MuszakTipus;

class NapokControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_napokossz(){
        $response = $this->get('/api/napokossz');
        $response->assertStatus(302);
        $user = Alkalmazott::all()->random()->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get('/api/napokossz');
        $response->assertStatus(200);
    }

    public function test_get_napok(){
        $user = Alkalmazott::all()->random()->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $napok = Napok::all()->random();
        $this->actingAs($authenticable);
        $response = $this->get("/api/napok/{$napok->nap}");
        $response->assertStatus(200);
        $response->assertJsonPath('nap', $napok->nap);
        $response->assertJsonPath('muszaktipus', $napok->muszaktipus);
        $response->assertJsonPath('allapot', $napok->allapot);
    }

    public function test_put_napok(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $napok = Napok::all()->random();
        if ($napok->allapot==='1') {
            $allapot = 0;
        }
        else{
            $allapot = 1;
        }
        $this->actingAs($authenticable);
        $response = $this->put( "/api/napok/{$napok->nap}",[
            'nap' => $napok->nap,
            'muszaktipus' => $napok->muszaktipus,
            'allapot' => $allapot,
        ]);
        $response->assertStatus(200);
    }

    public function test_post_napok(){
        $user = Alkalmazott::all()->random()->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $muszaktipus = MuszakTipus::all()->random()->first();
        $this->actingAs($authenticable);
        $response = $this->post( "/api/napok",[
            'nap' => '2022-04-24',
            'muszaktipus' => $muszaktipus->tipus,
            'allapot' => 0,
        ]);
        $response->assertStatus(200);
    }

    public function test_delete_napok(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $napok = Napok::all()->random();
        $this->actingAs($authenticable);
        $response = $this->delete("/api/napok/{$napok->nap}");
        $response->assertStatus(200);
    }
}
