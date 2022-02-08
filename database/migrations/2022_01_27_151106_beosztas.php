<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Beosztas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('beosztas', function (Blueprint $table) {
            $table->increments('beo_azonosito');
            $table->unsignedInteger('napim_azonosito');
            $table->unsignedMediumInteger('alkalmazott');
            $table->foreign('napim_azonosito')->references('napim_azonosito')->on('napimunkaeroigeny')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('alkalmazott')->references('dolgozoi_azon')->on('alkalmazott')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('beosztas');
    }
}
