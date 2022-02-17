<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Hetioraszamdb extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('CREATE VIEW `hetioraszamdb`  
        AS 
        SELECT `alkalmazott`.`heti_oraszam` AS `heti_oraszam`, count(`alkalmazott`.`heti_oraszam`) AS `db` 
        FROM `alkalmazott` 
        GROUP BY `alkalmazott`.`heti_oraszam` ;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP VIEW IF EXISTS `hetioraszamdb`');
    }
}
