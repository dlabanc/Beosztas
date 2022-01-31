<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlkalmazottController;
use App\Http\Controllers\MuszakEloszlasController;
use App\Http\Controllers\MuszakTipusController;
use App\Http\Controllers\BeosztasController;
use App\Http\Controllers\FaliujsagController;
use App\Http\Controllers\MunkakorController;
use App\Http\Controllers\NapiMunkaeroIgenyController;
use App\Http\Controllers\NapokController;
use App\Http\Controllers\NemDolgoznaController;
use App\Http\Controllers\SzabadsagController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin', function () {
    return view('admin/admin');
});

Route::get('/managermenu', function () {
    return view('managermenu/managermenu');
});

Route::get('/usermenu', function () {
    return view('usermenu/usermenu');
});

Route::get('/login', function () {
    return view('login/login');
});

##ALKALMAZOTT
Route::get('/api/alkalmazott/search', [AlkalmazottController::class, 'search']);
Route::get('/api/alkalmazottak', [AlkalmazottController::class, 'index']);
Route::get('/api/alkalmazott/{id}', [AlkalmazottController::class, 'show']);
Route::put('/api/alkalmazott/{id}', [AlkalmazottController::class, 'update']);
Route::post('/api/alkalmazott', [AlkalmazottController::class, 'store']);
Route::delete('/api/alkalmazott/{id}', [AlkalmazottController::class, 'destroy']);

##MUSZAKELOSZLAS
Route::get('/api/muszakeloszlasok', [MuszakEloszlasController::class, 'index']);
Route::get('/api/muszakeloszlas/{muszaktipus}/{muszakszam}', [MuszakEloszlasController::class, 'show']);
Route::put('/api/muszakeloszlas/{muszaktipus}/{muszakszam}', [MuszakEloszlasController::class, 'update']);
Route::post('/api/muszakeloszlas', [MuszakEloszlasController::class, 'store']);
Route::delete('/api/muszakeloszlas/{muszaktipus}/{muszakszam}', [MuszakEloszlasController::class, 'destroy']);

##MUSZAKTIPUS
Route::get('/api/muszaktipusok', [MuszakTipusController::class, 'index']);
Route::get('/api/muszaktipus/{id}', [MuszakTipusController::class, 'show']);
Route::put('/api/muszaktipus/{id}', [MuszakTipusController::class, 'update']);
Route::post('/api/muszaktipus', [MuszakTipusController::class, 'store']);
Route::delete('/api/muszaktipus/{id}', [MuszakTipusController::class, 'destroy']);

##BEOSZTAS
Route::get('/api/beosztasok', [BeosztasController::class, 'index']);
Route::get('/api/beosztas/{datum}/{muszaktipus}/{muszakszam}/{munkakor}/{alk}', [BeosztasController::class, 'show']);
Route::put('/api/beosztas/{datum}/{muszaktipus}/{muszakszam}/{munkakor}/{alk}', [BeosztasController::class, 'update']);
Route::post('/api/beosztas', [BeosztasController::class, 'store']);
Route::delete('/api/beosztas/{datum}/{muszaktipus}/{muszakszam}/{munkakor}/{alk}', [BeosztasController::class, 'destroy']);

##FALIUJSAG
Route::get('/api/faliujsagok', [FaliujsagController::class, 'index']);
Route::get('/api/faliujsag/{azonosito}', [FaliujsagController::class, 'show']);
Route::put('/api/faliujsag/{azonosito}', [FaliujsagController::class, 'update']);
Route::post('/api/faliujsag', [FaliujsagController::class, 'store']);
Route::delete('/api/faliujsag/{azonosito}', [FaliujsagController::class, 'destroy']);

##MUNKAKOR
Route::get('/api/munkakorok', [MunkakorController::class, 'index']);
Route::get('/api/munkakor/{megnevezes}', [MunkakorController::class, 'show']);
Route::put('/api/munkakor/{megnevezes}', [MunkakorController::class, 'update']);
Route::post('/api/munkakor', [MunkakorController::class, 'store']);
Route::delete('/api/munkakor/{megnevezes}', [MunkakorController::class, 'destroy']);

##NAPIMUNKAEROIGENY
Route::get('/api/napimunkaeroigenyek', [NapiMunkaeroIgenyController::class, 'index']);
Route::get('/api/napimunkaeroigeny/{datum}/{muszaktipus}/{muszakszam}/{munkakor}', [NapiMunkaeroIgenyController::class, 'show']);
Route::put('/api/napimunkaeroigeny/{datum}/{muszaktipus}/{muszakszam}/{munkakor}', [NapiMunkaeroIgenyController::class, 'update']);
Route::post('/api/napimunkaeroigeny', [NapiMunkaeroIgenyController::class, 'store']);
Route::delete('/api/napimunkaeroigeny/{datum}/{muszaktipus}/{muszakszam}/{munkakor}', [NapiMunkaeroIgenyController::class, 'destroy']);

##NAPOK
Route::get('/api/napokossz', [NapokController::class, 'index']);
Route::get('/api/napok/{nap}', [NapokController::class, 'show']);
Route::put('/api/napok/{nap}', [NapokController::class, 'update']);
Route::post('/api/napok', [NapokController::class, 'store']);
Route::delete('/api/napok/{nap}', [NapokController::class, 'destroy']);

##NEMDOLGOZNA
Route::get('/api/nemdolgoznaossz', [NemDolgoznaController::class, 'index']);
Route::get('/api/nemdolgozna/{alkalmazott}/{datum}/{muszaktipus}/{muszakszam}', [NemDolgoznaController::class, 'show']);
Route::put('/api/nemdolgozna/{alkalmazott}/{datum}/{muszaktipus}/{muszakszam}', [NemDolgoznaController::class, 'update']);
Route::post('/api/nemdolgozna', [NemDolgoznaController::class, 'store']);
Route::delete('/api/nemdolgozna/{alkalmazott}/{datum}/{muszaktipus}/{muszakszam}', [NemDolgoznaController::class, 'destroy']);

##SZABADSAG
Route::get('/api/szabadsagok', [SzabadsagController::class, 'index']);
Route::get('/api/szabadsag/{alkalmazott}/{tol}/{ig}', [SzabadsagController::class, 'show']);
Route::put('/api/szabadsag/{alkalmazott}/{tol}/{ig}', [SzabadsagController::class, 'update']);
Route::post('/api/szabadsag', [SzabadsagController::class, 'store']);
Route::delete('/api/szabadsag/{alkalmazott}/{tol}/{ig}', [SzabadsagController::class, 'destroy']);

##BEJELENTKEZESIADATOK
Route::get('/api/bejelentkezesiadatok', [SzabadsagController::class, 'index']);
Route::get('/api/bejelentkezesiadat/{id}', [SzabadsagController::class, 'show']);
Route::put('/api/bejelentkezesiadat/{id}', [SzabadsagController::class, 'update']);
Route::post('/api/bejelentkezesiadat', [SzabadsagController::class, 'store']);
Route::delete('/api/bejelentkezesiadat/{id}', [SzabadsagController::class, 'destroy']);