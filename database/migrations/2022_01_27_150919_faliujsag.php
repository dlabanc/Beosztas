<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Faliujsag extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faliujsag', function (Blueprint $table) {
            $table->smallIncrements('faliu_azonosito');
            $table->unsignedMediumInteger('dolgozoi_azon');
            $table->date('mikor');
            $table->string('cim',255);
            $table->text('tartalom');
            $table->foreign('dolgozoi_azon')->references('dolgozoi_azon')->on('alkalmazott')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('faliujsag');
    }
}
