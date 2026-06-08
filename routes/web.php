<?php

use App\Http\Controllers\BlockController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/sites', [SiteController::class, 'index']);
    Route::post('/sites', [SiteController::class, 'store']);

    Route::get('/sites/{site}/pages', [PageController::class, 'index']);
    Route::post('/sites/{site}/pages', [PageController::class, 'store']);
    Route::get('/pages/{page}', [PageController::class, 'show']);

    Route::get('/pages/{page}/blocks', [BlockController::class, 'index']);

    Route::post('/blocks', [BlockController::class, 'store']);
});

require __DIR__.'/auth.php';
