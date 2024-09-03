<?php

use App\Http\Controllers\GithubController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Search');
});

Route::post('/', [GithubController::class, 'search'])->name('github.search');
Route::post('/followers', [GithubController::class, 'getFollowers'])->name('github.followers');
