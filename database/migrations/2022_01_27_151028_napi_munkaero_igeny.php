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
            $table->increments('napim_azonosito');
            $table->date('datum');
            $table->unsignedtinyInteger('muszakelo_azon');
            $table->string('munkakor',50);
            $table->unsignedTinyInteger('db')->default(0);
            $table->unique(['datum', 'muszakelo_azon', 'munkakor']);
            $table->foreign('datum')->references('nap')->on('napok')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('muszakelo_azon')->references('muszakelo_azon')->on('muszakeloszlas')->onDelete('cascade')->onUpdate('cascade');
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
