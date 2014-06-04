//////This group of functions is used to  create favorites.

///Stylistic changes - background; filling in star, etc in all spots (Playlist Box, Map infowindow and Favorite Box)
		function addFavorite(id, spot_id) {
				var addhash = '';

				if (id.match('infobox_')) {
					var id2 = id.replace('infobox_', '');

					if ($('#' + id).attr('data-icon') == 'u') {

						$('#' + id).addClass('favorite_on').removeClass('favorite_off');

						$('#' + id).attr('data-icon', 't')
						$('#' + id2).attr('data-icon', 't')
						$('#' + id2).addClass('favorite_on').removeClass('favorite_off');
						$('#' + id2.replace('_LS')).parent().parent().removeClass('gray').addClass('red');
						$('#' + id2.replace('_LS')).removeClass('favorite_on').addClass('favorite_off');
					} else {
						$('#' + id).attr('data-icon', 'u')
						$('#' + id).addClass('favorite_off').removeClass('favorite_on');
						$('#' + id2).attr('data-icon', 'u')
						$('#' + id2).addClass('favorite_off').removeClass('favorite_on');
						$('#' + id2).parent().parent().addClass('gray').removeClass('red');

					}
				} else {
					var id2 = 'infobox_' + id;

					if ($('#' + id).attr('data-icon') == 'u') {

						$('#' + id).attr('data-icon', 't')
						$('#' + id).addClass('favorite_on').removeClass('favorite_off');
						$('#' + id2).attr('data-icon', 't')
						$('#' + id2).addClass('favorite_on').removeClass('favorite_off');
						$('#' + id).parent().parent().addClass('red').removeClass('gray');

					} else {

						$('#' + id).attr('data-icon', 'u')
						$('#' + id).addClass('favorite_off').removeClass('favorite_on');

						$('#' + id2).attr('data-icon', 'u')
						$('#' + id2).addClass('favorite_off').removeClass('favorite_on');
						$('#' + id).parent().parent().addClass('gray').removeClass('red');

						var spotid = spot_id;
						//console.log(spotid);

						for (var k = 0; k < $('#spot_holder .spot_link_spot').length; k++) {
							var spot_link_id = $('#spot_holder .spot_link_spot')[k].id;
							var spot_link_href = $('#' + spot_link_id).parent().attr('href');
							//console.log(spot_link_href);
							//console.log($('#'+spot_link_id).parent().attr('href')+':'+spotid);

							if (spot_link_href.match(spotid)) {
								//console.log(spot_link_id);
								var changeid = $('#' + spot_link_id).parent().parent().attr('id');
								$('#' + changeid).removeClass('red').addClass('gray');
								$('#' + changeid.replace('song_spot', 'favorite')).attr('data-icon', 'u');
								$('#' + 'infobox_' + changeid.replace('song_spot', 'favorite')).attr('data-icon', 'u');
							}
						}
					}

				}
				runClickCheck(id, spot_id)

			}

			/////////////////////Sample code for adding items and removing items to local storage///////////////////////////////
			//////////////////////////Add Favorite songs and Favorite Artists//////////////////////////////////////
			//////Add Songtitle, Artist and song id to local storage/////////

			function runClickCheck(id, spot_id) {

				var LStoString = ''
				var LStoStringSplit = ''
				var songhtml = '';
				LS.LSString = '';
				var id2 = '';
				var idhtml = '';
				if (id.match('infobox')) {
					id2 = id.replace('infobox_', '');
					var idr = id2.replace('favorite', '');
				} else {
					var idr = id.replace('favorite', '');
					id2 = '';
				}

				/*if(id.match('_LS'))
				 {
				 id=id.replace('_LS','');
				 }*/

				var idhtml = $('#pinfo' + idr).html() + '$$' + spot_id + '**' + idr + '%%';
				var idsplit = idhtml.split('<br>by ');
				var song = idsplit[0];
				var artist = idsplit[1];
				if ($('#' + id2).length > 0) {

					if ($('#' + id).attr('class').match('on') || ($('#' + id2).attr('class').match('on'))) {

						$('#' + id).removeClass('favorite_on').addClass('favorite_off');
						LStoString = JSON.stringify(localStorage);
						LStoStringSplit = LStoString.split(':"');
						if (LStoStringSplit.length > 1) {
							for (var x = 0; x < LStoStringSplit.length; x++) {
								LS.LSString += LStoStringSplit[x];
							}
						} else {
							LS.LSString = '';
						}

						if (!LS.LSString.replace(/\W/g, '').match(spot_id.replace(/\W/g, ''))) {

							localStorage.setItem('key_song' + (localStorage.length), idhtml);

						}
					} else {
						LStoString = JSON.stringify(localStorage);
						LStoStringSplit = LStoString.split(':"');
						var LSArr = []
						//alert(LStoStringSplit +':'+ idhtml);
						localStorage.removeItem('key_song' + idr);
						localStorage.clear();

						for (var g = 1; g < LStoStringSplit.length; g++) {

							var spotid = LStoStringSplit[g].split('","')[0].split('$$')[1].split('**')[0];
							var idhtmlsplit = idhtml.split('$$')[1].split('**')[0];

							if (idhtmlsplit != spotid) {

								LSArr.push(LStoStringSplit[g].split('%%')[0].split(',')[0])
							}
						}
						for (var t = 0; t < LSArr.length; t++) {

							localStorage.setItem('key_song' + t, LSArr[t]);
						}

					}
				} else {
					if ($('#' + id).attr('class').match('on')) {

						$('#' + id).removeClass('favorite_on').addClass('favorite_off');
						LStoString = JSON.stringify(localStorage);
						LStoStringSplit = LStoString.split(':"');

						if (LStoStringSplit.length > 1) {
							for (var x = 0; x < LStoStringSplit.length; x++) {
								LS.LSString += LStoStringSplit[x];
							}
						} else {
							LS.LSString = '';
						}

						var i = localStorage.length;
						songhtml += idhtml;

						if (!LS.LSString.replace(/\W/g, '').match(spot_id.replace(/\W/g, ''))) {

							localStorage.setItem('key_song' + (localStorage.length), idhtml);
						}
					} else {
						LStoString = JSON.stringify(localStorage);
						LStoStringSplit = LStoString.split(':"');
						LSStr = LStoStringSplit[1];
						var LSArr = []
						//alert(LStoStringSplit +':'+ idhtml);
						localStorage.removeItem('key_song' + idr);
						localStorage.clear();

						for (var g = 1; g < LStoStringSplit.length; g++) {

							var spotid = LStoStringSplit[g].split('","')[0].split('$$')[1].split('**')[0];
							var idhtmlsplit = idhtml.split('$$')[1].split('**')[0];

							if (idhtmlsplit != spotid) {

								LSArr.push(LStoStringSplit[g].split('%%')[0].split(',')[0])
							}
						}
						for (var t = 0; t < LSArr.length; t++) {

							localStorage.setItem('key_song' + t, LSArr[t]);
						}

					}
				}
				addLS();

			}

			function runLS() {
				var favorites = $('.favorite')
				for (var u = 0; u < favorites.length; u++) {
					var fav_title = favorites[u].title;

					for (var n = 0; n < localStorage.length; n++) {

						var spot_link = localStorage.getItem('key_song'+n).split('$$')[1].split('**')[0].replace(/"}/g, '');
						var number = localStorage.getItem('key_song'+n).split('$$')[1].split('**')[1].replace(/"}/g, '').replace('%%', '');

						if (fav_title == spot_link) {
							var fav = ($("div[title=" + spot_link + "]").attr('id'))

							$('#' + fav).addClass('favorite_on').removeClass('favorite_off');
							$('#' + fav).attr('data-icon', 't');
							$('#' + fav).parent().parent().addClass('red').removeClass('gray');
							//console.log($('#'+fav).parent().parent());

						}
					}
				}
			}

			function addLS() {
				var lsspot_arr = [];
				$('#fav_holder').html('');
				$('#fav_holder').append('<div class="spot_icon"  aria-hidden="true" data-icon="t" ></div><div><h4 style="font-size:1.35em;"><span style="color:#979797">Starred</span> Songs</h4></div> <div style="clear:both; margin-bottom:10px;"></div>')
				for (var i = 0; i < localStorage.length; i++) {
						lsspot_arr.push(localStorage.getItem('key_song'+i).split('$$')[1].split('**')[0])
					if (i == (localStorage.length - 1)) {
						if (jQuery.browser.mobile == false && !navigator.userAgent.match('iPad')) {
							$('#fav_holder').append('<iframe theme="light" view="coverart"src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:' + lsspot_arr.toString() + '" frameborder="0" allowtransparency="true" height="80" width="300"></iframe>')
						}
					}
				}
				for (var i = 0; i < localStorage.length; i++) {
					$('#fav_holder').append('<div class="red"><p class="info">' + localStorage.getItem('key_song'+i).split('$$')[0] + '</p><a href="https://embed.spotify.com/?uri=spotify:track:' + localStorage.getItem('key_song'+i).split('$$')[1].split('**')[0] + '" target="_blank"><div class="spot_link_fav" id="spot_LS' + i + '" aria-hidden="true" data-icon="c" style="margin-left:5px;font-size:27px;"></div></a><a><div id="favorite_LS' + i + '" class="spot_link favorite favorite_on" title="' + localStorage.getItem('key_song'+i).split('$$')[1].split('**')[0] + '"  aria-hidden="true" data-icon="t" onclick="addFavorite($(this).attr(\'id\'),$(this).attr(\'title\'))"></div></a><a><div font-size:25px;" onclick=addInfo($(this).attr(\'id\')); id="info_LS' + i + '" class="spot_link information"  aria-hidden="true" data-icon="*"></div></a><div style="clear:both;margin-bottom:-15px;"></div></div>');
				}
			}


			$('#fav_holder').append('<br><br>');