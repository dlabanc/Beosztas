<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Napok;

class CreateNapokTable extends Migration
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
            $table->foreign('muszaktipus')->references('tipus')->on('muszaktipus')->onDelete('cascade')->onUpdate('cascade');
        });

        Napok::create(['nap' => '2022.01.10', 'muszaktipus' => 'A', 'allapot' => '1']);
        Napok::create(['nap' => '2022.01.11', 'muszaktipus' => 'A', 'allapot' => '0']);
        Napok::create(['nap' => '2022.01.12', 'muszaktipus' => 'A', 'allapot' => '0']);
        Napok::create(['nap' => '2022.01.13', 'muszaktipus' => 'A', 'allapot' => '0']);
        Napok::create(['nap' => '2022.01.14', 'muszaktipus' => 'A', 'allapot' => '0']);
        Napok::create(['nap' => '2022.01.15', 'muszaktipus' => 'B', 'allapot' => '0']);
        Napok::create(['nap' => '2022.01.16', 'muszaktipus' => 'C', 'allapot' => '0']);
        Napok::create(['nap' => '2022.02.14', 'muszaktipus' => 'A', 'allapot' => '0']);
        Napok::create(['nap' => '2022.02.20', 'muszaktipus' => 'A', 'allapot' => '0']);

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
