$(document).ready(function() {
	
	// total number of backgrounds in folder
	var totalCount = 7; 
	// will store name of images
	var backgrounds = []; 
	
	/* Load names into array*/
	for (var i = 1; i <= totalCount; i++) {
		backgrounds.push('background'+i+'.jpg');
	}

	// Get a random background
	var bg = backgrounds[Math.floor(Math.random() * totalCount)];
	// Store path of backgrounds folder
	var path = 'img/backgrounds/'; 

	// Set background image
	$('img.bg').attr('src', path+bg);
});