<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Szabadsagstat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('CREATE VIEW `szabadsagstat`  
        AS 
        SELECT `a`.`nev` AS `nev`, `sz`.`tol` AS `tol`, `sz`.`ig` AS `ig` 
        FROM (`szabadsag` `sz` join `alkalmazott` `a` on(`sz`.`alkalmazott` = `a`.`dolgozoi_azon`)) ;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP VIEW IF EXISTS szabadsagstat');
    }
}
