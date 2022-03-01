<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\BejelentkezesiAdatok;

class CreateBejelentkezesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bejelentkezesi_adatok', function (Blueprint $table) {
            $table->mediumIncrements('user_login');
            $table->string('password',60);
            $table->string('email',50)->nullable();
            $table->foreign('user_login')->references('dolgozoi_azon')->on('alkalmazott')->onDelete('cascade')->onUpdate('cascade');
        });

        BejelentkezesiAdatok::create(['user_login' => '30001', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'kispista@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '35001', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'nagymari@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40001', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'hosszuivan@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40002', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'rovidpeti@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40003', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'aranyosaranka@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40004', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'eszesdani@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40005', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'iszakosimre@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40006', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'kenyeradam@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40007', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'csorolali@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40008', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'fozosrobi@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40009', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'illatosbela@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40010', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'kuktakata@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40011', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'marhamoni@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40012', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'felmosofanni@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40013', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'vodorvilmos@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40014', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'rongyrudi@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40015', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'gazdaggabor@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40016', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'domestosdomi@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40017', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'tisztaterike@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40018', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'tanyerostobias@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40019', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'borosbarnabas@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40020', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'ontoodon@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40021', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'poharaspatrik@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40022', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'szeddleszabolcs@gmail.com']);
        BejelentkezesiAdatok::create(['user_login' => '40023', 'password' => '$2a$10$U2bZjDFDXtRqgE.1AXu8pOJbKt.0NaE8pF0Nm1wVq6JyGdI.IrCIi', 'email' => 'elteszemaborravalotedvard@gmail.com']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bejelentkezesi_adatok');
    }
}
