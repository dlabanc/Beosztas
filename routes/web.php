<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlkalmazottController;

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

Route::get('/api/alkalmazottak', [AlkalmazottController::class, 'index']);
Route::get('/api/alkalmazott/{id}', [AlkalmazottController::class, 'show']);
Route::put('/api/alkalmazott/{id}', [AlkalmazottController::class, 'update']);
Route::post('/api/alkalmazott', [AlkalmazottController::class, 'store']);
Route::delete('/api/alkalmazott/{id}', [AlkalmazottController::class, 'destroy']);
