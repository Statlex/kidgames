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
				//console.log('move to', unit.type, unit.x, '->', endX, unit.y, '->', endY);
				unit
					.moveTo({
						x: endX, y: endY
					}, controller);

				controller.view.moveUnit(unit);
			}

			switch ( this.get('type') ) {

				case 'none':

					unit.setEndTurn();

					controller.wispAction();
					controller.view.showEndUnitTurn(unit);

					break;

				case 'attack':

					controller.attackUnit(unit, controller.getUnitBy({
						unitId: this.get('enemyUnitId'),
						playerId: this.get('enemyPlayerId')
					}));

					controller.view.hideUnitsUnderAttack();

					controller.wispAction();
					controller.view.showEndUnitTurn(unit);

					break;

				case 'getBuilding':

					console.log(unit, 'getBuilding');

					unit.getBuilding(controller);

					controller.view.hideGetBuilding();

					controller.wispAction();
					controller.setStoreButtonStateForActivePlayer();

					unit.setEndTurn();
					controller.view.showEndUnitTurn(unit);

					break;

				case 'upBones':

					controller.upBonesFromGrave(unit, this.get('grave'));

					controller.wispAction();
					unit.setEndTurn();
					controller.view.showEndUnitTurn(unit);

					break;

			}


		},
		buildingTypeValue: {
			default: 0,
			farm: 5,
			castle: 10
		},
		getBuildingSortValue: function (buildingType) {
			return this.buildingTypeValue[buildingType] || 0; // see this this.buildingTypeValue.default
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
				util = win.util,
				playerUnits = [];

			util.objForEach(controller.units, function(unit) {
				return unit.playerId === playerId && playerUnits.push(unit);
			});

			// 3
			// detect action for every unit
			playerUnits.forEach(function(unit) {

				// collect enemy units
				var enemyUnits = [];
				util.objForEach(controller.units, function(unit) {
					return unit.playerId !== playerId && enemyUnits.push(unit);
				});

				// collect building
				var playerBuildings = [],
					noPlayerBuildings = [];
				util.objForEach(controller.buildings, function(build) {
					return build.playerId === playerId ?
						playerBuildings.push(build) :
						noPlayerBuildings.push(build);
				});


				var startCoordinates = { x: unit.x, y: unit.y },
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
							// building which can be owned
							building,
							// count probably received damage
							availableReceiveDamage = 0,
							// count probably given damage
							availableGivenDamage = 0,
							// count probably response damage from enemy attacked unit
							availableResponseDamage = 0,
							// is unit stay on build
							withBuilding = controller.getDefByBuilding(unit),
							// count armor by place type - include terrain type and building
							placeArmor = withBuilding || controller.getDefByTerrain(unit),
							nearestNoPlayerBuilding = unit.getNearestNoPlayerBuilding(controller);

						// get unit who can attack and count damage received by every units
						enemyUnits
							.forEach(function (enemyUnit) {
								if ( (enemyUnit.findUnitsUnderAttack(controller.units) || []).indexOf(unit) === -1 ) {
									return;
								}
								availableReceiveDamage += enemyUnit.getAvailableGivenDamage(unit, controller);
							});

						switch (action) {

							case 'none':

								scenarios.push(new Scenario({
									x: xy.x,
									y: xy.y,

									type: action,
									availableReceiveDamage: availableReceiveDamage,
									availableGivenDamage: availableGivenDamage,
									availableResponseDamage: availableResponseDamage,
									withBuilding: withBuilding,
									placeArmor: placeArmor,
									nearestNoPlayerBuilding: nearestNoPlayerBuilding
								}));

								break;

							case 'attack':

								(unit.findUnitsUnderAttack(controller.units) || []).forEach(function(enemyUnit) {

									availableGivenDamage = unit.getAvailableGivenDamage(enemyUnit, controller);

									if ( (enemyUnit.findUnitsUnderAttack(controller.units) || []).indexOf(unit) !== -1 ) {
										availableResponseDamage = enemyUnit.getAvailableGivenDamage(unit, controller, availableGivenDamage);
									}

									scenarios.push(new Scenario({
										enemyUnitId: enemyUnit.id,
										enemyPlayerId: enemyUnit.playerId,

										x: xy.x,
										y: xy.y,
										type: action,
										availableReceiveDamage: availableReceiveDamage,
										availableGivenDamage: availableGivenDamage,
										availableResponseDamage: availableResponseDamage,
										withBuilding: withBuilding,
										placeArmor: placeArmor,
										nearestNoPlayerBuilding: nearestNoPlayerBuilding
									}));

								});
								//

								//console.log(canAttackedUnits);


								break;

							case 'getBuilding':

								// get building by XY
								building = controller.buildings['x' + xy.x + 'y' + xy.y];

								if ( building && building.playerId !== unit.playerId && util.has(unit.availableBuildingsType, building.type) ) {

									scenarios.push(new Scenario({
										getBuilding: building.type,

										x: xy.x,
										y: xy.y,
										type: action,
										availableReceiveDamage: availableReceiveDamage,
										availableGivenDamage: availableGivenDamage,
										availableResponseDamage: availableResponseDamage,
										withBuilding: withBuilding,
										placeArmor: placeArmor,
										nearestNoPlayerBuilding: nearestNoPlayerBuilding
									}));

								}

								break;

							case 'upBones':

								(unit.findGravesForUp(controller.unitsRIP, controller.units) || []).forEach(function (grave) {

									scenarios.push(new Scenario({
										grave: {
											x: grave.x,
											y: grave.y,
											lifeAfterDeadLength: grave.lifeAfterDeadLength
										},
										x: xy.x,
										y: xy.y,
										type: action,
										availableReceiveDamage: availableReceiveDamage,
										availableGivenDamage: availableGivenDamage,
										availableResponseDamage: availableResponseDamage,
										withBuilding: withBuilding,
										placeArmor: placeArmor,
										nearestNoPlayerBuilding: nearestNoPlayerBuilding
									}));

								});

								break;

						}



					});

				});

				// set start state
				unit.x = startCoordinates.x;
				unit.y = startCoordinates.y;

				// only for test - begin
				//scenarios = scenarios.sort(function (a, b) {
				//	return a.get('nearestNoPlayerBuilding').pathLength - b.get('nearestNoPlayerBuilding').pathLength;
				//});

				var needSort;

				// damage test
				scenarios = scenarios.sort(function (a, b) {
					return b.get('availableGivenDamage') - a.get('availableGivenDamage');
				});

				if (unit.availableActions.indexOf("getBuilding") !== -1) {

					needSort = scenarios.filter(function(scenario){
						return scenario.get('getBuilding');
					}).length;

					if (needSort) {
						scenarios = scenarios.sort(function (a, b) {
							return b.getBuildingSortValue(b.get('getBuilding')) - a.getBuildingSortValue(a.get('getBuilding'));
						});
					}

				}

				if (unit.availableActions.indexOf("upBones") !== -1) {

					needSort = scenarios.filter(function(scenario){
						return scenario.get('grave');
					}).length;

					if (needSort) {
						scenarios = scenarios.sort(function (a, b) {
							return Number( !!b.get('grave') ) - Number( !!a.get('grave') );
						});
					}

				}

				scenarios[0].execute(unit, controller);
				// only for test - end

				// rate better scenarios

			});


		}

	};

	APP.Cpu = Cpu;

}(window));