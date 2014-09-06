(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
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
				playerId: 1,
				color: 'blue'
			},
			{
				constructorName: 'Soldier',
				x: 16,
				y: 4,
				playerId: 2,
				color: 'red'
			},
			{
				constructorName: 'Archer',
				x: 3,
				y: 1,
				playerId: 1,
				color: 'blue'
			},
			{
				constructorName: 'Archer',
				x: 13,
				y: 4,
				playerId: 2,
				color: 'red'
			},
			{
				constructorName: 'Knight',
				x: 5,
				y: 1,
				playerId: 1,
				color: 'blue'
			},
			{
				constructorName: 'Knight',
				x: 10,
				y: 4,
				playerId: 2,
				color: 'red'
			}

		],
		// terrainTypes: ['forest', 'green', 'hill', 'road', 'stone', 'water'],
		terrain: {
			x1y1: type[0],
			x1y2: type[1],
			x1y3: type[2],
			x1y4: type[3],
			x1y5: type[4],
			x2y5: type[5]
		}

	};

}(window, document, document.documentElement));