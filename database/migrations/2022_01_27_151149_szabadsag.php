<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Szabadsag extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('szabadsag', function (Blueprint $table) {
            $table->smallIncrements('szabadsag_azonosito');
            $table->unsignedMediumInteger('alkalmazott');
            $table->date('tol');
            $table->date('ig');
            $table->string('szabadsagtipus',1);
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
        Schema::dropIfExists('szabadsag');
    }
}
