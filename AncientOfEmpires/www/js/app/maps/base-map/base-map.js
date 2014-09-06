(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP */

	win.APP = win.APP || {};

	APP.map = {
		terrainTypes: ['forest', 'green', 'hill', 'road', 'stone', 'water'],
		forest: {
			pathResistance: 1,
			className: 'forest'
		},
		green: {
			pathResistance: 2,
			className: 'green'
		},
		hill: {
			pathResistance: 1,
			className: 'hill'
		},
		road: {
			pathResistance: 1,
			className: 'road'
		},
		stone: {
			pathResistance: 3,
			className: 'stone'
		},
		water: {
			pathResistance: 3,
			className: 'water'
		},
		getSquareByXY: function(map, x, y) {
			return map.terrain['x' + x + 'y'+ y];
		}

	};

}(window, document, document.documentElement));