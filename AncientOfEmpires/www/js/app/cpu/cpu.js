(function (win) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP*/

	function Cpu(data) {

		this.player = data.player;
		this.controller = data.controller;
		this.view = data.view;
	}

	Cpu.prototype = {
		run: function () {

			// 1
			// get all units
			// get player's units
			// get enemy units
			// 2
			// get all no player's farm
			// 3
			// get soldiers and kings which nearest to farm
			// 4
			// all units go to farm
			// if unit can attack -> try to get safe position to attack

			var controller = this.controller,
				player = this.player,
				playerId = player.id,
				util = win.util;

			// 1
			// get all units
			var	playerUnits = [],
				enemyUnits = [];

			util.objForEach(controller.units, function(unit) {
				return unit.playerId === playerId ?
					playerUnits.push(unit) :
					enemyUnits.push(unit);
			});

			// 2
			// get all no player's farm
			var playerBuildings = [],
				noPlayerBuildings = [];

			util.objForEach(controller.buildings, function(build) {
				return build.playerId === playerId ?
					playerBuildings.push(build) :
					noPlayerBuildings.push(build);
			});

			// 3
			// get soldiers and kings which nearest to farm
			playerUnits
				.filter(function(unit) {
					return ~unit.availableActions.indexOf('getBuilding');
				})
				.forEach(function(unit) {

					var pathLength = Infinity;

					noPlayerBuildings.forEach(function(build) {
						var newPathLength = util.getPathLength(util, build);
						pathLength = Math.min(newPathLength, pathLength);
					});

				});

		}
	};

	APP.Cpu = Cpu;

}(window));