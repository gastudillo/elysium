<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
      html, body { height: 100%; margin: 0; padding: 0; }
      #map { height: 100%; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script type="text/javascript">

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
  
  
  var infowindow = new google.maps.InfoWindow({
	    content: 'Hi!',
	    maxWidth: 200
	  });
  
  var marker = new google.maps.Marker({
	    position: {lat: -34.397, lng: 150.644},
	    map: map,
	    title: 'Hello World!'
	  });
  
  marker.addListener('click', function() {
	  infowindow.open(map, marker);
	   map.setCenter(marker.getPosition());
});
  
}
    </script>
    <!-- script async defer
      	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNN-ZGQlRjtrSl5dNeZU-h9uFJifwQuM0&callback=initMap">
    </script -->
    <script src="https://maps.googleapis.com/maps/api/js?callback=initMap"
        async defer></script>
  </body>
</html>