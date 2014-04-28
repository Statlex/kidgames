(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	console.log($('div').attr('bind'));
	console.log(bro(document.querySelectorAll('div')).attr('test',45));
	console.log(bro('<div/>', {test:34,test2:44}));

//	console.log(bro.bar);



}(window, document, document.documentElement));