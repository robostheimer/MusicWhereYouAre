function calculateAverage(numbers)
{
	var numbers = numbers.split(':')
	var finalNumber = new Number();
	for (x=0; x<numbers.length; x++)
	{
		var number =parseFloat(numbers[x]);
		
		finalNumber+=number;	
	 
	}
	
	return finalNumber/numbers.length;
	
}

function DoubleSplitter(main_str, split1, split2, index1, index2)
{
	return main_str.split(split1)[index1].split(split2)[index2];
	
}

function LatLongMax(str, multiple)
{
	
	return(parseFloat(str) +multiple)
}

function LatLongMin(str, multiple)
{
	
	return(parseFloat(str) -multiple)
}


function addError()
{
$('#map-canvas').html('<p style="margin:15px;">Add either a city and state abbreviation (Make sure to add a comma between the city and the State Abbreviation) or just the state abbreviation to the form above. Please check your spelling if you continue to receive this message.  For now, this project is only usable to find artist in the United States.</p>');
	
}

function cleanStr(str, character, replacer)
{
	if(replacer == undefined)
	{
		replacer="";
	}
	return str.replace(character, replacer);
}
