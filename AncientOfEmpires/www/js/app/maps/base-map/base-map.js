(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP */

	win.APP = win.APP || {};

	APP.map = {
		terrainTypes: ['gross', 'stone', 'road'],
		road: {
			pathResistance: 1
		},
		gross: {
			pathResistance: 2
		},
		stone: {
			pathResistance: 3
		},
		getSquareByXY: function(map, x, y) {
			return map.terrain['x' + x + 'y'+ y];
		}

	};

}(window, document, document.documentElement));