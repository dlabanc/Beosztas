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
            $table->unsignedMediumInteger('alkalmazott');
            $table->date('tol');
            $table->date('ig');
            $table->string('szabadsagtipus',1);
            $table->primary(['alkalmazott','tol','ig']);
            $table->foreign('alkalmazott')->references('dolgozoi_azon')->on('alkalmazott')->onDelete('restrict')->onUpdate('restrict');
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
