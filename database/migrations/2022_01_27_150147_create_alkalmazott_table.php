<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Alkalmazott;

class CreateAlkalmazottTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alkalmazott', function (Blueprint $table) {
            $table->mediumIncrements('dolgozoi_azon')->from(30000);
            $table->string('nev',255);
            $table->string('lakcim',255);
            $table->date('szuletesi_datum');            
            $table->string('adoazonosito',10)->unique();
            $table->string('taj',9)->unique();
            $table->string('elerhetoseg',255)->unique();
            $table->string('email',255)->unique();
            $table->string('munkakor',50);
            $table->unsignedTinyInteger('heti_oraszam');
            $table->date('munkaviszony_kezdete');
            $table->date('munkaviszony_vege')->nullable();
            $table->foreign('munkakor')->references('megnevezes')->on('munkakor')->onDelete('restrict')->onUpdate('restrict');
        });

        Alkalmazott::create(['dolgozoi_azon' => '40001', 'nev' => 'Hosszú Iván', 'lakcim' => '1045 Budapest, Elit u. 12', 'szuletesi_datum' => '1988.11.20', 'adoazonosito' => '2345678912', 'taj' => '23456789', 'elerhetoseg' => '06703333333', 'email' => 'hosszuivan@chilloutcafe.hu', 'munkakor' => 'Felszolgáló', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => '2022.01.01']);
        Alkalmazott::create(['dolgozoi_azon' => '40002', 'nev' => 'Rövid Peti', 'lakcim' => '1123 Budapest, Fiaskó u. 144', 'szuletesi_datum' => '1977.12.01', 'adoazonosito' => '3456789123', 'taj' => '34567891', 'elerhetoseg' => '06704444444', 'email' => 'rovidpeti@chilloutcafe.hu', 'munkakor' => 'Felszolgáló', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.08.05', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40003', 'nev' => 'Aranyos Aranka', 'lakcim' => '1211 Budapest, Lakóház u. 6', 'szuletesi_datum' => '1956.01.01', 'adoazonosito' => '4567891234', 'taj' => '45678912', 'elerhetoseg' => '06705555555', 'email' => 'aranyosaranka@chilloutcafe.hu', 'munkakor' => 'Felszolgáló', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40004', 'nev' => 'Eszes Dani', 'lakcim' => '1055 Budapest, Infravörös u. 4', 'szuletesi_datum' => '1997.04.19', 'adoazonosito' => '5678912345', 'taj' => '56789123', 'elerhetoseg' => '06706666666', 'email' => 'eszesdani@chilloutcafe.hu', 'munkakor' => 'Pultos', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40005', 'nev' => 'Iszákos Imre', 'lakcim' => '1012 Budapest Etele út 3', 'szuletesi_datum' => '1995.08.19', 'adoazonosito' => '6789123456', 'taj' => '67891234', 'elerhetoseg' => '06704891264', 'email' => 'iszakosimre@chilloutcafe.hu', 'munkakor' => 'Pultos', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.08.05', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40006', 'nev' => 'Kenyér Ádám', 'lakcim' => '1023 Budapest Felso u. 9"', 'szuletesi_datum' => '1991.07.21', 'adoazonosito' => '7891234567', 'taj' => '78912345', 'elerhetoseg' => '06704112561', 'email' => 'kenyeradam@chilloutcafe.hu', 'munkakor' => 'Pultos', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.12.01', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40007', 'nev' => 'Csóró Lali', 'lakcim' => '1034 Budapest Izé u. 12', 'szuletesi_datum' => '1988.06.20', 'adoazonosito' => '8912345678', 'taj' => '89123456', 'elerhetoseg' => '06704123523', 'email' => 'csorolali@chilloutcafe.hu', 'munkakor' => 'Pultos', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40008', 'nev' => 'Főzős Robi', 'lakcim' => '1066 Budapest Nándor u. 54', 'szuletesi_datum' => '1975.05.23', 'adoazonosito' => '9123456789', 'taj' => '91234567', 'elerhetoseg' => '06303251521', 'email' => 'fozosrobi@chilloutcafe.hu', 'munkakor' => 'Szakács', 'heti_oraszam' => '30', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40009', 'nev' => 'Illatos Béla', 'lakcim' => '1091 Budapest Rottenbiller u. 33', 'szuletesi_datum' => '1968.04.27', 'adoazonosito' => '1123456789', 'taj' => '23466789', 'elerhetoseg' => '06308237956', 'email' => 'illatosbela@chilloutcafe.hu', 'munkakor' => 'Szakács', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.12.01', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40010', 'nev' => 'Kukta Kata', 'lakcim' => '1110 Budapest Gazdagréti u. 99', 'szuletesi_datum' => '1959.03.30', 'adoazonosito' => '2123456789', 'taj' => '34567892', 'elerhetoseg' => '06309271251', 'email' => 'kuktakata@chilloutcafe.hu', 'munkakor' => 'Szakácssegéd', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40011', 'nev' => 'Marha Móni', 'lakcim' => '1192 Budapest Felsocsolti u. 8"', 'szuletesi_datum' => '1997.02.02', 'adoazonosito' => '3123456789', 'taj' => '45678923', 'elerhetoseg' => '06301725842', 'email' => 'marhamoni@chilloutcafe.hu', 'munkakor' => 'Szakácssegéd', 'heti_oraszam' => '30', 'munkaviszony_kezdete' => '2021.12.01', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40012', 'nev' => 'Felmosó Fanni', 'lakcim' => '1141 Budapest Nyu;dt u. 58', 'szuletesi_datum' => '1991.01.05', 'adoazonosito' => '4123456789', 'taj' => '56789234', 'elerhetoseg' => '06207152482', 'email' => 'felmosofanni@chilloutcafe.hu', 'munkakor' => 'Takarító', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => '2022.01.29']);
        Alkalmazott::create(['dolgozoi_azon' => '40013', 'nev' => 'Vödör Vilmos', 'lakcim' => '1234 Budapest Kerület u. 91', 'szuletesi_datum' => '1995.12.10', 'adoazonosito' => '5123456789', 'taj' => '67892345', 'elerhetoseg' => '06207816345', 'email' => 'vodorvilmos@chilloutcafe.hu', 'munkakor' => 'Takarító', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.12.01', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40014', 'nev' => 'Rongy Rudi', 'lakcim' => '1074 Budapest Mindenki utcája 69', 'szuletesi_datum' => '1987.11.19', 'adoazonosito' => '6123456789', 'taj' => '78923456', 'elerhetoseg' => '06208916251', 'email' => 'rongyrudi@chilloutcafe.hu', 'munkakor' => 'Takarító', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40015', 'nev' => 'Gazdag Gábor', 'lakcim' => '1062 Budapest Van u. 2', 'szuletesi_datum' => '1982.10.13', 'adoazonosito' => '7123456789', 'taj' => '89234567', 'elerhetoseg' => '06708912645', 'email' => 'gazdaggabor@chilloutcafe.hu', 'munkakor' => 'Üzletvezető', 'heti_oraszam' => '0', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40016', 'nev' => 'Domestos Domi', 'lakcim' => '1183 Budapest Hogyvagy u. 72', 'szuletesi_datum' => '1969.08.13', 'adoazonosito' => '8123456789', 'taj' => '92345567', 'elerhetoseg' => '06301782594', 'email' => 'domestosdomi@chilloutcafe.hu', 'munkakor' => 'Konyhai kisegítő', 'heti_oraszam' => '30', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40017', 'nev' => 'Tiszta Terike', 'lakcim' => '1191 Budapest Kinti utca 23', 'szuletesi_datum' => '1954.01.20', 'adoazonosito' => '9876543210', 'taj' => '24135622', 'elerhetoseg' => '06704127842', 'email' => 'tisztaterike@chilloutcafe.hu', 'munkakor' => 'Konyhai kisegítő', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.12.01', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40018', 'nev' => 'Tányéros Tóbiás', 'lakcim' => '1045 Budapest Koós L. u. 5', 'szuletesi_datum' => '1996.12.19', 'adoazonosito' => '8765432109', 'taj' => '43621673', 'elerhetoseg' => '06301789264', 'email' => 'tanyerostobias@chilloutcafe.hu', 'munkakor' => 'Konyhai kisegítő', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.08.05', 'munkaviszony_vege' => '2021.09.05']);
        Alkalmazott::create(['dolgozoi_azon' => '40019', 'nev' => 'Boros Barnabás', 'lakcim' => '1035 Budapest Elfelejtettem u. 61', 'szuletesi_datum' => '2000.07.16', 'adoazonosito' => '7654321098', 'taj' => '23407247', 'elerhetoseg' => '06208916241', 'email' => 'borosbarnabas@chilloutcafe.hu', 'munkakor' => 'Sommelier', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40020', 'nev' => 'Öntő Ödön', 'lakcim' => '1021 Budapest Pénzes u. 5', 'szuletesi_datum' => '1988.05.10', 'adoazonosito' => '6543210987', 'taj' => '32678334', 'elerhetoseg' => '06209183651', 'email' => 'ontoodon@chilloutcafe.hu', 'munkakor' => 'Sommelier', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.12.01', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40021', 'nev' => 'Poharas Patrik', 'lakcim' => '1011 Budapest Ott u. 9', 'szuletesi_datum' => '1992.07.24', 'adoazonosito' => '5432109876', 'taj' => '12467340', 'elerhetoseg' => '06708913561', 'email' => 'poharaspatrik@chilloutcafe.hu', 'munkakor' => 'Leszedő', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40022', 'nev' => 'Szeddle Szabolcs', 'lakcim' => '1185 Budapest Laca u. 67', 'szuletesi_datum' => '1994.08.05', 'adoazonosito' => '4321098765', 'taj' => '12460754', 'elerhetoseg' => '06308326512', 'email' => 'szeddleszabolcs@chilloutcafe.hu', 'munkakor' => 'Leszedő', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.12.01', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40023', 'nev' => 'Elteszemaborravalót Edvárd', 'lakcim' => '1062 Budapest Nincs u. 2', 'szuletesi_datum' => '1987.09.30', 'adoazonosito' => '3210987654', 'taj' => '12470135', 'elerhetoseg' => '06308916242', 'email' => 'elteszemaborravalotedvard@chilloutcafe.hu', 'munkakor' => 'Leszedő', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.03.15', 'munkaviszony_vege' => '2022.01.01']);
        Alkalmazott::create(['dolgozoi_azon' => '40024', 'nev' => 'Lassú Lehel', 'lakcim' => '1065 Budapest Nógrád u. 2', 'szuletesi_datum' => '1981.01.23', 'adoazonosito' => '2109876543', 'taj' => '73470132', 'elerhetoseg' => '06307815242', 'email' => 'lassulehel@chilloutcafe.hu', 'munkakor' => 'Leszedő', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.08.05', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40025', 'nev' => 'Gyors Gyula', 'lakcim' => '1023 Budapest Hiszti u. 2', 'szuletesi_datum' => '1996.05.27', 'adoazonosito' => '1098765432', 'taj' => '21879130', 'elerhetoseg' => '06307128451', 'email' => 'gyorsgyula@chilloutcafe.hu', 'munkakor' => 'Leszedő', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.08.05', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40027', 'nev' => 'Főzős Fanni', 'lakcim' => '1044 Budapest Szakács u. 5', 'szuletesi_datum' => '1995.03.24', 'adoazonosito' => '2114543634', 'taj' => '32141254', 'elerhetoseg' => '06301231233', 'email' => 'fozosfanni@chilloutcafe.hu', 'munkakor' => 'Szakács', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.01.05', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40028', 'nev' => 'Segítő Sándor', 'lakcim' => '1045 Budapest Segéd u. 93', 'szuletesi_datum' => '2003.04.12', 'adoazonosito' => '4324252345', 'taj' => '64563455', 'elerhetoseg' => '06204324768', 'email' => 'segitosandor@chilloutcafe.hu', 'munkakor' => 'Szakácssegéd', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.01.10', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40029', 'nev' => 'Kedves Klára', 'lakcim' => '1132 Budapest Kedves u. 32', 'szuletesi_datum' => '1999.07.22', 'adoazonosito' => '9423496235', 'taj' => '69876201', 'elerhetoseg' => '06705649538', 'email' => 'kedvesklara@chilloutcafe.hu', 'munkakor' => 'Felszolgáló', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.01.04', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40030', 'nev' => 'Pakoló Pál', 'lakcim' => '1065 Budappest Pakoló u. 12', 'szuletesi_datum' => '2001.09.18', 'adoazonosito' => '6547845251', 'taj' => '98747352', 'elerhetoseg' => '06309745789', 'email' => 'pakolopal@chilloutcafe.hu', 'munkakor' => 'Pultos', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.01.13', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40032', 'nev' => 'Hízelgő Herold', 'lakcim' => '1111 Budpest Hízeleg u. 25', 'szuletesi_datum' => '1998.05.23', 'adoazonosito' => '5269468469', 'taj' => '86936293', 'elerhetoseg' => '06302896523', 'email' => 'hizelgoherold@chilloutcafe.hu', 'munkakor' => 'Leszedő', 'heti_oraszam' => '20', 'munkaviszony_kezdete' => '2021.01.20', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40033', 'nev' => 'Fontos Feri', 'lakcim' => '1111 Budpest Fontos u. 25', 'szuletesi_datum' => '1993.06.23', 'adoazonosito' => '5269468412', 'taj' => '86936234', 'elerhetoseg' => '06302896543', 'email' => 'fontosferi@chilloutcafe.hu', 'munkakor' => 'Üzletvezető', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2020.05.10', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40034', 'nev' => 'Admin András', 'lakcim' => '1111 Budpest Admin u. 25', 'szuletesi_datum' => '1992.10.12', 'adoazonosito' => '5269468231', 'taj' => '86936287', 'elerhetoseg' => '06302896587', 'email' => 'adminandras@chilloutcafe.hu', 'munkakor' => 'Adminisztrátor', 'heti_oraszam' => '30', 'munkaviszony_kezdete' => '2021.01.10', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40035', 'nev' => 'Kis Pista', 'lakcim' => '1089 Budapest, Német u. 3', 'szuletesi_datum' => '1996.03.06', 'adoazonosito' => '123456789', 'taj' => '1234567', 'elerhetoseg' => '06701111111', 'email' => 'kispista@chilloutcafe.hu', 'munkakor' => 'Felszolgáló', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.12.01', 'munkaviszony_vege' => NULL]);
        Alkalmazott::create(['dolgozoi_azon' => '40036', 'nev' => 'Nagy Mari', 'lakcim' => '1011 Budapest, Alfa u. 1', 'szuletesi_datum' => '1967.01.14', 'adoazonosito' => '1234567891', 'taj' => '12345678', 'elerhetoseg' => '06702222222', 'email' => 'nagymari@chilloutcafe.hu', 'munkakor' => 'Felszolgáló', 'heti_oraszam' => '40', 'munkaviszony_kezdete' => '2021.08.05', 'munkaviszony_vege' => NULL]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alkalmazott');
    }
}
