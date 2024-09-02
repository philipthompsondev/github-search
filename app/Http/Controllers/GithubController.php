<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GithubController extends Controller
{
    private $baseUrl = 'https://api.github.com/';

    public function index(){
        return view('index');
    }

    public function search(Request $request){
        $userName = $request->get('userName');

        $user = Http::get($this->baseUrl . 'users/' . $userName);
        $userFollowers = Http::get($this->baseUrl . 'users/' . $userName . '/followers');

        return view('index', [
            'user' => $user,
            'userFollowers' => $userFollowers
        ]);
    }
}
