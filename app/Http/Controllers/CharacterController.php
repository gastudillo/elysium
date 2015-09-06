<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use DB;
use Auth;

define('PAGE_SIZE',  10);

class CharacterController extends Controller {
	
	public function getTotalPages(Request $request) {
		$charactersCount = DB::table('characters')->count();
		return ceil($charactersCount / PAGE_SIZE);
	}
	
	public function getPage($number, Request $request){
				
		$offset = ($number - 1) * PAGE_SIZE;
			
		$characters = DB::table('characters')
		->join('clans', 'characters.chr_clan', '=', 'clans.cln_id')
		->join('users', 'characters.chr_user_id', '=', 'users.id')
		->select('characters.chr_id', 'characters.chr_name', 'clans.cln_name', 'characters.chr_desc', 'characters.chr_origin', 'users.name')
		->skip($offset)->take(PAGE_SIZE)
		->get();
			
		$user = Auth::user();
		
		return $characters;

	}

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

    public function delete($id) {
		
    	DB::table('characters')->where('chr_id', '=', $id)->delete();
    	return "OK";
    	
    }

    public function get(Request $request) {
        
    }

}