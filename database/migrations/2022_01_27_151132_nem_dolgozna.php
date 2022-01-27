<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NemDolgozna extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nem_dolgozna', function (Blueprint $table) {
            $table->unsignedMediumInteger('alkalmazott');
            $table->date('datum');
            $table->string('muszaktipus',5);
            $table->unsignedTinyInteger('muszakszam');
            $table->primary(['alkalmazott','datum','muszaktipus','muszakszam']);
            $table->foreign('alkalmazott')->references('dolgozoi_azon')->on('alkalmazott')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('muszaktipus')->references('muszaktipus')->on('muszakeloszlas')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('muszakszam')->references('muszakszam')->on('muszakeloszlas')->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nem_dolgozna');
    }
}
