<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MuszakEloszlas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('muszakeloszlas', function (Blueprint $table) {
            $table->string('muszaktipus',5);
            $table->unsignedTinyInteger('muszakszam');
            $table->unsignedTinyInteger('oratol');
            $table->unsignedTinyInteger('oraig');
            $table->primary(['muszaktipus', 'muszakszam']);
            $table->foreign('muszaktipus')->references('tipus')->on('muszaktipus')->onDelete('restrict')->onUpdate('restrict');
        });
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
