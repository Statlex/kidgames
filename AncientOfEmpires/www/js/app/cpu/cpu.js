(function (win) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP*/

	function Cpu(data) {

		this.player = data.player;
		this.controller = data.controller;
		this.view = data.view;
	}

	function Scenario(data) {
		this.xy = data.xy || {};
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

				var startCoordinates = { x: unit.x, y: unit.y},
					// get available coordinate
					availablePath = unit.getAvailablePath(controller),
					// array for all scenarios
					scenarios = [],
					// available actions list
					availableActions = ['none'].concat(unit.availableActions);

				// add current coordinates
				availablePath.push(startCoordinates);

				// move to every availablePath
				availablePath.forEach(function(xy) {

					// main concept -> what to do on this xy

					availableActions.forEach(function(action) {

						unit.x = xy.x;
						unit.y = xy.y;

						// count probably received damage
						var probablyReceivedDamage = 0;

						// count armor ty terrain type
						var terrainArmor = 0;

						switch (action) {

							case 'none':

								// xy = xy
								// action = none



								//scenarios.push(new Scenario({ xy: xy }));

								// get unit who can attack and count damage received by every units
								var availableReceivedDamage = 0;
								enemyUnits.filter(function (enemyUnit) {
										// get units who can attack
										return (enemyUnit.findUnitsUnderAttack(controller.units) || []).indexOf(unit) !== -1;
									})
									.forEach(function(enemyUnit){
										availableReceivedDamage += enemyUnit.getAvailableGivenDamage(unit, controller);
									});





								break;

							case 'attack':

								var canAttackedUnits = unit.findUnitsUnderAttack(controller.units) || [];

								canAttackedUnits.forEach(function(enemyUnit) {

									var scenario = new Scenario({ xy: xy });

									// use findUnitsUnderAttack for enemy unit

									// get given and received damage

								});


								//console.log(canAttackedUnits);


								break;

							case 'getBuilding':




								break;

							case 'upBones':




								break;

						}



					});

				});

				// set start state
				unit.x = startCoordinates.x;
				unit.y = startCoordinates.y;


				// rate better scenarios



			});


		}

	};

	APP.Cpu = Cpu;

}(window));