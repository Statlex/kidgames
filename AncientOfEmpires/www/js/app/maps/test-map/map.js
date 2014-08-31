(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP */

	var type = APP.map.terrainTypes;

	win.testMap = {
		size: {
			width: 20,
			height: 10
		},
		units: [
			{
				constructorName: 'Soldier',
				x: 1,
				y: 1,
				playerId: 1
			},
			{
				constructorName: 'Soldier',
				x: 16,
				y: 4,
				playerId: 2
			}
		],
		terrain: {
			x1y1: type[1],
			x1y2: type[1],
			x1y3: type[1],
			x1y4: type[1],
			x1y5: type[1]
		}

	};

}(window, document, document.documentElement));