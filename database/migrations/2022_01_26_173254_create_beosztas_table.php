<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBeosztasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('beosztas', function (Blueprint $table) {
            $table->date('datum');
            $table->string('muszaktipus',5);
            $table->unsignedTinyInteger('muszakszam');
            $table->string('munkakor',50);
            $table->unsignedMediumInteger('alkalmazott');
            $table->primary(['datum', 'muszaktipus', 'muszakszam', 'munkakor', 'alkalmazott'],'datum_muszaktipus_muszakszam_munkakor_alkalmazott_primary');
            $table->foreign('datum')->references('datum')->on('napimunkaeroigeny')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('muszaktipus')->references('muszaktipus')->on('napimunkaeroigeny')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('muszakszam')->references('muszakszam')->on('napimunkaeroigeny')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('munkakor')->references('munkakor')->on('napimunkaeroigeny')->onDelete('restrict')->onUpdate('restrict');
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
        Schema::dropIfExists('beosztas');
    }
}
