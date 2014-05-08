function calculateAverage(numbers) {
	var numbers = numbers.split(':')
	var finalNumber = new Number();
	for ( x = 0; x < numbers.length; x++) {
		var number = parseFloat(numbers[x]);

		finalNumber += number;

	}

	return finalNumber / numbers.length;

}

function DoubleSplitter(main_str, split1, split2, index1, index2) {
	return main_str.split(split1)[index1].split(split2)[index2];

}

function LatLongMax(str, multiple) {

	return (parseFloat(str) + multiple);
}

function LatLongMin(str, multiple) {

	return (parseFloat(str) - multiple);
}

function addError() {
	$('#map-canvas').html('<p style="margin:15px;">Add either a city and state abbreviation (Make sure to add a comma between the city and the State Abbreviation) or just the state abbreviation to the form above. Please check your spelling if you continue to receive this message.  For now, this project is only usable to find artist in the United States.</p><p>If you have selected a specific genre and are receiving this message, it is likely that in the location you are searching, there are not artists that meet that generic criteria.</p>');

}

function cleanStr(str, character, replacer) {
	if (replacer == undefined) {
		replacer = "";
	}
	return str.replace(character, replacer);
}

function qsParser(str) {
		
		var str = str.replace(/\w\S*/g, function(txt) {
			
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
		
		var qs1Split = str.split('_');
		var qs_final='';
		for(var p=0; p<qs1Split.length; p++)
		{
			var qs_1=	qs1Split[p][0].toUpperCase();
			qs_final+=qs_1+qs1Split[p].slice(1,qs1Split[p].length)+'_';
			
		}
		str = qs_final.slice(0,(qs_final.length-1));
		//str = str.replace(/ /g,'');
		str=str.replace(/_/g, ' ');
		return str;

}

function replacePatterns(str) {
	str = str.replace(/_/g, ' ');
	str = str.replace(/St. /i, 'Saint ');
	str = str.replace(/St /i, 'Saint ');
	str = str.replace(/New York\+/i, 'New York City+NY+us');

	return str;
}

function runUrlEncoder(word) {
	console.log(word);	
	word = word.replace(/&amp;/g, '%26');
	word = word.replace(/&/g, '%26');
	
	
	return word;
}

function textSlicer(text, numchar) {
	var slice_text = text.slice(numchar, text.length);

	var text_index = slice_text.indexOf('.');
	var final_text = text.slice(0, (numchar + text_index + 1));
	return final_text;

}

function splitParans(str)
{
	
var parans = (str.indexOf('('));
str = str.slice(0, parans);
return str;
}


