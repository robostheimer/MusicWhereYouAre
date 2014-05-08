///Script to alert that user is on tablet or smart phone; used because spotify doesn't work great on Tablets and phone/////////////

(function(a) {
		(jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
	})(navigator.userAgent || navigator.vendor || window.opera);

// For use within iPad developer UIWebView
// Thanks to Andrew Hedges!
var map = {};
var LS = {};

map.markerArr = [];
map.map_range = [];

map.style = '';
map.city = '';

LS.LSString = '';

/////////Changes UI based on hash w/o page reload
function historyLoad(hash) {
	
	if (hash) {
		console.log(hash);
		map.states = 'AL-Alabama,AK-Alaska,AZ-Arizona,AR-Arkansas,CA-California,CO-Colorado,CT-Connecticut,DE-Delaware,FL-Florida,GA-Georgia,H-IHawaii,ID-Idaho,IL-Illinois,IN-Indiana,IA-Iowa,KS-Kansas,KY-Kentucky,LA-Louisiana,ME-Maine,MD-Maryland,MA-Massachusetts,MI-Michigan,MN-Minnesota,MS-Mississippi,MO-Missouri,MT-Montana,NE-Nebraska,NV-Nevada,NH-New Hampshire,NJ-New Jersey,NM-New Mexico,NY-New York,NC-North Carolina,ND-North Dakota,OH-Ohio,OK-Oklahoma,OR-Oregon,PA-Pennsylvania,RI-Rhode Island,SC-South Carolina,SD-South Dakota,TN-Tennessee,TX-Texas,UT-Utah,VT-Vermont,VA-Virginia,WA-Washington,WV-West Virginia,WI-Wisconsin,WY-Wyoming,DC-Washington DC';
map.statesSplit = map.states.split(',')	
					for (var o=0; o<map.statesSplit.length; o++)
					{
							
						if(map.statesSplit[o].match(hash.split('&&')[0].replace(/_/g, ' ')))
						{
							map.stateAB = map.statesSplit[o].split('-')[0]
							map.state = map.statesSplit[o].split('-')[1];
							
						}
					}
	
		$('#spot_holder').html('<div class="spot_icon"  aria-hidden="true" data-icon="T" ></div><div id="spot_headline"><h4><span style="color:#979797">Your</span> GeoMix</h4>  </div><div>  <div style="clear:both; margin-bottom:10px;"></div>');
		map.hash=hash;
		if (hash.match('style=')) {

			
			var hash1 = hash.split('&&')[0];
			var hash1 = hash + '+us';
			var hash2 = hash.split('&&')[1]
			hash1 = replacePatterns(hash1);
			/////Closure Example////////
			function dealWithStyles() {
				var styles = hash2
				var stylesArr = styles.split('%%%');
				$('.genre').removeClass('on').addClass('off');
				$('.genre').parent().removeClass('on').addClass('off');
				for (var t = 0; t < stylesArr.length - 1; t++) {
					if (stylesArr.length > 0) {
						
						var style = stylesArr[t].replace(/&style=/g,'__');
						style = style.replace(/ /g, '_');
						style = style.replace(/style=/g,'');
						if(style[1] == '_')

						{
							style=style.slice(2,style.length);
						}
						$('#' + style).removeClass('off').addClass('on');
						$('#' + style).parent().removeClass('off').addClass('on');
						
					} 
				}
				map.style = styles;
				Hasher(hash1 + hash2);
			}
			dealWithStyles();
			
		} else {
			var hash = hash = hash + '+us';
			$('.genre').removeClass('on').addClass('off');
			$('.genre').parent().removeClass('on').addClass('off');
			map.style='';
			Hasher(hash);
		}

	} else if (hash == "") {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_errors);
		} else {
			$('#geolocation_alert').show();
			$('#geolocation_alert').html('<p>Choose a City and State from the form below or enable geolocation on your device.</p>');

		}
	}
	

}

////////////////////////Loads page by starting the history. init function.  Also sets up clicks for genre, favorite and playlist buttons/////////////
$(document).ready(function() {

	$.history.init(historyLoad);
		
	$('.button').click(genrePicker);

	$('.open_div').click(function() {
		$('#genre_holder').animate({
			width : 'toggle'
		});
		$('#info-area').slideUp('fast');
		$('.hider').fadeIn('1200');
		if ($('.open_div').attr('data-icon') == 'W') {
			$('.open_div').attr('data-icon', '$')
			$('.open_div_spot').css({
				'font-size' : '30px'
			});

			$('.open_div_spot').attr('data-icon', 'T')
			$('.open_div_spot').css({
				'font-size' : '30px'
			});

			$('.open_div_fav').attr('data-icon', 't');
			$('.open_div_fav').css({
				'font-size' : '28px'
			});
			$('#spot_holder').hide();
			$('#fav_holder').hide();
		} else {
			$('.open_div').attr('data-icon', 'W');
			$('.open_div').css({
				'font-size' : '28px'
			});
		}

	});

	$('.open_div_spot').click(function() {
		$('#spot_holder').animate({
			width : 'toggle'
		});
		$('#info-area').slideUp('fast');
		$('.hider').fadeOut('1200');

		if ($('.open_div_spot').attr('data-icon') == 'T') {
			$('.open_div_spot').attr('data-icon', '$')
			$('.open_div_spot').css({
				'font-size' : '30px'
			});

			$('.open_div_fav').attr('data-icon', 't')
			$('.open_div_fav').css({
				'font-size' : '28px'
			});

			$('.open_div').attr('data-icon', 'W');
			$('.open_div').css({
				'font-size' : '28px'
			});
			$('#genre_holder').hide();
			$('#fav_holder').hide();
		} else {
			$('.open_div_spot').attr('data-icon', 'T');
			$('.open_div_spot').css({
				'font-size' : '33px'
			});

		}
	});
	$('.open_div_fav').click(function() {
		$('#fav_holder').animate({
			width : 'toggle'
		});
		$('#info-area').slideUp('fast');
		$('.hider').fadeOut('1200');

		if ($('.open_div_fav').attr('data-icon') == 't') {
			$('.open_div_fav').attr('data-icon', '$')
			$('.open_div_fav').css({
				'font-size' : '30px'
			});

			$('.open_div').attr('data-icon', 'W')
			$('.open_div').css({
				'font-size' : '28px'
			});
			$('#genre_holder').hide();
			$('#spot_holder').hide();

			$('.open_div_spot').attr('data-icon', 'T')
			$('.open_div_spot').css({
				'font-size' : '33px'
			});
		} else {
			$('.open_div_fav').attr('data-icon', 't')
			$('.open_div_fav').css({
				'font-size' : '28px'
			});

		}
	});
	$('.close_div_info').click(function() {
		$('#info-area').slideUp('slow')
	})
});

function handle_geolocation_query(position) {
	map.currentLat = (position.coords.latitude + .05);
	map.currentLong = (position.coords.longitude + .05);
	map.currentLatRange = (map.currentLat - .05);
	map.currentLongRange = (map.currentLong - .05)
	var json = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+CityName%2C+StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+Lat+<=+" + map.currentLat + "+AND+Lat>=" + map.currentLatRange + "+AND+Long<=" + map.currentLong + "+AND+Long>=" + map.currentLongRange + "&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
	$.getJSON(json, function(response) {
		if (response.rows == null) {
			$('#map-canvas').html('<p style="margin:15px;">Add city and state (Make sure to add a comma between the city and state) or just the state to the form above. Please check your spelling if you continue to receive this message.  For now, this project is only usable to find artist in the United States.</p>');

		};
		map.hash = response.rows[0].toString().toLowerCase().replace(",", '+');
		map.hash = map.hash.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
		window.location.hash = map.hash;

	});
}

function handle_errors(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			$('#geolocation_alert').html('<p>Choose a City and State from the form below or enable geolocation on your device.</p>')
			break;

		case error.POSITION_UNAVAILABLE:
			$('#geolocation_alert').html("<p>We could not detect current position</p>");
			break;

		case error.TIMEOUT:
			$('#geolocation_alert').html("<p> There was a server timeout.");
			break;

		default:
			$('#geolocation_alert').html("There was an unknown error.");
			break;
	}
}

function genrePicker()
{
		
		var id = $(this).attr('id');
		
		var hashy = '';
		var arr = [];
		var genres = $('.genre');

		if ($('#' + id +' .genre').attr('class').match(' on')) {
			
			$('#' + id +' .genre').removeClass('on').addClass('off');
			//$(this).parent().removeClass('on').addClass('off');
			for (var x = 0; x < $('.genre').length; x++) {

				var genre = $(genres[x]);
				
				if (genre.hasClass('on')) {
					var pusher = genre.attr('id').replace(/__/g, '&style=');
					arr.push('&style=' + pusher.replace(/_/g, ' ')+'%%%');
				}
			}
		} else if (!$('#' + id +' .genre').attr('class').match(' on')) {
			$('#' + id +' .genre').removeClass('off').addClass('on');
			//$(this).parent().removeClass('off').addClass('on');
			var id =$(this).attr('id');
				
			for (var x = 0; x < $('.genre').length; x++) {
				var genre = $(genres[x]);

				if (genre.hasClass('on')) {
					var pusher = genre.attr('id').replace(/__/g, '&style=');
					arr.push('&style=' + pusher.replace(/_/g, ' ')+'%%%');
					

				}
			}
		}

		map.style = '';
		hashy = window.location.hash.split('&')[0]
		map.style = arr.toString().replace(/,/g, '') + '&';

		hashy = hashy + '&' + map.style;
		
		///////////Adds the items from local storage to the UI////////////
		runLS();
		

		window.location.hash = hashy;
	}	
	


