<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DolgozottstatNev extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared(
        'CREATE VIEW `dolgozottstat_nev`  
        AS 
        SELECT `a`.`nev` AS `alkalmazott`, `dolgstat`.`honap` AS `honap`, count(0) AS `dolgozott` 
        FROM ((
            select `b`.`alkalmazott` AS `alkalmazott`,month(`n`.`datum`) AS `honap`,dayofmonth(`n`.`datum`) AS `day(datum)`,count(0) AS `dolgozott` 
            from (`beosztas` `b` join `napimunkaeroigeny` `n` on(`b`.`napim_azonosito` = `n`.`napim_azonosito`)) 
            group by `b`.`alkalmazott`,month(`n`.`datum`),dayofmonth(`n`.`datum`)) `dolgstat` 
            join `alkalmazott` `a` on(`dolgstat`.`alkalmazott` = `a`.`dolgozoi_azon`)) 
        GROUP BY `a`.`nev`, `dolgstat`.`honap` ;'
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP VIEW IF EXISTS `dolgozottstat_nev`');
    }
}
