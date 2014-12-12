(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global */

	/*
	*
	* data-size=' { port: { order: 1,  width: min/max/X%, height: min/max/X%, float: left/right/none   } , land: {                               } }'
	*
	*
	*
	*
	* */


	function blockFix () {

		var selector = '.js-block-fix-wrapper',
			width = docElem.clientWidth,
			restWidth = width,
			height = docElem.clientHeight,
			restHeight = height,
			screenPosition = width > height ? 'land' : 'port',
			nodes = doc.querySelectorAll(selector);

		nodes = Array.prototype.slice.call(nodes);

		nodes = nodes.sort(function (a, b) {
			return a.querySelector('div').clientHeight - b.querySelector('div').clientHeight;
		});

		console.log(nodes);




	}

	win.addEventListener('resize', blockFix, false);

	win.blockFix = blockFix;

}(window, document, document.documentElement));