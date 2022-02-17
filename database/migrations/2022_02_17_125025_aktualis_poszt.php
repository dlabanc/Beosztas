<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AktualisPoszt extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared(
        ' CREATE VIEW `aktualis_poszt`  
        AS 
        SELECT `faliujsag`.`faliu_azonosito` AS `faliu_azonosito`, `faliujsag`.`dolgozoi_azon` AS `dolgozoi_azon`, `faliujsag`.`mikor` AS `mikor`, `faliujsag`.`cim` AS `cim`, `faliujsag`.`tartalom` AS `tartalom` 
        FROM `faliujsag` 
        WHERE `faliujsag`.`mikor` = current_timestamp() ;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP VIEW IF EXISTS aktualis_poszt');
    }
}
