<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class GithubController extends Controller
{
    private $baseUrl = 'https://api.github.com/';

    public function index(){
        return Inertia::render('Users');
    }

    public function search(Request $request){
        $userName = $request->get('username');
        $user = json_decode(Http::get($this->baseUrl . 'users/' . $userName)->body());

        return Inertia::render('Search', [
            'user' => $user
        ]);
    }

    public function getFollowers(Request $request){
        return json_decode(Http::get($this->baseUrl . 'users/' . $request->get('username') . '/followers?per_page=5&page=' . $request->query('page'))->body());
    }
}
