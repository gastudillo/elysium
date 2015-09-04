<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use DB;
use Auth;

class CharacterController extends Controller {

    public function add(Request $request) {

        if (Auth::check()) {            
            // The user is logged in...
            $user = Auth::user();

            DB::table('characters')->insert([
                'chr_name'      => $request->input('chr_name'), 
                'chr_clan'      => $request->input('chr_clan'),
                'chr_desc'      => $request->input('chr_desc'),
                'chr_origin'    => $request->input('chr_origin'),
                'chr_user_id'   => $user->id,
            ]);

            return "OK";

        } else {
            return "KO";
        } 

    }

    public function edit(Request $request) {

    }

    public function delete(Request $request) {

    }

    public function get(Request $request) {
        
    }

}