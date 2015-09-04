<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class ElysiumController extends Controller {

    public function loadElysium() {

		//$users = DB::select('select * from characters');

        //return view('user.index', ['users' => $users]);

    	//echo url('elysium', $parameters = array(), $secure = null);

    	//die();

        return view('elysium');
    
    }

}