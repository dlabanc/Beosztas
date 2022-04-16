<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\NemDolgozna;

class CreateNemDolgoznaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nem_dolgozna', function (Blueprint $table) {
            $table->mediumIncrements('nemdolgozna_azon');
            $table->unsignedMediumInteger('alkalmazott');
            $table->date('datum');
            $table->unsignedtinyInteger('muszakelo_azon');
            $table->foreign('alkalmazott')->references('dolgozoi_azon')->on('alkalmazott')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('muszakelo_azon')->references('muszakelo_azon')->on('muszakeloszlas')->onDelete('cascade')->onUpdate('cascade');
        });

        NemDolgozna::create(['nemdolgozna_azon' => '1', 'alkalmazott' => '40035', 'datum' => '2022.01.11', 'muszakelo_azon' => '1']);
        NemDolgozna::create(['nemdolgozna_azon' => '2', 'alkalmazott' => '40035', 'datum' => '2022.01.12', 'muszakelo_azon' => '1']);
        NemDolgozna::create(['nemdolgozna_azon' => '3', 'alkalmazott' => '40036', 'datum' => '2022.01.11', 'muszakelo_azon' => '3']);
        NemDolgozna::create(['nemdolgozna_azon' => '4', 'alkalmazott' => '40001', 'datum' => '2022.01.13', 'muszakelo_azon' => '4']);
        NemDolgozna::create(['nemdolgozna_azon' => '5', 'alkalmazott' => '40006', 'datum' => '2022.01.14', 'muszakelo_azon' => '1']);
        NemDolgozna::create(['nemdolgozna_azon' => '6', 'alkalmazott' => '40006', 'datum' => '2022.01.14', 'muszakelo_azon' => '2']);
        NemDolgozna::create(['nemdolgozna_azon' => '7', 'alkalmazott' => '40006', 'datum' => '2022.01.14', 'muszakelo_azon' => '3']);
        NemDolgozna::create(['nemdolgozna_azon' => '8', 'alkalmazott' => '40006', 'datum' => '2022.01.14', 'muszakelo_azon' => '4']);
        NemDolgozna::create(['nemdolgozna_azon' => '9', 'alkalmazott' => '40006', 'datum' => '2022.01.14', 'muszakelo_azon' => '5']);
        NemDolgozna::create(['nemdolgozna_azon' => '10', 'alkalmazott' => '40016', 'datum' => '2022.01.15', 'muszakelo_azon' => '2']);
        NemDolgozna::create(['nemdolgozna_azon' => '11', 'alkalmazott' => '40025', 'datum' => '2022.01.15', 'muszakelo_azon' => '8']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nem_dolgozna');
    }
}
