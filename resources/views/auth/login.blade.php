@extends('layouts.admin')

@section('title', 'Login')

@section('styles')
    @parent

    <style type="text/css">

        body {
          padding-top: 40px;
          padding-bottom: 40px;
          background-color: #eee;
        }

        .form-signin {
          max-width: 330px;
          padding: 15px;
          margin: 0 auto;
        }
        .form-signin .form-signin-heading,
        .form-signin .checkbox {
          margin-bottom: 10px;
        }
        .form-signin .checkbox {
          font-weight: normal;
        }
        .form-signin .form-control {
          position: relative;
          height: auto;
          -webkit-box-sizing: border-box;
             -moz-box-sizing: border-box;
                  box-sizing: border-box;
          padding: 10px;
          font-size: 16px;
        }
        .form-signin .form-control:focus {
          z-index: 2;
        }
        .form-signin input[type="email"] {
          margin-bottom: -1px;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
        .form-signin input[type="password"] {
          margin-bottom: 10px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }

    </style>

@endsection

@section('body')
    <div class="container">

      <form class="form-signin" method="POST" action="<?php print(url('/auth/login', $parameters = array(), $secure = null)); ?>">
          {!! csrf_field() !!}
          <h2 class="form-signin-heading">Identifícate</h2>
          
          <label for="email" class="sr-only">Nombre</label>
          <input type="email" id="email" name="email" class="form-control" placeholder="Email" value="{{ old('email') }}" required autofocus>
          
          <label for="password" class="sr-only">Password</label>
          <input type="password" id="password" name="password" class="form-control" placeholder="Password" required>

          <div class="checkbox">
            <label>
              <input type="checkbox" name="remember"> Remember me
            </label>
          </div>
                
          <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>

      </form>

    </div>
@endsection