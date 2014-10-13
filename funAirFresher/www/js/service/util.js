(function (win, docElem) {

	"use strict";
	/*global window, document */
	/*global APP */

	win.APP = win.APP || {};

	APP.util = {
		setWrapperStyle: function(node) {

			console.log('!!!! --- 181760 - get Math.pow(0.5) !!!!!!!');

			var screenSize = docElem.clientWidth * docElem.clientHeight,
				fontSize = Math.round(16 * screenSize / 181760 );

			node.css({
				'font-size': fontSize + 'px'
			});

		}
	};

}(window, document.documentElement));