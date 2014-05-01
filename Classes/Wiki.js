function loadSongsViaWiki()
			{
				map.keywords = [];
				var tmpStr = '';
				//alert(map.hash.split('+').length);
				if (map.hash.split('+').length > 2) {

					//alert('greater than');
					wiki_hash_combine = [];
					var wiki_hash = map.hash.replace('+us', '');

					wiki_hash_split = wiki_hash.split(' ');

					for (var i = 0; i < wiki_hash_split.length; i++) {
						wiki_hash_combine.push(wiki_hash_split[i][0].toUpperCase() + wiki_hash_split[i].toLowerCase().slice(1, (wiki_hash_split[i].length)));
					}
					wiki_hash = wiki_hash_combine.toString().replace(',', '_');

					var wiki_hash_arr = wiki_hash.split('+');

					if (wiki_hash_arr.length > 1) {
						if (map.state == 'District of Columbia') {
							var wiki_hash_1 = 'District_of_Columbia';
						} else {
							var wiki_hash_1 = wiki_hash_arr[0] + '_(' + map.state + ')';

						}

					} else if (wiki_hash_arr.length == 1) {

						if (map.state == "Washington") {
							var wiki_hash_1 = "Washington_(state)";
						} else {
							var wiki_hash_1 = map.state;
						}

					}
					var wiki_hash_2 = wiki_hash_arr[0];

					var playListURL = 'http://en.wikivoyage.org/w/api.php?format=json&action=query&titles=' + wiki_hash_1 + '&redirects&prop=revisions&rvprop=content&callback=?';
					console.log(playListURL);
					$.getJSON(playListURL, function(data) {

						$.each(data.query.pages, function(i, item) {

							if (item.pageid == null || item.revisions[0]['*'].match('There is more than one place called')) {
								var playListURL2 = 'http://en.wikivoyage.org/w/api.php?format=json&action=query&titles=' + wiki_hash_2 + '&redirects&prop=revisions&rvprop=content&callback=?';
								map.keywords.push(map.loc.split(',')[0]);
								console.log(playListURL2);
								$.getJSON(playListURL2, function(data) {
									$.each(data.query.pages, function(i, item) {
										map.wikibody = item.revisions[0]['*'];

										map.wikibody_districts = '';
										map.wikibody_see = map.wikibody.split('==See==')[1].split('==Eat')[0];

										map.wikibody_split = [];
										map.wikibody_split2 = [];
										map.wikibody_split = map.wikibody_see.split("''");
										map.wikibody_split2 = map.wikibody_see.split('[[');
										if (map.wikibody_split.length > 20) {
											var lengthy1 = 20;
										} else {
											var lengthy1 = map.wikibody_split.length;
										}
										if (map.wikibody_split2.length > 10) {
											var lengthy2 = 10;
										} else {
											var lengthy2 = map.wikibody_split2.length;
										}

										for (var i = 1; i < lengthy1; i = i + 2) {
											if (!map.wikibody_split[i].match('thumb') && !map.wikibody_split[i].match('File') && !map.wikibody_split[i].match('wikivoyage') && !map.wikibody_split[i].match('United States') && !map.wikibody_split[i].match('America') && !map.wikibody_split[i].match('IMPORTANT') && !map.wikibody_split[i].match('always') && !map.wikibody_split[i].match('at')) {
												//alert(map.wikibody_split[i].split('|')[1])

												if (map.wikibody_split[i].split('|').length > 1) {
													map.term = (map.wikibody_split[i].split('|')[1]).replace(']]', '');
												} else {
													map.term = map.wikibody_split[i].replace(/'/g, '');
												}
												map.keywords.push(map.term.replace(/National Park/g, ''));
											}
										}

										for (var v = 2; v < lengthy2; v++) {
											if (!map.wikibody_split2[v].match('thumb') && !map.wikibody_split2[v].match('File') && !map.wikibody_split2[v].match('wikivoyage') && !map.wikibody_split2[v].match('United States') && !map.wikibody_split2[v].match('America') && !map.wikibody_split2[v].match('IMPORTANT') && !map.wikibody_split2[v].match('always') && !map.wikibody_split2[v].match('at')) {
												if (map.wikibody_split2[v].split('|').length > 1) {
													map.term = (map.wikibody_split2[v].split('|')[1]).replace(']]', '')
												} else {
													map.term = map.wikibody_split2[v].split("]]")[0]
												}
												map.keywords.push(map.term.replace(/National Park/g, ''));
											}
										}

										for (var u = 0; u < map.keywords.length; u++) {
											//console.log(map.keywords[u]);
											var spoturl = 'http://ws.spotify.com/search/1/track.json?q=title:' + map.keywords[u];
											$.getJSON(spoturl, function(data) {

											});
										}

									});
								});
							} else {
								//console.log(item.revisions[0]['*']);
								map.wikibody = item.revisions[0]['*'];
								map.keywords.push(map.loc.split(',')[0] + '+' + window.location.hash.split('+')[1].split('&&')[0]);

								map.wikibody_districts = '';
								map.wikibody_see = map.wikibody.split('==See==')[1].split('==Eat')[0];

								map.wikibody_split = [];
								map.wikibody_split2 = [];
								map.wikibody_split = map.wikibody_see.split("''");
								map.wikibody_split2 = map.wikibody_see.split('[[');
								if (map.wikibody_split.length > 20) {
									var lengthy1 = 20;
								} else {
									var lengthy1 = map.wikibody_split.length;
								}
								if (map.wikibody_split2.length > 10) {
									var lengthy2 = 10;
								} else {
									var lengthy2 = map.wikibody_split2.length;
								}

								for (var i = 1; i < lengthy1; i = i + 2) {
									if (!map.wikibody_split[i].match('thumb') && !map.wikibody_split[i].match('File') && !map.wikibody_split[i].match('wikivoyage') && !map.wikibody_split[i].match('United States') && !map.wikibody_split[i].match('America') && !map.wikibody_split[i].match('IMPORTANT') && !map.wikibody_split[i].match('always') && !map.wikibody_split[i].match('at')) {

										if (map.wikibody_split[i].split('|').length > 1) {
											map.term = (map.wikibody_split[i].split('|')[1]).replace(']]', '');
										} else {
											map.term = map.wikibody_split[i].replace(/'/g, '');
										}
										map.keywords.push(map.term.replace(/National Park/g, ''));
									}
								}

								for (var v = 2; v < lengthy2; v++) {
									if (!map.wikibody_split2[v].match('thumb') && !map.wikibody_split2[v].match('File') && !map.wikibody_split2[v].match('wikivoyage') && !map.wikibody_split2[v].match('United States') && !map.wikibody_split2[v].match('America') && !map.wikibody_split2[v].match('IMPORTANT') && !map.wikibody_split2[v].match('always') && !map.wikibody_split2[v].match('at')) {
										if (map.wikibody_split2[v].split('|').length > 1) {
											map.term = (map.wikibody_split2[v].split('|')[1]).replace(']]', '')
										} else {
											map.term = map.wikibody_split2[v].split("]]")[0]
										}
										map.keywords.push(map.term.replace(/National Park/g, ''));
									}
								}
								for (var u = 0; u < map.keywords.length; u++) {
									var spoturl = 'http://ws.spotify.com/search/1/track.json?q=title:' + map.keywords[u];
									$.getJSON(spoturl, function(data) {

									});
								}

							}
						});
					});
				} else {
					//alert('less than');
					var wiki_hash = map.hash.replace('+us', '');

					wiki_hash_combine = [];
					var wiki_hash = map.hash.replace('+us', '');

					wiki_hash_split = wiki_hash.split(' ');

					for (var i = 0; i < wiki_hash_split.length; i++) {
						wiki_hash_combine.push(wiki_hash_split[i][0].toUpperCase() + wiki_hash_split[i].toLowerCase().slice(1, (wiki_hash_split[i].length)))
					}
					wiki_hash = wiki_hash_combine.toString().replace(',', '_');

					if (map.state == "Washington") {
						var wiki_hash_1 = "Washington_(state)";
					} else {
						var wiki_hash_1 = map.state;
					}

				}

				map.statesArr = [];

				if (window.location.hash.split('+').length == 1) {
					map.keywords.push(map.loc);
					var playListURL = 'http://en.wikivoyage.org/w/api.php?format=json&action=query&titles=' + wiki_hash_1 + '&redirects&prop=revisions&rvprop=content&callback=?';
					console.log(playListURL);
					$.getJSON(playListURL, function(data) {

						$.each(data.query.pages, function(i, item) {

							for (var y = 0; y < map.states.length; y++) {
								map.statesArr.push(map.states[y]);
							}
							map.wikibody = item.revisions[0]['*'];
							map.wikibody_cities = map.wikibody.split('==Cities==')[1].split('==Sleep')[0];
							map.wikibody_split = map.wikibody_cities.split('[[');
							for (var i = 2; i < 20; i++) {
								if (!map.wikibody_split[i].match('thumb') && !map.wikibody_split[i].match('File') && !map.wikibody_split[i].match('wikivoyage') && !map.wikibody_split[i].match('United States') && !map.wikibody_split[i].match('America'))

									map.keywords.push(map.wikibody_split[i].split(']]')[0].replace(/National Park/g, ''))

							}

							for (var u = 0; u < map.keywords.length; u++) {
								//console.log(map.keywords[u]);
								var spoturl = 'http://ws.spotify.com/search/1/track.json?q=title:' + map.keywords[u];
								$.getJSON(spoturl, function(data) {

								});
							}

						});
					});
				}
				for (var u = 0; u < map.keywords.length; u++) {
					//console.log(map.keywords[u]);
					var spoturl = 'http://ws.spotify.com/search/1/track.json?q=title:' + map.keywords[u];
					$.getJSON(spoturl, function(data) {

					});
				}
				
			}