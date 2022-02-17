<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Munkakordb extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('CREATE VIEW `munkakordb`  
        AS 
        SELECT `alkalmazott`.`munkakor` AS `munkakor`, count(`alkalmazott`.`munkakor`) AS `db` 
        FROM `alkalmazott` 
        GROUP BY `alkalmazott`.`munkakor` ;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP VIEW IF EXISTS `munkakordb`');
    }
}
