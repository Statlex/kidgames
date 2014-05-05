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

	console.log($('div').data('test'));
	console.log($('div').data());
	$('div').data('test', 345);
	$('div').data({
		rest: 55,
		ted: '345',
		tt: {
			dd: 45,
			rr: {
				uu: 45
			}
		}
	});

	$('div').data('test3', {rty:456});
	console.log($('div').data('test3'));

//	console.log(bro('div').find('span').remove());

}(window, document, document.documentElement));