<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NapiMunkaeroIgeny extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('napimunkaeroigeny', function (Blueprint $table) {
            $table->date('datum');
            $table->string('muszaktipus',5);
            $table->unsignedTinyInteger('muszakszam');
            $table->string('munkakor',50);
            $table->unsignedTinyInteger('db');
            $table->primary(['datum', 'muszaktipus', 'muszakszam', 'munkakor']);
            $table->foreign('muszaktipus')->references('muszaktipus')->on('muszakeloszlas')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('muszakszam')->references('muszakszam')->on('muszakeloszlas')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('munkakor')->references('megnevezes')->on('munkakor')->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('napimunkaeroigeny');
    }
}
