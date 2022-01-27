<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Alkalmazott extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alkalmazott', function (Blueprint $table) {
            $table->mediumIncrements('dolgozoi_azon')->from(30000);
            $table->string('nev',255);
            $table->string('munkakor',50);
            $table->foreign('munkakor')->references('megnevezes')->on('munkakor')->onDelete('restrict')->onUpdate('restrict');
            $table->string('adoazonosito',10)->unique();
            $table->string('taj',9)->unique();
            $table->string('elerhetoseg',255)->unique();
            $table->string('email',255)->unique();
            $table->unsignedTinyInteger('heti_oraszam');
            $table->date('szuletesi_datum');
            $table->date('munkaviszony_kezdete');
            $table->date('munkaviszony_vege');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alkalmazott');
    }
}
