<?php

use App\Http\Controllers\BlockController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\PageHistoryController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth')->group(function () {

    // Dashboard
    Route::get('/dashboard', fn () => view('dashboard'))->name('dashboard');

    // Sites
    Route::get('/sites', [SiteController::class, 'index'])->name('sites.index');

    // Pages
    Route::get('/sites/{site}/pages', [PageController::class, 'index'])->name('pages.index');
    Route::get('/pages/{page}', [PageController::class, 'show'])->name('pages.show');

    // Editor
    Route::get('/editor/{page}', [PageController::class, 'editor'])->name('editor.show');

    // Sites
    Route::post('/sites', [SiteController::class, 'store'])->name('sites.store');

    // Pages
    Route::post('/sites/{site}/pages', [PageController::class, 'store'])->name('pages.store');

    // Blocks
    Route::post('/blocks', [BlockController::class, 'store'])->name('blocks.store');
    Route::put('/blocks/{block}', [BlockController::class, 'update'])->name('blocks.update');
    Route::delete('/blocks/{block}', [BlockController::class, 'destroy'])->name('blocks.destroy');

    // reorder
    Route::put('/pages/{page}/blocks/reorder', [BlockController::class, 'reorder'])->name('blocks.reorder');

    Route::post('/pages/{page}/autosave', [PageHistoryController::class, 'autosave'])->name('pages.autosave');

    Route::get('/pages/{page}/histories', [PageHistoryController::class, 'index'])->name('pages.histories');

    Route::post('/histories/{history}/restore', [PageHistoryController::class, 'restore'])->name('histories.restore');
});

require __DIR__.'/auth.php';
