(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP */

	var terra = APP.map.terrainTypes,
		build = APP.map.buildingsTypes;

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

		buildings: [
			{
				type: build[0],
				x: 1,
				y: 2
			},
			{
				type: build[1],
				x: 2,
				y: 3
			}
		],
		// terrainTypes: ['forest', 'green', 'hill', 'road', 'stone', 'water'],
		terrain: {
			x1y1: terra[0],
			x1y2: terra[1],
			x1y3: terra[2],
			x1y4: terra[3],
			x1y5: terra[4],
			x2y5: terra[5]
		}

	};

}(window, document, document.documentElement));