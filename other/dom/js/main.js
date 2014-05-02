(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */



	console.log($('body').css({
		top: '30px',
		position: 'fixed'
	}));

	$('div').on('click', 'span', {rr:66}, function(){
		console.log(this);
		console.log(event.data);
	});

	setTimeout(function(){
		$('div span').on('click');
	},1000);

	setTimeout(function(){
		$('div span').on('click', {ee:55});
//		$('div span').off();
	},2000);

	setTimeout(function(){
		$('div span').on('click', {rr:55});
	},3000);


//	console.log(bro('div').find('span').remove());

}(window, document, document.documentElement));