<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\MuszakTipus;

class CreateMuszaktipusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('muszaktipus', function (Blueprint $table) {
            $table->string('tipus',5)->primary();
            $table->string('leiras',255);
        });

        MuszakTipus::create(['tipus' => 'A', 'leiras' => 'Hétköznapi, normál munkarend']);
        MuszakTipus::create(['tipus' => 'B', 'leiras' => 'Hétvégi munkarend']);
        MuszakTipus::create(['tipus' => 'C', 'leiras' => 'Rendkívüli munkarend']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('muszaktipus');
    }
}
