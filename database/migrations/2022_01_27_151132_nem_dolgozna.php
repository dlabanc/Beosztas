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
            $table->mediumIncrements('nemdolgozna_azon');
            $table->unsignedMediumInteger('alkalmazott');
            $table->date('datum');
            $table->unsignedtinyInteger('muszakelo_azon');
            $table->foreign('alkalmazott')->references('dolgozoi_azon')->on('alkalmazott')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('muszakelo_azon')->references('muszakelo_azon')->on('muszakeloszlas')->onDelete('cascade')->onUpdate('cascade');
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
