function MAP(markers, title, lat_avg, long_avg) {

	this.markers = markers;
	this.title = title;
	this.lat_avg = lat_avg;
	this.long_avg = long_avg;
	this.handle = function(markers, title, lat_avg, long_avg) {
		if(this.markers.length>0)
		{
		focus = new google.maps.LatLng(lat_avg, long_avg);
		var hashy = window.location.hash;

		if (hashy.split('+').length == 2) {

			var mapOptions = {
				zoom : 10,
				center : focus,

				mapTypeId : google.maps.MapTypeId.ROADMAP

			};
		} else {
			var mapOptions = {
				zoom : 6,
				center : focus,

				mapTypeId : google.maps.MapTypeId.ROADMAP
			};
		};

		map.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

		map.image = "genre_icons/marker_sm.png";
		pushLatLong(map, markers, title);
		}
		else{
			addError();
		}
		
	};
	function pushLatLong(map, arr, songtitle) {

		for (var n = 0; n < arr.length; n++) {

			var myLatLng = new google.maps.LatLng(arr[n].split(':')[0], arr[n].split(':')[1]);
			createMarker(myLatLng, songtitle, n);

			if (n == arr.length - 1) {
				runLS();
				addLS();

			}

		}

	}

	function createMarker(pos, songtitle, index) {

		map.marker = new google.maps.Marker({
			position : pos,
			map : map.map, // google.maps.Map
			title : songtitle[index].replace(/<\/div>,/g, '</div>'),
			icon : map.image
		});

		createInfo(map.map, map.marker, map.marker.title);
	}

	function createInfo(map, marker, title, index) {

		google.maps.event.addListener(marker, 'click', function() {
			map.infowindow = new google.maps.InfoWindow({
				content : title.replace(/>,/g, '')

			});
			map.infowindow.open(map, marker);

		});
	}

}

/*
 function initialize(arr, songtitle, str1, str2) {
 console.log(arr);
 map.focus = new google.maps.LatLng(str1, str2);
 if (map.hash.split('+').length == 2) {

 map.mapOptions = {
 zoom : 6,
 center : map.focus,

 mapTypeId : google.maps.MapTypeId.ROADMAP

 };
 } else {
 map.mapOptions = {
 zoom : 10,
 center : map.focus,

 mapTypeId : google.maps.MapTypeId.ROADMAP
 };
 };

 map.map = new google.maps.Map(document.getElementById("map-canvas"), map.mapOptions);

 map.image = "genre_icons/marker_sm.png"
 pushLatLong(map, arr, songtitle);

 }
 function pushLatLong(map, arr, songtitle) {

 for (var n = 0; n < arr.length; n++) {

 var myLatLng = new google.maps.LatLng(arr[n].split(':')[0], arr[n].split(':')[1]);
 createMarker(myLatLng, songtitle, n);

 if (n == arr.length - 1) {
 runLS();
 addLS();

 }

 }

 }

 function createMarker(pos, songtitle, index) {

 map.marker = new google.maps.Marker({
 position : pos,
 map : map.map, // google.maps.Map
 title : songtitle[index].replace(/<\/div>,/g, '</div>'),
 icon : map.image
 });

 createInfo(map.map, map.marker, map.marker.title);
 }

 function createInfo(map, marker, title, index) {

 google.maps.event.addListener(marker, 'click', function() {
 map.infowindow = new google.maps.InfoWindow({
 content : title.replace(/>,/g, '')

 });
 map.infowindow.open(map, marker);

 });
 }

 */	