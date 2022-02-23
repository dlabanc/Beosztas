<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Createviews extends Migration
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

        DB::unprepared('CREATE VIEW `munkakordb`  
            AS 
            SELECT `alkalmazott`.`munkakor` AS `munkakor`, count(`alkalmazott`.`munkakor`) AS `db` 
            FROM `alkalmazott` 
            GROUP BY `alkalmazott`.`munkakor` ;');
        
        DB::unprepared('CREATE VIEW `hetioraszamdb`  
            AS 
            SELECT `alkalmazott`.`heti_oraszam` AS `heti_oraszam`, count(`alkalmazott`.`heti_oraszam`) AS `db` 
            FROM `alkalmazott` 
            GROUP BY `alkalmazott`.`heti_oraszam` ;');
        
        DB::unprepared('CREATE VIEW `szabadsagstat`  
            AS 
            SELECT `a`.`nev` AS `nev`, `sz`.`tol` AS `tol`, `sz`.`ig` AS `ig` 
            FROM (`szabadsag` `sz` join `alkalmazott` `a` on(`sz`.`alkalmazott` = `a`.`dolgozoi_azon`)) ;');

        DB::unprepared("CREATE VIEW `szabadsag_kerok`  
            AS 
            SELECT `sz`.`szabadsag_azonosito` AS `szabadsag_azonosito`, `sz`.`alkalmazott` AS `alkalmazott`, `sz`.`tol` AS `tol`, `sz`.`ig` AS `ig`, `sz`.`szabadsagtipus` AS `szabadsagtipus`, `a`.`nev` AS `nev` 
            FROM (`szabadsag` `sz` join `alkalmazott` `a` on(`sz`.`alkalmazott` = `a`.`dolgozoi_azon`)) 
            WHERE `sz`.`szabadsagtipus` = '-' ;");

        DB::unprepared(
            'CREATE VIEW `dolgozottstat`  
            AS 
            SELECT `dolgstat`.`alkalmazott` AS `alkalmazott`, `dolgstat`.`honap` AS `honap`, count(0) AS `dolgozott` 
            FROM (select `b`.`alkalmazott` AS `alkalmazott`,month(`n`.`datum`) AS `honap`,dayofmonth(`n`.`datum`) AS `day(datum)`,count(0) AS `dolgozott` 
                from (`beosztas` `b` join `napimunkaeroigeny` `n` on(`b`.`napim_azonosito` = `n`.`napim_azonosito`)) 
                group by `b`.`alkalmazott`,month(`n`.`datum`),dayofmonth(`n`.`datum`)) AS `dolgstat` 
            GROUP BY `dolgstat`.`alkalmazott`, `dolgstat`.`honap`;'
            );

        DB::unprepared(
            'CREATE VIEW `munkafonokok`  
            AS 
            SELECT `m`.`megnevezes` AS `megnevezes`, `a`.`nev` AS `nev`, `m`.`munkafonok` AS `munkafonok` 
            FROM (`munkakor` `m` join `alkalmazott` `a` on(`m`.`munkafonok` = `a`.`dolgozoi_azon`));'
        );
        }
        

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP VIEW IF EXISTS aktualis_poszt');
        DB::unprepared('DROP VIEW IF EXISTS `dolgozottstat_nev`');
        DB::unprepared('DROP VIEW IF EXISTS `munkakordb`');
        DB::unprepared('DROP VIEW IF EXISTS `hetioraszamdb`');
        DB::unprepared('DROP VIEW IF EXISTS szabadsagstat');
        DB::unprepared('DROP VIEW IF EXISTS szabadsag_kerok');
        DB::unprepared('DROP VIEW IF EXISTS `dolgozottstat`');
        DB::unprepared('DROP VIEW IF EXISTS `munkafonokok`');
    }
}
