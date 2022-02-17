<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\MuszakEloszlas;

class CreateMuszakEloszlasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('muszakeloszlas', function (Blueprint $table) {
            $table->tinyIncrements('muszakelo_azon');
            $table->string('muszaktipus',5);
            $table->unsignedTinyInteger('muszakszam');
            $table->unsignedTinyInteger('oratol');
            $table->unsignedTinyInteger('oraig');
            $table->unique(['muszaktipus', 'oratol']);
            $table->index(['muszaktipus', 'oratol']);
            $table->foreign('muszaktipus')->references('tipus')->on('muszaktipus')->onDelete('cascade')->onUpdate('cascade');
        });

        MuszakEloszlas::create(['muszakelo_azon' => '1', 'muszaktipus' => 'A', 'muszakszam' => '1', 'oratol' => '6', 'oraig' => '8']);
        MuszakEloszlas::create(['muszakelo_azon' => '2', 'muszaktipus' => 'A', 'muszakszam' => '2', 'oratol' => '8', 'oraig' => '10']);
        MuszakEloszlas::create(['muszakelo_azon' => '3', 'muszaktipus' => 'A', 'muszakszam' => '3', 'oratol' => '10', 'oraig' => '12']);
        MuszakEloszlas::create(['muszakelo_azon' => '4', 'muszaktipus' => 'A', 'muszakszam' => '4', 'oratol' => '12', 'oraig' => '14']);
        MuszakEloszlas::create(['muszakelo_azon' => '5', 'muszaktipus' => 'A', 'muszakszam' => '5', 'oratol' => '14', 'oraig' => '16']);
        MuszakEloszlas::create(['muszakelo_azon' => '6', 'muszaktipus' => 'A', 'muszakszam' => '6', 'oratol' => '16', 'oraig' => '18']);
        MuszakEloszlas::create(['muszakelo_azon' => '7', 'muszaktipus' => 'A', 'muszakszam' => '7', 'oratol' => '18', 'oraig' => '20']);
        MuszakEloszlas::create(['muszakelo_azon' => '8', 'muszaktipus' => 'A', 'muszakszam' => '8', 'oratol' => '20', 'oraig' => '22']);
        MuszakEloszlas::create(['muszakelo_azon' => '9', 'muszaktipus' => 'B', 'muszakszam' => '1', 'oratol' => '8', 'oraig' => '10']);
        MuszakEloszlas::create(['muszakelo_azon' => '10', 'muszaktipus' => 'B', 'muszakszam' => '2', 'oratol' => '10', 'oraig' => '12']);
        MuszakEloszlas::create(['muszakelo_azon' => '11', 'muszaktipus' => 'B', 'muszakszam' => '3', 'oratol' => '12', 'oraig' => '14']);
        MuszakEloszlas::create(['muszakelo_azon' => '12', 'muszaktipus' => 'B', 'muszakszam' => '4', 'oratol' => '14', 'oraig' => '16']);
        MuszakEloszlas::create(['muszakelo_azon' => '13', 'muszaktipus' => 'B', 'muszakszam' => '5', 'oratol' => '16', 'oraig' => '18']);
        MuszakEloszlas::create(['muszakelo_azon' => '14', 'muszaktipus' => 'B', 'muszakszam' => '6', 'oratol' => '18', 'oraig' => '20']);
        MuszakEloszlas::create(['muszakelo_azon' => '15', 'muszaktipus' => 'C', 'muszakszam' => '1', 'oratol' => '6', 'oraig' => '8']);
        MuszakEloszlas::create(['muszakelo_azon' => '16', 'muszaktipus' => 'C', 'muszakszam' => '2', 'oratol' => '8', 'oraig' => '10']);
        MuszakEloszlas::create(['muszakelo_azon' => '17', 'muszaktipus' => 'C', 'muszakszam' => '3', 'oratol' => '10', 'oraig' => '12']);
        MuszakEloszlas::create(['muszakelo_azon' => '18', 'muszaktipus' => 'C', 'muszakszam' => '4', 'oratol' => '12', 'oraig' => '14']);
        MuszakEloszlas::create(['muszakelo_azon' => '19', 'muszaktipus' => 'C', 'muszakszam' => '5', 'oratol' => '14', 'oraig' => '16']);
        MuszakEloszlas::create(['muszakelo_azon' => '21', 'muszaktipus' => 'C', 'muszakszam' => '6', 'oratol' => '16', 'oraig' => '18']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('muszakeloszlas');
    }
}
