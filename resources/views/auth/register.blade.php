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
      <form method="POST" action="<?php print(url('/auth/register', $parameters = array(), $secure = null)); ?>">
          {!! csrf_field() !!}

          <div>
              Name
              <input type="text" name="name" value="{{ old('name') }}">
          </div>

          <div>
              Email
              <input type="email" name="email" value="{{ old('email') }}">
          </div>

          <div>
              Password
              <input type="password" name="password">
          </div>

          <div>
              Confirm Password
              <input type="password" name="password_confirmation">
          </div>

          <div>
              <button type="submit">Register</button>
          </div>
      </form>
    </div>
@endsection