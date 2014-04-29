(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	var t = bro(document.querySelector('div'), {rr:'eeererer'});
	console.log(t);

	t = bro('body').append( bro('<div><img src="" alt=""/></div>', {rr:'eeererer'}));
	console.log(t);


	t = bro('<div/>', {test:45677}).appendTo(document.body).addClass('test');
	console.log(t);

	bro('div').on('click', 'span', function(){
		console.log(this);
		console.log(event.data);
		console.log('clicked');
	});

	bro('div span').on('click');

//	console.log(bro('div').find('span').remove());

}(window, document, document.documentElement));