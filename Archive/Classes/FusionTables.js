function Hasher(hash) {
				//alert($(window).height());
				var qs_arr = hash.split('+');
				var qs1 = qs_arr[0].replace('#', '').toUpperCase();
				var qs2 = qs_arr[1].replace('#','').split('&')[0];

				map.lat_querystring = '';
				map.long_querystring = '';

				if (hash.split('+').length == 2) {

					var qs1 = qs_arr[0].replace('#','').toUpperCase().split('&')[0];
					if (qs1.length > 2) {
						var qs1split = qs1.split(' ');
						if (qs1split.length > 1) {
							qs1 = '';
							for (var x = 0; x < qs1split.length; x++) {
								if (x < (qs1split.length - 1)) {
									qs1 += qs1split[x][0].toUpperCase() + (qs1split[x].slice(1, qs1split[x].length).toLowerCase() + ' ');
								} else {
									qs1 += qs1split[x][0].toUpperCase() + (qs1split[x].slice(1, qs1split[x].length).toLowerCase());

								}
							}

						} else {
							qs1 = qs1[0] + (qs1.slice(1, qs1.length).toLowerCase());
						}
						map.long_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,State+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + qs1 + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
						map.lat_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + qs1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';

					} else {
						map.long_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,State+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + qs1 + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
						map.lat_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + qs1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					}
				} else {

					var tmpArr = [];
					var qs1 = qs_arr[0].replace('#', '');
					qs1 = qs1.replace(/\w\S*/g, function(txt) {
						return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
					});
					var qs2 = qs_arr[1].replace('#','').toUpperCase().split('&')[0];

					if (qs2.length > 2) {

						qs2 = qs2[0] + (qs2.slice(1, qs2.length).toLowerCase());

						map.long_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,State+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + qs2 + '%27+AND+CityName%3D%27' + qs1 + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
						map.lat_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + qs2 + '%27+AND+CityName%3D%27' + qs1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';

					} else {
						map.long_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,State+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + qs2 + '%27+AND+CityName%3D%27' + qs1 + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
						map.lat_querystring = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + qs2 + '%27+AND+CityName%3D%27' + qs1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					}
					map.city = qs1;
				}

				
				loadFusionTable();
				map.map_range = [];
			}
			
			function loadFusionTable() {
				$.getJSON(map.lat_querystring, function(response) {
					if (response.rows == null) {
						$('#map-canvas').html('<p style="margin:15px;">Add either a city and state abbreviation (Make sure to add a comma between the city and the State Abbreviation) or just the state abbreviation to the form above. Please check your spelling if you continue to receive this message.  For now, this project is only usable to find artist in the United States.</p>');

					} else {
						map.lat_range = response.rows[0] + ':' + response.rows[(response.rows.length - 1)];
						combineCalls(map.lat_range);

						$.getJSON(map.long_querystring, function(response) {

							map.long_range = response.rows[0][0] + ':' + response.rows[(response.rows.length-1)][0];
							map.state = response.rows[0][1]
							if (map.city != "") {
								//alert(map.state)
								if (map.state == "District of Columbia") {
									map.loc = "Washington, DC";
								} else {
									map.loc = (map.city + ', ' + map.state);
								}
							}
							combineCalls(map.long_range);
						});
					}

				});
			}

			function combineCalls(latorlong) {

				map.map_range.push(latorlong);
				if (map.map_range.length == 2) {

				var echo = new EchonestJSON(map.map_range, .25);
					
					//loadJSON(map.map_range);
				}
			}