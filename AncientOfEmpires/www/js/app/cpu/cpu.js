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
			// detect action for every unit

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
			// detect action for every unit
			playerUnits.forEach(function(unit) {

				// get available coordinate
				var availablePath = unit.getAvailablePath(controller)
						// add current coordinates
						.splice(0, 0, { x: unit.x, y: unit.y }),
					scenarios = [];

				// move to every availablePath
				availablePath.forEach(function(xy) {

					// main concept -> what to do on this xy

					// 1 move to
					// 2 get available action
					// 3.1 execute available action
					// 3.2 NO execute available action
					// 4 rate result

				});

			});

		}

	};

	APP.Cpu = Cpu;

}(window));