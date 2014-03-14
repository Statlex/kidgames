(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */


	win.addEventListener('load', function(){
		var divs = $('div');
		console.log(divs);

		var wind = $(win);
		wind.on('resize', function() {
			console.log(this);
		});
		divs.on('click', function(){
			console.log(this);
		});
		divs.clear();
		console.log(divs);
//		divs.remove();

//		console.log();
	}, false);



}(window, document, document.documentElement));