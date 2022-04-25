<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Alkalmazott;
use App\Models\Munkakor;
use App\Models\BejelentkezesiAdatok;

class AlkalmazottControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_home()
    {
        $response = $this->get('/');

        $response->assertStatus(302);
        $response->assertRedirect('login');
    }

    public function test_get_alkalmazottak(){
        $response = $this->get('/api/alkalmazottak');
        $response->assertStatus(302);
        $user = Alkalmazott::select('*')->where('munkakor','=','Üzletvezető')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get('/api/alkalmazottak');
        $response->assertStatus(200);
    }

    public function test_get_alkalmazott(){
        $user = Alkalmazott::select('*')->where('munkakor','=','Üzletvezető')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);
        $response = $this->get("/api/alkalmazott/{$user->dolgozoi_azon}");
        $response->assertStatus(200);
        $response->assertJsonPath('dolgozoi_azon', $user->dolgozoi_azon);
        $response->assertJsonPath('nev', $user->nev);
        $response->assertJsonPath('munkakor', $user->munkakor);
        $response->assertJsonPath('adoazonosito', $user->adoazonosito);
        $response->assertJsonPath('taj', $user->taj);
        $response->assertJsonPath('elerhetoseg', $user->elerhetoseg);
        $response->assertJsonPath('email', $user->email);
        $response->assertJsonPath('heti_oraszam', $user->heti_oraszam);
        $response->assertJsonPath('lakcim', $user->lakcim);
        $response->assertJsonPath('munkaviszony_kezdete', $user->munkaviszony_kezdete);
        $response->assertJsonPath('munkaviszony_vege', $user->munkaviszony_vege);
    }

    public function test_put_alkalmazott(){
        $user = Alkalmazott::select('*')->where('munkakor','=','Üzletvezető')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $this->actingAs($authenticable);

        $response = $this->put( "/api/alkalmazott/{$user->dolgozoi_azon}",[
            'dolgozoi_azon' => $user->dolgozoi_azon,
            'nev' => 'Teszt Elek',
            'munkakor' => $user->munkakor,
            'adoazonosito' => $user->adoazonosito,
            'taj' => $user->taj,
            'elerhetoseg' => $user->elerhetoseg,
            'email' => $user->email,
            'heti_oraszam' => $user->heti_oraszam,
            'lakcim' => $user->lakcim,
            'szuletesi_datum' => $user->szuletesi_datum,
            'munkaviszony_kezdete' => $user->munkaviszony_kezdete,
            'munkaviszony_vege' => $user->munkaviszony_vege]);
        $response->assertStatus(200);
        $response = $this->get("/api/alkalmazott/{$user->dolgozoi_azon}");
        $response->assertJsonPath('nev', 'Teszt Elek');
    }

    public function test_post_alkalmazott(){
        $user = Alkalmazott::select('*')->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $munkakor = Munkakor::all()->random();
        $this->actingAs($authenticable);

        $response = $this->post( "/api/alkalmazott",[
            'nev' => 'Teszt Elek',
            'munkakor' => $munkakor->megnevezes,
            'adoazonosito' => '7756636',
            'taj' => '7456456',
            'elerhetoseg' => '012013024',
            'email' => 'tesztelek@chcafe.hu',
            'heti_oraszam' => '30',
            'lakcim' => 'Valaholk valami utca 3',
            'szuletesi_datum' => '1995-05-01',
            'munkaviszony_kezdete' => '2022-01-10',
        ]);
        $response->assertStatus(200);
    }

    public function test_delete_alkalmazott(){
        $user = Alkalmazott::select('*')->where('munkakor','=','Adminisztrátor')->first();
        $authenticable = BejelentkezesiAdatok::find($user->dolgozoi_azon);
        $munkakor = Munkakor::all()->random();
        $this->actingAs($authenticable);

        $response = $this->post( "/api/alkalmazott",[
            'nev' => 'Teszt Elek',
            'munkakor' => $munkakor->megnevezes,
            'adoazonosito' => '7756636',
            'taj' => '7456456',
            'elerhetoseg' => '012013024',
            'email' => 'tesztelek@chcafe.hu',
            'heti_oraszam' => '30',
            'lakcim' => 'Valaholk valami utca 3',
            'szuletesi_datum' => '1995-05-01',
            'munkaviszony_kezdete' => '2022-01-10',
        ]);
        $newuser = Alkalmazott::select('*')->where('nev', '=', 'Teszt Elek')->first();
        $response->assertStatus(200);
        $response = $this->delete("/api/alkalmazott/{$newuser->dolgozoi_azon}");
        $response->assertStatus(200);
    }

}
