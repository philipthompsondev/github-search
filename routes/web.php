<?php

use App\Http\Controllers\GithubController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::post('/search', [GithubController::class, 'search'])->name('github.search');
