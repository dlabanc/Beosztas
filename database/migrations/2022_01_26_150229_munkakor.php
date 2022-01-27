<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Munkakor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('munkakor', function (Blueprint $table) {
            $table->string('megnevezes',50)->primary();
            $table->string('leiras',255);
            $table->unsignedMediumInteger('munkafonok');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('munkakor');
    }
}
