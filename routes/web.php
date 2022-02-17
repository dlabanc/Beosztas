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
use App\Http\Controllers\BejelentkezesiAdatokController;
use App\Http\Controllers\MunkakorStatController;
use App\Http\Controllers\HetiOraszamController;
use App\Http\Controllers\SzabadsagStatController;
use App\Http\Controllers\HitelesitesController;
use App\Http\Controllers\DolgozottNapokStatController;
use App\Http\Controllers\StatisztikaController;
use App\Http\Middleware\IsAuthenticated;



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

Route::get('/login', [HitelesitesController::class, 'index'])->name('bejelentkezes');
Route::post('/authenticate', [HitelesitesController::class, 'authenticate'])->name('hitelesites');
Route::get('/logout', [HitelesitesController::class, 'logout'])->name('kijelentkezes');
Route::get('/loggeduser', [HitelesitesController::class, 'loggedInUser']);

##ALKALMAZOTT
/*az összes route belekerül majd middleware-k közé így autentikáció nélkül nem lesznek elérhetők*/
// Route::middleware(['auth', IsAuthenticated::class])->group(function () {
//     Route::get('/api/alkalmazott/search', [AlkalmazottController::class, 'search']);
//     Route::get('/api/alkalmazottak', [AlkalmazottController::class, 'index']);
//     Route::get('/api/alkalmazott/{dolgozoi_azon}', [AlkalmazottController::class, 'show']);
//     Route::put('/api/alkalmazott/{dolgozoi_azon}', [AlkalmazottController::class, 'update']);
//     Route::post('/api/alkalmazott', [AlkalmazottController::class, 'store']);
//     Route::delete('/api/alkalmazott/{dolgozoi_azon}', [AlkalmazottController::class, 'destroy']);
// });

Route::get('/api/alkalmazott/search', [AlkalmazottController::class, 'search']);
Route::get('/api/alkalmazottak', [AlkalmazottController::class, 'index']);
Route::get('/api/alkalmazott/{dolgozoi_azon}', [AlkalmazottController::class, 'show']);
Route::put('/api/alkalmazott/{dolgozoi_azon}', [AlkalmazottController::class, 'update']);
Route::post('/api/alkalmazott', [AlkalmazottController::class, 'store']);
Route::delete('/api/alkalmazott/{dolgozoi_azon}', [AlkalmazottController::class, 'destroy']);

##MUSZAKELOSZLAS
Route::get('/api/muszakeloszlasok', [MuszakEloszlasController::class, 'index']);
Route::get('/api/muszakeloszlas/{muszakelo_azon}', [MuszakEloszlasController::class, 'show']);
Route::put('/api/muszakeloszlas/{muszakelo_azon}', [MuszakEloszlasController::class, 'update']);
Route::post('/api/muszakeloszlas', [MuszakEloszlasController::class, 'store']);
Route::delete('/api/muszakeloszlas/{muszakelo_azon}', [MuszakEloszlasController::class, 'destroy']);

##MUSZAKTIPUS
Route::get('/api/muszaktipusok', [MuszakTipusController::class, 'index']);
Route::get('/api/muszaktipus/{tipus}', [MuszakTipusController::class, 'show']);
Route::put('/api/muszaktipus/{tipus}', [MuszakTipusController::class, 'update']);
Route::post('/api/muszaktipus', [MuszakTipusController::class, 'store']);
Route::delete('/api/muszaktipus/{tipus}', [MuszakTipusController::class, 'destroy']);

##BEOSZTAS
Route::get('/api/beosztas/{beo_azonosito}/expand', [BeosztasController::class, 'expandId']);
Route::get('/api/beosztasok/expand', [BeosztasController::class, 'expandAll']);
Route::get('/api/beosztasok', [BeosztasController::class, 'index']);
Route::get('/api/beosztas/{beo_azonosito}', [BeosztasController::class, 'show']);
Route::put('/api/beosztas/{beo_azonosito}', [BeosztasController::class, 'update']);
Route::post('/api/beosztas', [BeosztasController::class, 'store']);
Route::delete('/api/beosztas/{beo_azonosito}', [BeosztasController::class, 'destroy']);

##FALIUJSAG
Route::get('/api/faliujsagok', [FaliujsagController::class, 'index']);
Route::get('/api/faliujsag/{faliu_azonosito}', [FaliujsagController::class, 'show']);
Route::put('/api/faliujsag/{faliu_azonosito}', [FaliujsagController::class, 'update']);
Route::post('/api/faliujsag', [FaliujsagController::class, 'store']);
Route::delete('/api/faliujsag/{faliu_azonosito}', [FaliujsagController::class, 'destroy']);

##MUNKAKOR
Route::get('/api/munkakorok', [MunkakorController::class, 'index']);
Route::get('/api/munkakor/{megnevezes}', [MunkakorController::class, 'show']);
Route::put('/api/munkakor/{megnevezes}', [MunkakorController::class, 'update']);
Route::post('/api/munkakor', [MunkakorController::class, 'store']);
Route::delete('/api/munkakor/{megnevezes}', [MunkakorController::class, 'destroy']);

##NAPIMUNKAEROIGENY
Route::get('/api/napimunkaeroigeny/{napim_azonosito}/expand', [NapiMunkaeroIgenyController::class, 'expandId']);
Route::get('/api/napimunkaeroigenyek/expand', [NapiMunkaeroIgenyController::class, 'expandAll']);
Route::get('/api/napimunkaeroigenyek', [NapiMunkaeroIgenyController::class, 'index']);
Route::get('/api/napimunkaeroigeny/{napim_azonosito}', [NapiMunkaeroIgenyController::class, 'show']);
Route::put('/api/napimunkaeroigeny/{napim_azonosito}', [NapiMunkaeroIgenyController::class, 'update']);
Route::post('/api/napimunkaeroigeny', [NapiMunkaeroIgenyController::class, 'store']);
Route::delete('/api/napimunkaeroigeny/{napim_azonosito}', [NapiMunkaeroIgenyController::class, 'destroy']);

##NAPOK
Route::get('/api/napokossz', [NapokController::class, 'index']);
Route::get('/api/napok/{nap}', [NapokController::class, 'show']);
Route::put('/api/napok/{nap}', [NapokController::class, 'update']);
Route::post('/api/napok', [NapokController::class, 'store']);
Route::delete('/api/napok/{nap}', [NapokController::class, 'destroy']);

##NEMDOLGOZNA
Route::get('/api/nemdolgoznaossz/expand', [NemDolgoznaController::class, 'expandAll']);
Route::get('/api/nemdolgoznaossz', [NemDolgoznaController::class, 'index']);
Route::get('/api/nemdolgozna/{nemdolgozna_azon}', [NemDolgoznaController::class, 'show']);
Route::put('/api/nemdolgozna/{nemdolgozna_azon}', [NemDolgoznaController::class, 'update']);
Route::post('/api/nemdolgozna', [NemDolgoznaController::class, 'store']);
Route::delete('/api/nemdolgozna/{nemdolgozna_azon}', [NemDolgoznaController::class, 'destroy']);

##SZABADSAG
Route::get('/api/szabadsagok/expand', [SzabadsagController::class, 'expandAll']);
Route::get('/api/szabadsagok', [SzabadsagController::class, 'index']);
Route::get('/api/szabadsag/{szabadsag_azonosito}', [SzabadsagController::class, 'show']);
Route::put('/api/szabadsag/{szabadsag_azonosito}', [SzabadsagController::class, 'update']);
Route::post('/api/szabadsag', [SzabadsagController::class, 'store']);
Route::delete('/api/szabadsag/{szabadsag_azonosito}', [SzabadsagController::class, 'destroy']);

##BEJELENTKEZESIADATOK
Route::get('/api/bejelentkezesiadatok', [BejelentkezesiAdatokController::class, 'index']);
Route::get('/api/bejelentkezesiadat/{user_login}', [BejelentkezesiAdatokController::class, 'show']);
Route::put('/api/bejelentkezesiadat/{user_login}', [BejelentkezesiAdatokController::class, 'update']);
Route::post('/api/bejelentkezesiadat', [BejelentkezesiAdatokController::class, 'store']);
Route::delete('/api/bejelentkezesiadat/{user_login}', [BejelentkezesiAdatokController::class, 'destroy']);

##VIEWOK
##MUNKAKORSTAT
Route::get('/api/munkakorstat', [StatisztikaController::class, 'munkakor']);

##HETIORASZAMSTAT
Route::get('/api/hetioraszamstat', [StatisztikaController::class, 'hetioraszam']);

##SZABADSAGSTAT
Route::get('/api/szabadsagstat', [StatisztikaController::class, 'szabadsagstat']);

##DOLGOZOTTNAPOKSTAT
Route::get('/api/dolgozottnapok', [StatisztikaController::class, 'dolgozottnapok']);

##AKTUALIS(NAPI) POSZT
Route::get('/api/napiposzt', [StatisztikaController::class, 'napiposzt']);

##SZABADSAG KEROK
Route::get('/api/szabadsagkerok', [StatisztikaController::class, 'szabadsag_kerok']);
