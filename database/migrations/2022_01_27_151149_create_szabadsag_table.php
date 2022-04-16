<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Szabadsag;

class CreateSzabadsagTable extends Migration
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

        Szabadsag::create(['szabadsag_azonosito' => '1', 'alkalmazott' => '40035', 'tol' => '2022.09.05', 'ig' => '2022.09.10', 'szabadsagtipus' => 'N']);
        Szabadsag::create(['szabadsag_azonosito' => '2', 'alkalmazott' => '40020', 'tol' => '2022.01.12', 'ig' => '2022.01.14', 'szabadsagtipus' => 'B']);
        Szabadsag::create(['szabadsag_azonosito' => '3', 'alkalmazott' => '40024', 'tol' => '2022.01.13', 'ig' => '2022.01.15', 'szabadsagtipus' => 'N']);
        Szabadsag::create(['szabadsag_azonosito' => '4', 'alkalmazott' => '40025', 'tol' => '2022.01.11', 'ig' => '2022.01.12', 'szabadsagtipus' => 'F']);
        Szabadsag::create(['szabadsag_azonosito' => '5', 'alkalmazott' => '40025', 'tol' => '2022.05.10', 'ig' => '2022.05.25', 'szabadsagtipus' => 'U']);
        Szabadsag::create(['szabadsag_azonosito' => '6', 'alkalmazott' => '40015', 'tol' => '2022.02.20', 'ig' => '2022.02.23', 'szabadsagtipus' => '-']);
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
