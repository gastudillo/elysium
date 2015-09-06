<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/elysium', 'ElysiumController@loadElysium');

Route::get('/map', function () {
    return view('map');
});


// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

/* Admin */
Route::get('/admin', ['middleware' => 'auth', 'uses' => 'AdminController@loadAdmin']);

/* Characters */
Route::post('/admin/characters/add', 'CharacterController@add');
Route::post('/admin/characters/get', 'CharacterController@get');

Route::post('/admin/characters/delete/{id}', ['middleware' => 'auth', 'uses' => 'CharacterController@delete']);
Route::post('/admin/characters/page/{number}', ['middleware' => 'auth', 'uses' => 'CharacterController@getPage']);
Route::post('/admin/characters/count', ['middleware' => 'auth', 'uses' => 'CharacterController@getTotalPages']);


