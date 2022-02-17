<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Faliujsag;

class CreateFaliujsagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faliujsag', function (Blueprint $table) {
            $table->smallIncrements('faliu_azonosito');
            $table->unsignedMediumInteger('dolgozoi_azon');
            $table->date('mikor');
            $table->string('cim',255);
            $table->text('tartalom');
            $table->foreign('dolgozoi_azon')->references('dolgozoi_azon')->on('alkalmazott')->onDelete('cascade')->onUpdate('cascade');
        });

        Faliujsag::create(['faliu_azonosito' => '1', 'dolgozoi_azon' => '40015', 'mikor' => '2022.01.05', 'cim' => 'Első munkanap', 'tartalom' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sapien odio, dapibus at mi et, sodales laoreet risus. In eu luctus felis. Cras commodo aliquet consequat. Fusce orci est, vulputate vitae laoreet vel, facilisis ut lectus. In euismod tellus at elementum porttitor. Aliquam dictum diam arcu, id dictum purus hendrerit eget.']);
        Faliujsag::create(['faliu_azonosito' => '2', 'dolgozoi_azon' => '40015', 'mikor' => '2022.01.07', 'cim' => 'Segítség a rászorulóknak', 'tartalom' => 'Ut lacinia auctor efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla placerat viverra mauris. Suspendisse ligula nibh, faucibus ac euismod vitae, faucibus quis enim. Suspendisse consequat fermentum orci, nec egestas nulla malesuada non.']);
        Faliujsag::create(['faliu_azonosito' => '3', 'dolgozoi_azon' => '40007', 'mikor' => '2022.01.08', 'cim' => 'Nem tudok jönni', 'tartalom' => 'Donec aliquam ipsum ut nisl aliquet vehicula. Phasellus ornare massa scelerisque dui commodo sagittis. Morbi ultricies sem lorem, vitae maximus metus porta ac.']);
        Faliujsag::create(['faliu_azonosito' => '4', 'dolgozoi_azon' => '40012', 'mikor' => '2022.01.08', 'cim' => 'WC-be csak WC', 'tartalom' => 'Phasellus eu accumsan urna, faucibus ornare mi. Sed nec congue purus, nec imperdiet nisi. Quisque quis velit euismod, aliquam lectus id, imperdiet quam. Pellentesque tristique dignissim arcu in blandit.']);
        Faliujsag::create(['faliu_azonosito' => '5', 'dolgozoi_azon' => '40004', 'mikor' => '2022.01.10', 'cim' => 'Pultosoknak figyelem!!', 'tartalom' => 'Proin egestas elementum sapien, quis blandit odio rhoncus eu. Vivamus eget lacus lorem. Ut eget dolor nisl. Quisque venenatis, est eu mattis lacinia, diam urna suscipit ante, vitae pretium arcu odio a mauris. ']);
        Faliujsag::create(['faliu_azonosito' => '6', 'dolgozoi_azon' => '40015', 'mikor' => '2022.01.11', 'cim' => 'Utoljára mondom el!', 'tartalom' => 'Pellentesque sodales dolor magna, id commodo diam iaculis vitae. Praesent egestas tortor dignissim, venenatis justo quis, mattis libero. Morbi aliquet felis ligula, vel consequat enim ultrices sit amet. Etiam malesuada nisi id sollicitudin fermentum. Aenean mauris metus, maximus et nibh in, tempus pellentesque magna. Morbi vel neque placerat, porttitor erat pellentesque, malesuada lectus. Nulla justo mi, laoreet vitae turpis at, pellentesque tempus arcu. Vestibulum eget justo rutrum, maximus urna ut, ullamcorper justo. ']);
        Faliujsag::create(['faliu_azonosito' => '7', 'dolgozoi_azon' => '40021', 'mikor' => '2022.02.01', 'cim' => 'Köszönöm!', 'tartalom' => 'Etiam fringilla magna non dapibus ultricies. Praesent ut sodales felis, vel aliquet elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.']);
        Faliujsag::create(['faliu_azonosito' => '8', 'dolgozoi_azon' => '40017', 'mikor' => '2022.02.05', 'cim' => 'Beugró', 'tartalom' => 'Quisque vel consectetur ipsum. Curabitur quis augue sit amet enim mattis vulputate ac tristique dui. Cras in consectetur orci. Donec a eros diam. Aliquam sed nisl lacinia, blandit massa a, mollis orci. Nulla facilisi.']);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('faliujsag');
    }
}
