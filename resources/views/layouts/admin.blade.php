<!DOCTYPE html>
<html>
    <head>
        <title>Elysium Admin - @yield('title')</title>

        <!-- jQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

        <script src="js/admin.js"></script>
        
        <script src="js/handlebars/handlebars-v4.0.2.js"></script>
        
        <link rel="stylesheet" href="css/admin.css">
        
        <meta name="csrf-token" content="{{ csrf_token() }}">

        @section('styles')
        <!-- Styles -->
        @show

    </head>
    <body>

      @yield('body')
      
    <script type="text/javascript">
		var baseUrl = "<?php print(url('/', $parameters = array(), $secure = null)); ?>";
	</script>
      
    </body>
</html>