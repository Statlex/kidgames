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
		this.attr = {};
		this.extendSelf(data);
	}

	Scenario.prototype = {
		extendSelf: function (data) {
			var key;
			for (key in data) {
				if (data.hasOwnProperty(key)) {
					this.attr[key] = data[key];
				}
			}

			return this;

		},

		set: function (key, value) {
			this.attr[key] = value;
			return this;
		},

		get: function (key) {
			return this.attr[key];
		},

		execute: function (unit, controller) {

			// move to xy
			var endX = this.get('x'),
				endY = this.get('y');

			if (unit.x !== endX || unit.y !== endY) {
				console.log('move to', unit.type, unit.x, '->', endX, unit.y, '->', endY);
				unit
					.moveTo({
						x: endX, y: endY
					}, controller);

				controller.view.moveUnit(unit);
			}

			if (this.get('type') === 'none') {

				unit.setEndTurn();
				controller.wispAction();
				controller.view.showEndUnitTurn(unit);
				return;
			}


		}

	};


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

						var
							// count probably received damage
							availableReceiveDamage = 0,
							// is unit stay on build
							withBuilding = controller.getDefByBuilding(unit),
							// count armor by place type - include terrain type and building
							placeArmor = withBuilding || controller.getDefByTerrain(unit),
							nearestNoPlayerBuilding = unit.getNearestNoPlayerBuilding(controller);

						switch (action) {

							case 'none':

								// get unit who can attack and count damage received by every units
								availableReceiveDamage = 0;
								enemyUnits
									.filter(function (enemyUnit) {
										// get units who can attack
										return (enemyUnit.findUnitsUnderAttack(controller.units) || []).indexOf(unit) !== -1;
									})
									.forEach(function (enemyUnit) {
										availableReceiveDamage += enemyUnit.getAvailableGivenDamage(unit, controller);
									});

								scenarios.push(new Scenario({
									x: xy.x,
									y: xy.y,
									type: action,
									availableReceiveDamage: availableReceiveDamage,
									withBuilding: withBuilding,
									placeArmor: placeArmor,
									nearestNoPlayerBuilding: nearestNoPlayerBuilding
								}));

								break;

							case 'attack':

								//var canAttackedUnits = unit.findUnitsUnderAttack(controller.units) || [];
								//
								//canAttackedUnits.forEach(function(enemyUnit) {
								//
								//	var scenario = new Scenario({ xy: xy });
								//
								//	// use findUnitsUnderAttack for enemy unit
								//
								//	// get given and received damage
								//
								//});
								//

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


				// only for test - begin
				scenarios = scenarios.sort(function (a, b) {
					return a.get('nearestNoPlayerBuilding').pathLength - b.get('nearestNoPlayerBuilding').pathLength;
				});

				var endScenario = scenarios[0];

				endScenario.execute(unit, controller);

				// only for test - end



				// rate better scenarios

			});


		}

	};

	APP.Cpu = Cpu;

}(window));