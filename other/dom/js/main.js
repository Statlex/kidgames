(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	var t = bro(document.querySelector('div'), {rr:'eeererer'});
	console.log(t);

	t = bro('body').append( bro('<div><img src="" alt=""/></div>', {rr:'eeererer'}));
	console.log(t);


	t = bro('<div/>', {test:45677}).appendTo(document.body);
	console.log(t);
//	console.log(bro.bar);



}(window, document, document.documentElement));