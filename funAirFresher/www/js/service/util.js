(function (win, docElem) {

	"use strict";
	/*global window, document */
	/*global APP */

	win.APP = win.APP || {};

	APP.util = {
		setWrapperStyle: function(node) {

			var screenSize = docElem.clientWidth * docElem.clientHeight,
				fontSize = Math.round(16 * Math.pow(screenSize / 181760, 0.5) );

			node.css({
				'font-size': fontSize + 'px'
			});

		}
	};

}(window, document.documentElement));