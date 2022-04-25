<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Alkalmazott;
use App\Models\BejelentkezesiAdatok;
use App\Models\Faliujsag;

class FaliujsagControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_faliujsagok(){
        $response = $this->get('/api/faliujsagok');
        $response->assertStatus(302);
        $response->assertRedirect('login');
        $user = Alkalmazott::all()->random()->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get('/api/faliujsagok');
        $response->assertStatus(200);
    }

    public function test_get_faliujsag(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->orWhere('munkakor','=','Üzletvezető')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $faliujsag = Faliujsag::all()->random()->first();
        $response = $this->get("/api/faliujsag/{$faliujsag->faliu_azonosito}");
        $response->assertStatus(200);
        $response->assertJsonPath('dolgozoi_azon', $faliujsag->dolgozoi_azon);
        $response->assertJsonPath('mikor', $faliujsag->mikor);
        $response->assertJsonPath('cim', $faliujsag->cim);
        $response->assertJsonPath('tartalom', $faliujsag->tartalom);
    }

    public function test_put_faliujsag(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->orWhere('munkakor','=','Üzletvezető')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $faliujsag = Faliujsag::all()->random()->first();
        $response = $this->get("/api/faliujsag/{$faliujsag->faliu_azonosito}", [
            'dolgozoi_azon' => $faliujsag->dolgozoi_azon,
            'mikor' => $faliujsag->mikor,
            'cim' => 'Új cím',
            'tartalom' => $faliujsag->tartalom,
        ]);
        $response->assertStatus(200);
    }

    public function test_post_faliujsag(){
        $user = Alkalmazott::all()->random()->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $faliujsag = Faliujsag::all()->random()->first();
        $response = $this->post("/api/faliujsag/", [
            'dolgozoi_azon' => $user->dolgozoi_azon,
            'mikor' => '2022-04-17',
            'cim' => 'Friss cím',
            'tartalom' => 'Friss tartalom',
        ]);
        $response->assertStatus(200);
    }

    public function test_delete_faliujsag(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $faliujsag = Faliujsag::all()->random()->first();
        $response = $this->delete("/api/faliujsag/{$faliujsag->faliu_azonosito}");
        $response->assertStatus(200);
    }
}
