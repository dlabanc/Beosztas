<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Napok extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('napok', function (Blueprint $table) {
            $table->date('nap')->primary();
            $table->string('muszaktipus',5);
            $table->boolean('allapot')->default(0);
            $table->foreign('muszaktipus')->references('tipus')->on('muszaktipus');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('napok');
    }
}
