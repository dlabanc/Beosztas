<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Alkalmazott;
use App\Models\BejelentkezesiAdatok;
use App\Models\Szabadsag;

class SzabadsagControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_szabadsagok(){
        $response = $this->get('/api/szabadsagok');
        $response->assertStatus(302);
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get('/api/szabadsagok');
        $response->assertStatus(200);
    }

    public function test_get_szabadsag(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $szabadsag = Szabadsag::all()->random();
        $this->actingAs($authenticable);
        $response = $this->get("/api/szabadsag/{$szabadsag->szabadsag_azonosito}");
        $response->assertStatus(200);
        $response->assertJsonPath('szabadsag_azonosito', $szabadsag->szabadsag_azonosito);
        $response->assertJsonPath('alkalmazott', $szabadsag->alkalmazott);
        $response->assertJsonPath('tol', $szabadsag->tol);
        $response->assertJsonPath('ig', $szabadsag->ig);
        $response->assertJsonPath('szabadsagtipus', $szabadsag->szabadsagtipus);
    }

    public function test_put_szabadsag(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $szabadsag = Szabadsag::all()->random();
        $this->actingAs($authenticable);
        $response = $this->put( "/api/szabadsag/{$szabadsag->szabadsag_azonosito}",[
            'szabadsag_azonosito' => $szabadsag->szabadsag_azonosito,
            'alkalmazott' => $user->dolgozoi_azon,
            'tol' => '2022-04-22',
            'ig' => '2022-04-26',
            'szabadsagtipus' => $szabadsag->szabadsagtipus
        ]);
        $response->assertStatus(200);
    }

    public function test_post_szabadsag(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->post( "/api/szabadsag",[
            'alkalmazott' => $user->dolgozoi_azon,
            'tol' => '2022-04-22',
            'ig' => '2022-04-26',
            'szabadsagtipus' => 'F'
        ]);
        $response->assertStatus(200);
    }

    public function test_delete_szabadsag(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $szabadsag = Szabadsag::all()->random();
        $this->actingAs($authenticable);
        $response = $this->delete("/api/szabadsag/{$szabadsag->szabadsag_azonosito}");
        $response->assertStatus(200);
    }
}
