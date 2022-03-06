<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Trigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
        CREATE TRIGGER `engedInsert` BEFORE INSERT ON `muszakeloszlas` FOR EACH ROW begin
            SET @oratoldb=(select count(*) from muszakeloszlas where oratol<new.oratol);
            SET @oraigdb=(select count(*) from muszakeloszlas where oraig<new.oraig);
            if @oratoldb!=@oraigdb
            THEN
                SIGNAL SQLSTATE '45000' 
                SET MESSAGE_TEXT = 'Nem lehet atfedes';
            END IF;
        END");

        DB::unprepared("
        CREATE TRIGGER `engedUpdate` BEFORE UPDATE ON `muszakeloszlas` FOR EACH ROW begin
            SET @oratoldb=(select count(*) from muszakeloszlas where oratol<new.oratol);
            SET @oraigdb=(select count(*) from muszakeloszlas where oraig<new.oraig);
            if @oratoldb!=@oraigdb
            THEN
                SIGNAL SQLSTATE '45000' 
                SET MESSAGE_TEXT = 'Nem lehet atfedes';
            END IF;
        END");

        DB::unprepared("
        CREATE TRIGGER user_felvet
        AFTER INSERT
        ON alkalmazott FOR EACH ROW
        BEGIN
            INSERT INTO bejelentkezesi_adatok (user_login, password, email)
            VALUES (new.dolgozoi_azon, '$2a$10$17c6c4EhU44GIhakq3agE.CydXWmWeAkntpkNbJtFPVlmI2qguViO
        ', new.email);
        END
        ");

        DB::unprepared("
        CREATE TRIGGER muszakeloszlas_feltolt
        AFTER INSERT
        ON muszaktipus FOR EACH ROW BEGIN
            DECLARE muszakszam int DEFAULT 1;
            DECLARE muszak_ora int DEFAULT 0;
            feltoltes: WHILE muszak_ora <23 DO
                IF MOD(muszak_ora,2)=0 THEN
                    INSERT INTO muszakeloszlas (muszaktipus, muszakszam, oratol, oraig)
                            VALUES (new.tipus, muszakszam, muszak_ora, muszak_ora+2);
                    SET muszakszam = muszakszam+1;
                END IF;       
            SET muszak_ora = muszak_ora+1;
            END WHILE;
        END
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS engedInsert');
        DB::unprepared('DROP TRIGGER IF EXISTS engedUpdate');
        DB::unprepared('DROP TRIGGER IF EXISTS user_felvet');
        DB::unprepared('DROP TRIGGER IF EXISTS muszakeloszlas_feltolt');
    }
}
