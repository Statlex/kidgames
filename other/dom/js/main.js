(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	var divs = $('div');

	divs.on('rerere1', function(){
		console.log('////');
	});

	divs.on('mousemove', function(e){
		console.log(e);
	});



	divs.off();


	console.log(divs);

	divs.css('height', '200px');


}(window, document, document.documentElement));