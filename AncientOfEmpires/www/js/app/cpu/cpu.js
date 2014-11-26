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
		this.rate();
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

		rateCost: {

			getBuilding: {
				farm: 10,
				castle: 15
			},
			upBones: 10,
			q: {
				availableReceiveDamage: -0.5,
				availableGivenDamage: 2,
				availableResponseDamage: -0.5,
				placeArmor: 0.5,
				nearestNoPlayerBuilding: -1.5
			},
			withBuilding: 2

		},

		rate: function() {

			var xyStr,
				rate = 0,
				key,
				value,
				data = this.get(),
				rateCost = this.rateCost,
				enemyAvailableActions = this.get('enemyAvailableActions'),
				deniedPlacesForGetBuilding = this.get('deniedPlacesForGetBuilding');

			for (key in data) {
				if (data.hasOwnProperty(key)) {

					value = data[key];

					switch (key) {

						case 'availableReceiveDamage':
							rate += value * rateCost.q[key];
							break;

						case 'availableGivenDamage':
							rate += value * rateCost.q[key];
							break;

						case 'availableResponseDamage':
							rate += value * rateCost.q[key];
							break;

						case 'withBuilding':

							xyStr = 'x' + data.x + 'y' + data.y;

							if ( !enemyAvailableActions[xyStr] ) { // no enemy action on this place
								value = 0;
							} else {
								if (!enemyAvailableActions[xyStr].building) {
									value /=2;
								}
							}

							rate += value ? rateCost[key] : 0;
							break;

						case 'placeArmor':
							rate += value * rateCost.q[key];
							break;

						case 'nearestNoPlayerBuilding':
							rate += value.pathLength * rateCost.q[key];
							break;

						case 'getBuilding':

							rate += rateCost[key][value];

							break;

						case 'grave':
							rate += rateCost.upBones;

							break;

					}

				}
			}

			// check for deniedPlacesForGetBuilding
			if (deniedPlacesForGetBuilding['x' + data.x + 'y' + data.y]) {
				rate = -Infinity;
			}

			this.set('rate', rate);

		},

		set: function (key, value) {
			this.attr[key] = value;
			return this;
		},

		get: function (key) {
			return key !== undefined ? this.attr[key] : this.attr;
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

					unit.getBuilding(controller);

					controller.view.hideGetBuilding();

					controller.wispAction();
					//controller.setStoreButtonStateForActivePlayer();

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
				playerUnits = [],
				availableGetBuilding = this.getAvailableGetBuilding({
					player: player,
					controller: controller
				}),
				availableGetGrave = this.getAvailableGetGrave({
					player: player,
					controller: controller
				}),
				enemyAvailableActions = this.getEnemyAvailableActions({
					player: player,
					controller: controller
				});

			console.log(enemyAvailableActions);

			util.objForEach(controller.units, function(unit) {
				return unit.playerId === playerId && playerUnits.push(unit);
			});

			if ( Object.keys(availableGetBuilding).length ) {
				// unit who can get building - step in last order
				playerUnits.sort(function (a) {
					return a.availableBuildingsType ? Infinity : -Infinity;
				});
			}

			if (availableGetGrave.length) {
				playerUnits.sort(function (a) {
					return a.availableActions.indexOf('upBones') !== -1 ? -Infinity : Infinity;
				});
			}

			// 3
			// detect action for every unit
			playerUnits.forEach(function(unit) {

				var deniedPlacesForGetBuilding = unit.availableBuildingsType ? {} : availableGetBuilding;

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
									nearestNoPlayerBuilding: nearestNoPlayerBuilding,
									deniedPlacesForGetBuilding: deniedPlacesForGetBuilding,
									enemyAvailableActions: enemyAvailableActions
								}));

								break;

							case 'attack':

								(unit.findUnitsUnderAttack(controller.units) || []).forEach(function(enemyUnit) {

									if ( (unit.type !== 'Catapult') || (unit.x === startCoordinates.x && unit.y === startCoordinates.y)) {

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
											nearestNoPlayerBuilding: nearestNoPlayerBuilding,
											deniedPlacesForGetBuilding: deniedPlacesForGetBuilding,
											enemyAvailableActions: enemyAvailableActions
										}));

									}

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
										nearestNoPlayerBuilding: nearestNoPlayerBuilding,
										deniedPlacesForGetBuilding: deniedPlacesForGetBuilding,
										enemyAvailableActions: enemyAvailableActions
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
										nearestNoPlayerBuilding: nearestNoPlayerBuilding,
										deniedPlacesForGetBuilding: deniedPlacesForGetBuilding,
										enemyAvailableActions: enemyAvailableActions
									}));

								});

								break;

						}



					});

				});

				// set start state
				unit.x = startCoordinates.x;
				unit.y = startCoordinates.y;


				// ok
				// оценить каждый сцейнарий - сценарий сам себе даёт оценку при илициализации
				// к примеру, за захват здания давать 10 очков
				// поднять скилета - тоже 10 очков
				// также давать очки за то что ходит по защищённым клеткам
				// за наносимый дамаг - столько очков сколько дамага, тоже самое и для получаемого дамага
				// так же давайть очки за продвижение к не занятому зданию
				// так же очки за то что стал на здание

				// доп правила - сделано getAvailableGetBuilding
				// 1 - если есть солдат который может занять сдание, и текущий воин НЕ может занят дание, то уйти со здания или не занимать здание;
				// засетить этому сценарию минус инфинити

				// 1.1 - сделано - тоже самое сделать с магилами, если есть магила, то маг ходит первым что бы поднять скилетов

				// 2 - сделано вместе с п1 и п1.1 если рядом есть враг (рацарь или солдат) который может захватить сдание, не уходить со здания
				// рассматривать только те сценарии где юнит не менят позицию

				// 3 и 4 - придумать как будут ходить висп и катапульта - придумано

				// 5 продумать оборону замка - сделано - ибо не очень сложно прорваться через абарону и захватить замок
				// или же поменять правила, выйгрышь не по захвату замка, а по захвату всех-всех зданий

				// при принятии конечного решения, проверить, не противоречит сценарий какому либо из правил
				// если противоречит - то занизить рейтиг сценнария до нуля

				// 5.5 - сделано - не начислять очки за то что бот стоит на здании если его не может захватить или занять противник

				// 6 - научить бота покупать войска
				// 6.1 - в вк есть группа по АОЕ и там есть несколько стратегий
				// 7 - при клике на замок при возможности переходить в магаз
				// 8 - при покупке юнита ставить на наиболее близкое место к замку где была покупка



				scenarios = scenarios.sort(function(a, b){
					return b.get('rate') - a.get('rate');
				});

				scenarios[0].execute(unit, controller);
				// only for test - end

			});


		},
		getAvailableGetBuilding: function (data) {

			var player = data.player,
				playerId = player.id,
				controller = data.controller,
				allUnits = controller.units,
				playerUnits = [],
				canGetBuildingUnits = [],
				canNotGetBuildingUnits = [],
				availableGetBuilding = {},
				key, unit,
				util = win.util;

			for (key in allUnits) {
				if (allUnits.hasOwnProperty(key)) {
					unit = allUnits[key];
					if (unit.playerId === playerId) {
						playerUnits.push(unit);
					}
				}
			}

			playerUnits.forEach(function (unit) {
				return unit.availableBuildingsType ? canGetBuildingUnits.push(unit) : canNotGetBuildingUnits.push(unit);
			});

			// 'remove' extra units from map
			canNotGetBuildingUnits.forEach(function (unit) {
				unit.cpuData = unit.cpuData || {};
				unit.cpuData.x = unit.x;
				unit.cpuData.y = unit.y;
				unit.x = -Infinity;
				unit.y = -Infinity;
			});

			canGetBuildingUnits.forEach(function (unit) {

				unit.getAvailablePath(controller).forEach(function (xy) {
					var buildingXY = 'x' + xy.x + 'y' + xy.y,
						building = controller.buildings[buildingXY];
					if ( building && building.playerId !== unit.playerId && util.has(unit.availableBuildingsType, building.type) ) {
						availableGetBuilding[buildingXY] = true;
					}
				});

			});

			canNotGetBuildingUnits.forEach(function (unit) {
				unit.x = unit.cpuData.x;
				unit.y = unit.cpuData.y;
			});

			return availableGetBuilding;

		},
		getAvailableGetGrave: function (data) {

			var player = data.player,
				playerId = player.id,
				controller = data.controller,
				allUnits = controller.units,
				playerUnits = [],
				availableGetGrave = [],
				canUpGraveUnits = [],
				key, unit,
				push = Array.prototype.push;

			for (key in allUnits) {
				if (allUnits.hasOwnProperty(key)) {
					unit = allUnits[key];
					if (unit.playerId === playerId) {
						playerUnits.push(unit);
					}
				}
			}

			playerUnits.forEach(function (unit) {
				return unit.availableActions.indexOf('upBones') !== -1 && canUpGraveUnits.push(unit);
			});

			canUpGraveUnits.forEach(function (unit) {

				var startXY = {
					x: unit.x,
					y: unit.y
				};

				unit.getAvailablePath(controller)
					.concat(startXY)
					.every(function (xy) {

						unit.x = xy.x;
						unit.y = xy.y;

						var graves = unit.findGravesForUp(controller.unitsRIP, controller.units);
						if (graves) {
							push.apply(availableGetGrave, graves);
						}

				});

				unit.x = startXY.x;
				unit.y = startXY.y;


			});

			return availableGetGrave;

		},
		getEnemyAvailableActions: function (data) {
			// detect building which enemy unit can placed or/and get
			var player = data.player,
				playerId = player.id,
				controller = data.controller,
				allUnits = controller.units,
				enemyUnits = [],
				enemyAvailablePath = {},
				unit, key;

			for (key in allUnits) {
				if (allUnits.hasOwnProperty(key)) {
					unit = allUnits[key];
					if (unit.playerId !== playerId) {
						enemyUnits.push(unit);
					}
				}
			}

			enemyUnits.forEach(function (unit) {
				unit.getAvailablePath(controller).forEach(function (xy) {

					var xyStr = 'x' + xy.x + 'y' + xy.y,
						building = controller.buildings[xyStr];

					if (building && unit.availableBuildingsType && unit.availableBuildingsType.indexOf(building.type) !== -1) {
						enemyAvailablePath[xyStr] = {
							building: building
						};
					} else {
						enemyAvailablePath[xyStr] = true;
					}

				});
			});

			return enemyAvailablePath;

		}

	};

	APP.Cpu = Cpu;

}(window));