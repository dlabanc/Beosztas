<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Enged extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
        CREATE TRIGGER `enged` BEFORE INSERT ON `muszakeloszlas` FOR EACH ROW begin
            set @oratoldb=(select count(*) from muszakeloszlas where oratol<new.oratol);
            set @oraigdb=(select count(*) from muszakeloszlas where oraig<new.oraig);
            if @oratoldb!=@oraigdb
            THEN
                SIGNAL SQLSTATE '45000' 
                SET MESSAGE_TEXT = 'Nem lehet atfedes';
            end if;
        end");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS enged');
    }
}
