<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SzabadsagKerok extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("CREATE VIEW `szabadsag_kerok`  
        AS 
        SELECT `sz`.`szabadsag_azonosito` AS `szabadsag_azonosito`, `sz`.`alkalmazott` AS `alkalmazott`, `sz`.`tol` AS `tol`, `sz`.`ig` AS `ig`, `sz`.`szabadsagtipus` AS `szabadsagtipus`, `a`.`nev` AS `nev` 
        FROM (`szabadsag` `sz` join `alkalmazott` `a` on(`sz`.`alkalmazott` = `a`.`dolgozoi_azon`)) 
        WHERE `sz`.`szabadsagtipus` = '-' ;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP VIEW IF EXISTS szabadsag_kerok');
    }
}
