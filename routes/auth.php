<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HitelesitesController;
use App\Http\Controllers\JelszoVisszaAllitasController;

Route::get('/login', [HitelesitesController::class, 'index'])->name('bejelentkezes');
Route::post('/authenticate', [HitelesitesController::class, 'authenticate'])->name('hitelesites');
Route::get('/logout', [HitelesitesController::class, 'logout'])->name('kijelentkezes');
Route::post('/change', [HitelesitesController::class, 'changePassword'])->name('password.change');
Route::get('/loggeduser', [HitelesitesController::class, 'loggedInUser'])->middleware('auth');
Route::post('/elfelejtettjelszo', [JelszoVisszaAllitasController::class, 'sendResetLink'])->name('password.email');
Route::post('/reset-password', [JelszoVisszaAllitasController::class, 'passwordReset'])->name('password.update');