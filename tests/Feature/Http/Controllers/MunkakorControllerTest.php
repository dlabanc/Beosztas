<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Alkalmazott;
use App\Models\BejelentkezesiAdatok;
use App\Models\Munkakor;

class MunkakorControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_munkakorok(){
        $response = $this->get('/api/munkakorok');
        $response->assertStatus(302);
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get('/api/munkakorok');
        $response->assertStatus(200);
    }

    public function test_get_munkakor(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $munkakor = Munkakor::all()->random();
        $this->actingAs($authenticable);
        $response = $this->get("/api/munkakor/{$munkakor->megnevezes}");
        $response->assertStatus(200);
        $response->assertJsonPath('megnevezes', $munkakor->megnevezes);
        $response->assertJsonPath('leiras', $munkakor->leiras);
    }

    public function test_put_munkakor(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $munkakor = Munkakor::all()->random();
        $this->actingAs($authenticable);
        $response = $this->put( "/api/munkakor/{$munkakor->megnevezes}",[
            'megnevezes' => $munkakor->megnevezes,
            'leiras' => 'Frissített leírás',
        ]);
        $response->assertStatus(200);
    }

    public function test_post_munkakor(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $munkakor = Munkakor::all()->random();
        $this->actingAs($authenticable);
        $response = $this->post( "/api/munkakor",[
            'megnevezes' => 'Új munkakör',
            'leiras' => 'Új leírás',
        ]);
        $response->assertStatus(200);
    }

    public function test_delete_munkakor(){
        $user = Alkalmazott::all()->random()->where('munkakor','=','Üzletvezető')->orWhere('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $munkakor = Munkakor::all()->random();
        $this->actingAs($authenticable);

        $response = $this->post( "/api/munkakor",[
            'megnevezes' => 'Új munkakör',
            'leiras' => 'Új leírás',
        ]);
        $newmunkakor = Munkakor::select('*')->where('megnevezes', '=', 'Új munkakör')->first();
        $response->assertStatus(200);
        $response = $this->delete("/api/munkakor/{$munkakor->megnevezes}");
        $response->assertStatus(200);
    }
}
