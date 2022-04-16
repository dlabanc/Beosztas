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
            ' CREATE OR REPLACE VIEW `aktualis_poszt`  
            AS 
            SELECT `faliujsag`.`faliu_azonosito` AS `faliu_azonosito`, `faliujsag`.`dolgozoi_azon` AS `dolgozoi_azon`, `faliujsag`.`mikor` AS `mikor`, `faliujsag`.`cim` AS `cim`, `faliujsag`.`tartalom` AS `tartalom` 
            FROM `faliujsag` 
            WHERE `faliujsag`.`mikor` = date(current_timestamp()) ;');
        
        DB::unprepared(
            'CREATE OR REPLACE VIEW `dolgozottstat_nev`  
            AS 
            SELECT `a`.`nev` AS `alkalmazott`, `dolgstat`.`honap` AS `honap`, count(0) AS `dolgozott` 
            FROM ((
                select `b`.`alkalmazott` AS `alkalmazott`,month(`n`.`datum`) AS `honap`,dayofmonth(`n`.`datum`) AS `day(datum)`,count(0) AS `dolgozott` 
                from (`beosztas` `b` join `napimunkaeroigeny` `n` on(`b`.`napim_azonosito` = `n`.`napim_azonosito`)) 
                group by `b`.`alkalmazott`,month(`n`.`datum`),dayofmonth(`n`.`datum`)) `dolgstat` 
                join `alkalmazott` `a` on(`dolgstat`.`alkalmazott` = `a`.`dolgozoi_azon`)) 
            GROUP BY `a`.`nev`, `dolgstat`.`honap` ;'
            );

        DB::unprepared('CREATE OR REPLACE VIEW `munkakordb`  
            AS 
            SELECT `alkalmazott`.`munkakor` AS `munkakor`, count(`alkalmazott`.`munkakor`) AS `db` 
            FROM `alkalmazott` 
            GROUP BY `alkalmazott`.`munkakor` ;');
        
        DB::unprepared('CREATE OR REPLACE VIEW `hetioraszamdb`  
            AS 
            SELECT `alkalmazott`.`heti_oraszam` AS `heti_oraszam`, count(`alkalmazott`.`heti_oraszam`) AS `db` 
            FROM `alkalmazott` 
            GROUP BY `alkalmazott`.`heti_oraszam` ;');
        
        DB::unprepared('CREATE OR REPLACE VIEW `szabadsagstat`  
            AS 
            SELECT `a`.`nev` AS `nev`, `sz`.`tol` AS `tol`, `sz`.`ig` AS `ig` 
            FROM (`szabadsag` `sz` join `alkalmazott` `a` on(`sz`.`alkalmazott` = `a`.`dolgozoi_azon`)) ;');

        DB::unprepared("CREATE OR REPLACE VIEW `szabadsag_kerok`  
            AS 
            SELECT `sz`.`szabadsag_azonosito` AS `szabadsag_azonosito`, `sz`.`alkalmazott` AS `alkalmazott`, `sz`.`tol` AS `tol`, `sz`.`ig` AS `ig`, `sz`.`szabadsagtipus` AS `szabadsagtipus`, `a`.`nev` AS `nev` 
            FROM (`szabadsag` `sz` join `alkalmazott` `a` on(`sz`.`alkalmazott` = `a`.`dolgozoi_azon`)) 
            WHERE `sz`.`szabadsagtipus` = '-' ;");

        DB::unprepared(
            'CREATE OR REPLACE VIEW `dolgozottstat`  
            AS 
            SELECT `dolgstat`.`alkalmazott` AS `alkalmazott`, `dolgstat`.`honap` AS `honap`, count(0) AS `dolgozott` 
            FROM (select `b`.`alkalmazott` AS `alkalmazott`,month(`n`.`datum`) AS `honap`,dayofmonth(`n`.`datum`) AS `day(datum)`,count(0) AS `dolgozott` 
                from (`beosztas` `b` join `napimunkaeroigeny` `n` on(`b`.`napim_azonosito` = `n`.`napim_azonosito`)) 
                group by `b`.`alkalmazott`,month(`n`.`datum`),dayofmonth(`n`.`datum`)) AS `dolgstat` 
            GROUP BY `dolgstat`.`alkalmazott`, `dolgstat`.`honap`;'
            );

        DB::unprepared(
            'CREATE OR REPLACE VIEW `munkafonokok`  
            AS 
            SELECT `m`.`megnevezes` AS `megnevezes`, `a`.`nev` AS `nev`, `m`.`munkafonok` AS `munkafonok` 
            FROM (`munkakor` `m` join `alkalmazott` `a` on(`m`.`munkafonok` = `a`.`dolgozoi_azon`));'
        );

        DB::unprepared(
            'CREATE OR REPLACE VIEW `jovohet`  
            AS 
            SELECT `napok`.`nap` AS `nap`, `napok`.`muszaktipus` AS `muszaktipus`, `napok`.`allapot` AS `allapot` 
            FROM `napok` 
            WHERE `napok`.`nap` between curdate() + interval 7 - weekday(curdate()) day and curdate() + interval weekday(curdate()) + 1 day ;'
            );

        DB::unprepared(
            'CREATE OR REPLACE view `aktualis_het`
            AS
            SELECT * 
            FROM napok 
            WHERE nap BETWEEN date_sub(curdate(), interval weekday(curdate()) day) and date_add(curdate(), interval 6-weekday(curdate()) day);'
            );

        DB::unprepared(
            'CREATE OR REPLACE view `alkalmazhatoak`
            AS
            SELECT *
            FROM alkalmazott a
            WHERE a.dolgozoi_azon NOT IN (
            SELECT a.dolgozoi_azon
            FROM alkalmazott a
            INNER JOIN szabadsag sz ON a.dolgozoi_azon=sz.alkalmazott
            where sz.tol>=date_add(curdate(), interval 7 - weekday(curdate()) day) and sz.ig<=date_add(curdate(), interval weekday(curdate()) + 1 day));'
        );

        DB::unprepared(
            'CREATE OR REPLACE VIEW `jovoheti_napimunkaeroigeny`
            AS
            SELECT * FROM `napimunkaeroigeny`
            WHERE datum>date_add(curdate(), interval 6-weekday(curdate()) day);'
        );

        DB::unprepared(
            'CREATE OR REPLACE PROCEDURE napimunkaeroigeny_torles()
            BEGIN
                delete 
                from napimunkaeroigeny
                where datum<date_sub(curdate(), interval weekday(curdate()) day) and weekday(curdate())=0;
            END
            ');

        DB::unprepared('SET GLOBAL event_scheduler = 1;');

        DB::unprepared(
            'CREATE OR REPLACE EVENT napimunkaeroigeny_heti_torles
            ON SCHEDULE EVERY 1 WEEK
	            STARTS curdate() + interval  7-weekday(curdate()) day
            ON COMPLETION PRESERVE
            DO 
	            CALL napimunkaeroigeny_torles();
        ');
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
        DB::unprepared('DROP VIEW IF EXISTS `jovohet`');
        DB::unprepared('DROP VIEW IF EXISTS `aktualis_het`');
    }
}
