<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NapimFeltolt extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
        CREATE TRIGGER `napim_feltolt` AFTER INSERT ON `napok` FOR EACH ROW INSERT into napimunkaeroigeny (datum, muszakelo_azon, munkakor)
            select new.nap, muszakeloszlas.muszakelo_azon, munkakor.megnevezes
            from muszakeloszlas, munkakor
            where new.muszaktipus=muszakeloszlas.muszaktipus");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("DROP TRIGGER IF EXISTS napim_feltolt");
    }
}
