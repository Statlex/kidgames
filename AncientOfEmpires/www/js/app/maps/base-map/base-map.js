(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP */

	win.APP = win.APP || {};

	APP.map = {
		terrainTypes: ['forest', 'green', 'hill', 'road', 'stone', 'water', 'bridge-vertical', 'bridge-horizontal'],
		buildingsTypes: ['farm', 'castle'],
		forest: {
			pathResistance: 2,
			defence: 2,
			className: 'forest'
		},
		green: {
			pathResistance: 1,
			defence: 1,
			className: 'green'
		},
		hill: {
			pathResistance: 2,
			defence: 2,
			className: 'hill'
		},
		road: {
			pathResistance: 0.8,
			defence: 0,
			className: 'road'
		},
		stone: {
			pathResistance: 3,
			defence: 3,
			className: 'stone'
		},
		water: {
			pathResistance: 2,
			defence: 0,
			specialPathResistance: 0.5,
			specialDefence: 2,
			className: 'water'
		},
		'bridge-vertical': {
			pathResistance: 1,
			defence: 0,
			className: 'bridge-vertical'
		},
		'bridge-horizontal': {
			pathResistance: 1,
			defence: 0,
			className: 'bridge-horizontal'
		},
		moneyFrom: {
			farm: 20,
			castle: 30
		},
		healthFrom: {
			farm: 2,
			castle: 3
		},
		default: {
			gold: 1000
		},
		defence: {
			farm: 3,
			castle: 4
		},
		getSquareByXY: function(map, x, y) {
			return map.terrain['x' + x + 'y'+ y];
		}

	};

}(window, document, document.documentElement));