<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\Controller;

use DB;

class AdminController extends Controller {

    public function loadAdmin(Request $request) {
        
        // Cargamos clanes
        $clans = DB::table('clans')->get();

        // Cargo listado de personajes
        $characters = DB::table('characters')->get();

    	// Mostramos opciones de administración
    	return view('dashboard', ['clans' => $clans, 'characters' => $characters]);
    	
    }

}