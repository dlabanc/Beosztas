<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBejelentkezesiAdatoksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bejelentkezesi_adatok', function (Blueprint $table) {
            $table->mediumIncrements('user_login');
            $table->foreign('user_login')->references('dolgozoi_azon')->on('alkalmazott')->onDelete('restrict')->onUpdate('restrict');
            $table->string('jelszo',60);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bejelentkezesi_adatok');
    }
}
