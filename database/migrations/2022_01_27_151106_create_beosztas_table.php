<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Beosztas;

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
            $table->increments('beo_azonosito');
            $table->unsignedInteger('napim_azonosito');
            $table->unsignedMediumInteger('alkalmazott');
            $table->foreign('napim_azonosito')->references('napim_azonosito')->on('napimunkaeroigeny')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('alkalmazott')->references('dolgozoi_azon')->on('alkalmazott')->onDelete('cascade')->onUpdate('cascade');
        });

        Beosztas::create(['beo_azonosito' => '1', 'napim_azonosito' => '6', 'alkalmazott' => '40008']);
        Beosztas::create(['beo_azonosito' => '2', 'napim_azonosito' => '6', 'alkalmazott' => '40009']);
        Beosztas::create(['beo_azonosito' => '3', 'napim_azonosito' => '10', 'alkalmazott' => '40001']);
        Beosztas::create(['beo_azonosito' => '4', 'napim_azonosito' => '10', 'alkalmazott' => '40002']);
        Beosztas::create(['beo_azonosito' => '5', 'napim_azonosito' => '11', 'alkalmazott' => '40016']);
        Beosztas::create(['beo_azonosito' => '6', 'napim_azonosito' => '12', 'alkalmazott' => '40021']);
        Beosztas::create(['beo_azonosito' => '7', 'napim_azonosito' => '12', 'alkalmazott' => '40022']);
        Beosztas::create(['beo_azonosito' => '8', 'napim_azonosito' => '13', 'alkalmazott' => '40006']);
        Beosztas::create(['beo_azonosito' => '9', 'napim_azonosito' => '13', 'alkalmazott' => '40007']);
        Beosztas::create(['beo_azonosito' => '10', 'napim_azonosito' => '15', 'alkalmazott' => '40008']);
        Beosztas::create(['beo_azonosito' => '11', 'napim_azonosito' => '15', 'alkalmazott' => '40009']);
        Beosztas::create(['beo_azonosito' => '12', 'napim_azonosito' => '18', 'alkalmazott' => '40008']);
        Beosztas::create(['beo_azonosito' => '13', 'napim_azonosito' => '20', 'alkalmazott' => '40016']);
        Beosztas::create(['beo_azonosito' => '14', 'napim_azonosito' => '21', 'alkalmazott' => '40021']);
        Beosztas::create(['beo_azonosito' => '15', 'napim_azonosito' => '21', 'alkalmazott' => '40022']);
        Beosztas::create(['beo_azonosito' => '16', 'napim_azonosito' => '22', 'alkalmazott' => '40006']);
        Beosztas::create(['beo_azonosito' => '17', 'napim_azonosito' => '22', 'alkalmazott' => '40007']);
        Beosztas::create(['beo_azonosito' => '18', 'napim_azonosito' => '24', 'alkalmazott' => '40008']);
        Beosztas::create(['beo_azonosito' => '19', 'napim_azonosito' => '24', 'alkalmazott' => '40009']);
        Beosztas::create(['beo_azonosito' => '20', 'napim_azonosito' => '27', 'alkalmazott' => '40008']);
        Beosztas::create(['beo_azonosito' => '21', 'napim_azonosito' => '28', 'alkalmazott' => '40035']);
        Beosztas::create(['beo_azonosito' => '22', 'napim_azonosito' => '28', 'alkalmazott' => '40001']);
        Beosztas::create(['beo_azonosito' => '23', 'napim_azonosito' => '28', 'alkalmazott' => '40002']);
        Beosztas::create(['beo_azonosito' => '24', 'napim_azonosito' => '29', 'alkalmazott' => '40016']);
        Beosztas::create(['beo_azonosito' => '25', 'napim_azonosito' => '29', 'alkalmazott' => '40017']);
        Beosztas::create(['beo_azonosito' => '26', 'napim_azonosito' => '30', 'alkalmazott' => '40021']);
        Beosztas::create(['beo_azonosito' => '27', 'napim_azonosito' => '30', 'alkalmazott' => '40022']);
        Beosztas::create(['beo_azonosito' => '28', 'napim_azonosito' => '30', 'alkalmazott' => '40023']);
        Beosztas::create(['beo_azonosito' => '29', 'napim_azonosito' => '31', 'alkalmazott' => '40005']);
        Beosztas::create(['beo_azonosito' => '30', 'napim_azonosito' => '31', 'alkalmazott' => '40006']);
        Beosztas::create(['beo_azonosito' => '31', 'napim_azonosito' => '31', 'alkalmazott' => '40007']);
        Beosztas::create(['beo_azonosito' => '32', 'napim_azonosito' => '32', 'alkalmazott' => '40020']);
        Beosztas::create(['beo_azonosito' => '33', 'napim_azonosito' => '33', 'alkalmazott' => '40009']);
        Beosztas::create(['beo_azonosito' => '34', 'napim_azonosito' => '36', 'alkalmazott' => '40008']);
        Beosztas::create(['beo_azonosito' => '35', 'napim_azonosito' => '37', 'alkalmazott' => '40001']);
        Beosztas::create(['beo_azonosito' => '36', 'napim_azonosito' => '37', 'alkalmazott' => '40002']);
        Beosztas::create(['beo_azonosito' => '37', 'napim_azonosito' => '38', 'alkalmazott' => '40016']);
        Beosztas::create(['beo_azonosito' => '38', 'napim_azonosito' => '39', 'alkalmazott' => '40022']);
        Beosztas::create(['beo_azonosito' => '39', 'napim_azonosito' => '39', 'alkalmazott' => '40023']);
        Beosztas::create(['beo_azonosito' => '40', 'napim_azonosito' => '40', 'alkalmazott' => '40005']);
        Beosztas::create(['beo_azonosito' => '41', 'napim_azonosito' => '40', 'alkalmazott' => '40006']);
        Beosztas::create(['beo_azonosito' => '42', 'napim_azonosito' => '41', 'alkalmazott' => '40020']);
        Beosztas::create(['beo_azonosito' => '43', 'napim_azonosito' => '43', 'alkalmazott' => '40010']);
        Beosztas::create(['beo_azonosito' => '44', 'napim_azonosito' => '43', 'alkalmazott' => '40011']);
        Beosztas::create(['beo_azonosito' => '45', 'napim_azonosito' => '46', 'alkalmazott' => '40035']);
        Beosztas::create(['beo_azonosito' => '46', 'napim_azonosito' => '46', 'alkalmazott' => '40002']);
        Beosztas::create(['beo_azonosito' => '47', 'napim_azonosito' => '47', 'alkalmazott' => '40017']);
        Beosztas::create(['beo_azonosito' => '48', 'napim_azonosito' => '48', 'alkalmazott' => '40022']);
        Beosztas::create(['beo_azonosito' => '49', 'napim_azonosito' => '48', 'alkalmazott' => '40023']);
        Beosztas::create(['beo_azonosito' => '50', 'napim_azonosito' => '49', 'alkalmazott' => '40005']);
        Beosztas::create(['beo_azonosito' => '51', 'napim_azonosito' => '49', 'alkalmazott' => '40006']);
        Beosztas::create(['beo_azonosito' => '52', 'napim_azonosito' => '50', 'alkalmazott' => '40020']);
        Beosztas::create(['beo_azonosito' => '53', 'napim_azonosito' => '52', 'alkalmazott' => '40010']);
        Beosztas::create(['beo_azonosito' => '54', 'napim_azonosito' => '52', 'alkalmazott' => '40011']);
        Beosztas::create(['beo_azonosito' => '55', 'napim_azonosito' => '55', 'alkalmazott' => '40001']);
        Beosztas::create(['beo_azonosito' => '56', 'napim_azonosito' => '55', 'alkalmazott' => '40002']);
        Beosztas::create(['beo_azonosito' => '57', 'napim_azonosito' => '58', 'alkalmazott' => '40005']);
        Beosztas::create(['beo_azonosito' => '58', 'napim_azonosito' => '58', 'alkalmazott' => '40006']);
        Beosztas::create(['beo_azonosito' => '59', 'napim_azonosito' => '58', 'alkalmazott' => '40007']);
        Beosztas::create(['beo_azonosito' => '60', 'napim_azonosito' => '59', 'alkalmazott' => '40020']);
        Beosztas::create(['beo_azonosito' => '61', 'napim_azonosito' => '61', 'alkalmazott' => '40011']);
        Beosztas::create(['beo_azonosito' => '62', 'napim_azonosito' => '71', 'alkalmazott' => '40008']);
        Beosztas::create(['beo_azonosito' => '63', 'napim_azonosito' => '72', 'alkalmazott' => '40008']);
        Beosztas::create(['beo_azonosito' => '64', 'napim_azonosito' => '73', 'alkalmazott' => '40035']);
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
