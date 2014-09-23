(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP */

	win.APP = win.APP || {};

	APP.map = {
		terrainTypes: ['forest', 'green', 'hill', 'road', 'stone', 'water', 'bridge-vertical', 'bridge-horizontal'],
		buildingsTypes: ['farm', 'castle'],
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
		bridgeVertical: {
			pathResistance: 1,
			className: 'bridge-vertical'
		},
		bridgeHorizontal: {
			pathResistance: 1,
			className: 'bridge-horizontal'
		},
		moneyFrom: {
			farm: 20,
			castle: 40
		},
		default: {
			gold: 1000
		},
		getSquareByXY: function(map, x, y) {
			return map.terrain['x' + x + 'y'+ y];
		}

	};

}(window, document, document.documentElement));