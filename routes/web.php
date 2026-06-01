<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\BlockController;

Route::post('/sites', [SiteController::class, 'store']);
Route::post('/pages', [PageController::class, 'store']);
Route::post('/blocks', [BlockController::class, 'store']);
 

Route::get('/', function () {
    return view('welcome');
});
