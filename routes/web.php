<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BlockController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\PageHistoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EditorController;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth')->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('/dashboard/sites', [SiteController::class, 'index'])
    ->name('dashboard.sites');

    Route::get('/dashboard/analytics', fn () => view('dashboard.analytics'))
        ->name('dashboard.analytics');

    Route::get('/dashboard/settings', fn () => view('dashboard.settings'))
        ->name('dashboard.settings');

    Route::get(
        '/dashboard/sites/{site}/pages',
        [PageController::class, 'manage']
    )->name('pages.manage');

    // Sites
    Route::get('/sites', [SiteController::class, 'index'])->name('sites.index');
    Route::post('/sites', [SiteController::class, 'store'])->name('sites.store');
    
    Route::put('/sites/{site}', [SiteController::class, 'update'])
        ->name('sites.update');
    
    Route::delete('/sites/{site}', [SiteController::class, 'destroy'])
        ->name('sites.destroy');

    // Pages
    Route::get('/sites/{site}/pages', [PageController::class, 'index'])
        ->name('pages.index');

    Route::post('/sites/{site}/pages', [PageController::class, 'store'])
        ->name('pages.store');

    Route::get('/pages/{page}', [PageController::class, 'show'])
        ->name('pages.show');

    Route::put('/pages/{page}', [PageController::class, 'update'])
        ->name('pages.update');

    Route::delete('/pages/{page}', [PageController::class, 'destroy'])
        ->name('pages.destroy');
        
    // Editor
    Route::get('/editor/{page}', [EditorController::class, 'show'])
        ->name('editor.show');

    Route::delete('/pages/{page}/blocks', [BlockController::class, 'clear']);

    // Blocks
    Route::get('/pages/{page}/blocks', [BlockController::class, 'index'])
        ->name('blocks.index');
    Route::post('/blocks', [BlockController::class, 'store'])->name('blocks.store');
    Route::post(
        '/pages/{page}/blocks/bulk',
        [BlockController::class, 'bulkSave']
    );
    Route::put('/blocks/{block}', [BlockController::class, 'update'])->name('blocks.update');
    Route::delete('/blocks/{block}', [BlockController::class, 'destroy'])->name('blocks.destroy');
    

    // reorder
    Route::put('/pages/{page}/blocks/reorder', [BlockController::class, 'reorder'])->name('blocks.reorder');

    Route::post('/pages/{page}/autosave', [PageHistoryController::class, 'autosave'])->name('pages.autosave');

    Route::get('/pages/{page}/histories', [PageHistoryController::class, 'index'])->name('pages.histories');

    Route::post('/histories/{history}/restore', [PageHistoryController::class, 'restore'])->name('histories.restore');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__.'/auth.php';