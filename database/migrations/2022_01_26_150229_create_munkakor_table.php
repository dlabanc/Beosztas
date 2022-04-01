<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Munkakor;

class CreateMunkakorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('munkakor', function (Blueprint $table) {
            $table->string('megnevezes',50)->primary();
            $table->string('leiras',255);
            $table->unsignedMediumInteger('munkafonok')->nullable();
        });

        Munkakor::create(['megnevezes' => 'Felszolgáló', 'leiras' => 'Az, aki kiviszi a kajákat és a piákat', 'munkafonok' => NULL]);
        Munkakor::create(['megnevezes' => 'Konyhai kisegítő', 'leiras' => 'Ő mos. Csak fancy néven.', 'munkafonok' => NULL]);
        Munkakor::create(['megnevezes' => 'Leszedő', 'leiras' => 'Aki leszedi az asztalt.', 'munkafonok' => NULL]);
        Munkakor::create(['megnevezes' => 'Pultos', 'leiras' => 'Aki piákat csinál', 'munkafonok' => NULL]);
        Munkakor::create(['megnevezes' => 'Sommelier', 'leiras' => 'Fancy névvel, fancy munka. Ő tölti a bort.', 'munkafonok' => NULL]);
        Munkakor::create(['megnevezes' => 'Szakács', 'leiras' => 'Aki kaját csinál', 'munkafonok' => NULL]);
        Munkakor::create(['megnevezes' => 'Szakácssegéd', 'leiras' => 'Aki segít a szakácsnak kaját csinálni', 'munkafonok' => NULL]);
        Munkakor::create(['megnevezes' => 'Takarító', 'leiras' => 'Aki a mocskot tisztává varázsolja', 'munkafonok' => NULL]);
        Munkakor::create(['megnevezes' => 'Üzletvezető', 'leiras' => 'Ő jár a legjobban pénzügyileg', 'munkafonok' => NULL]);
        Munkakor::create(['megnevezes' => 'Adminisztrátor', 'leiras' => 'Ő az admin', 'munkafonok' => NULL]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('munkakor');
    }
}
