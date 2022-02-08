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
            $table->tinyIncrements('muszakelo_azon');
            $table->string('muszaktipus',5);
            $table->unsignedTinyInteger('muszakszam');
            $table->unsignedTinyInteger('oratol');
            $table->unsignedTinyInteger('oraig');
            $table->unique(['muszaktipus', 'oratol']);
            $table->index(['muszaktipus', 'oratol']);
            $table->foreign('muszaktipus')->references('tipus')->on('muszaktipus')->onDelete('cascade')->onUpdate('cascade');
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
