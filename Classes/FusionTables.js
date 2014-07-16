///////////////////////////////parses Hash for; creates 'querystring' to find lat long for the echonest function/////////////////////////////

function Hasher(hash) {
	
	var qs_arr = hash.split('+');
	var lat_querystring = '';
	var long_querystring = '';
	
	if (hash.split('+').length == 2) {
		
		var qs1 = qs_arr[0].replace('#','').toUpperCase().split('&')[0];
		
		if (qs1.length > 2) {
			qs1 = qsParser(qs1);
			long_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,State+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + qs1 + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
			lat_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + qs1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
			
		} else {
			long_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,State+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + qs1 + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
			lat_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + qs1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
		}
	} else {

		var tmpArr = [];
		var qs1 = qs_arr[0].replace('#', '');
		qs1 = qsParser(qs1);
		var qs2 = qs_arr[1].replace('#','').toUpperCase().split('&')[0];
		
		if (qs2.length > 2) {

			qs2 = qsParser(qs2.replace('_'));
			
			long_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,State+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + qs2 + '%27+AND+CityName%3D%27' + qs1 + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
			lat_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + qs2 + '%27+AND+CityName%3D%27' + qs1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';

		} else {
			long_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,State+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + qs2 + '%27+AND+CityName%3D%27' + qs1 + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
			lat_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + qs2 + '%27+AND+CityName%3D%27' + qs1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
		}
		map.city = qs1;
	}

	loadFusionTable(lat_querystring, long_querystring);
	map.map_range = [];
}

///////////////// Parses the JSON feed of the fusion table (url comes from above function); gives the latitude/logitude used in the EchonestJSON class///////////////////
function loadFusionTable(qs1, qs2) {
	$.getJSON(qs1, function(response) {
		if (response.rows == null) {
			$('#map-canvas').html('<p style="margin:15px;">Add either a city and state abbreviation (Make sure to add a comma between the city and the State Abbreviation) or just the state abbreviation to the form above. Please check your spelling if you continue to receive this message.  For now, this project is only usable to find artist in the United States.</p>');

		} else {
			lat_range = response.rows[0] + ':' + response.rows[(response.rows.length - 1)];
			combineCalls(lat_range);

			$.getJSON(qs2, function(response) {

				long_range = response.rows[0][0] + ':' + response.rows[(response.rows.length-1)][0];
				map.state = response.rows[0][1]
				if (map.city != "") {

					//alert(map.state)
					if (map.state == "District of Columbia") {
						map.loc = "Washington, DC";
					} else {
						map.loc = (map.city + ', ' + map.state);
					}
				}
				combineCalls(long_range);
			});
		}
		
	});
}

function combineCalls(latorlong) {

	
	map.map_range.push(latorlong);
	
	if (map.map_range.length == 2) {
		/////////////////////////////Call instance of EchonestJSON function with the latlong array and +- range for latitude used in the EchonestJSON class/////////////////////////////////////
		var map_lat_range = map.map_range[0];
		var map_long_range = map.map_range[1];
		var map_lat1 = map_lat_range.split(':')[0];
		map_lat2 = map_lat_range.split(':')[1]
		var map_long1 = map_lat_range.split(':')[0];
		map_long2 = map_lat_range.split(':')[1]		
		if((map_lat2 - map_lat1)>1||(map_long2-map_long1)>1)
		{
		var echo = new EchonestJSON(map.map_range, -.25);
		}
		else 
		{
			var echo = new EchonestJSON(map.map_range, .19);
		
		}
		//loadJSON(map.map_range);
	}
}