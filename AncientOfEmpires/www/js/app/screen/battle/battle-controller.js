(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	win.APP = win.APP || {};

	function BattleController(data) {

		this.unitCounter = 0;
		this.units = {};
		this.buildings = {};
		this.unitsRIP = {};
		this.map = {};
		this.view = {};
		this.lifeAfterDeadLimit = 3;
		this.unitAvailableActions = {};

		this.activePlayer = null;

		util.extend(this, data);

	}

	BattleController.prototype = {

		setMap: function(map) {
			this.map = util.createCopy(map);
		},

		setView: function(view) {
			this.view = view;
		},

		setMapForView: function() {
			this.addUnitsToControllerAndView();
			this.addBuildingsToControllerAndView();
		},
		addUnitsToControllerAndView: function() {

			// get units
			var units = this.map.units;

			units.forEach(function(unit){

				var player = this.getPlayerById(unit.playerId),
					newUnit;

				unit.color = player.color;

				newUnit = this.appendUnit(unit); // to controller

				this.view.appendUnit(newUnit); // and view

			}, this);

		},
		getPlayerById: function(id) {

			var playerById = null;

			this.players.every(function(player){
				if (player.id === id) {
					playerById = player;
					return false;
				}
				return true;
			});

			return playerById;


		},
		addBuildingsToControllerAndView: function() {
			var buildings = this.map.buildings;

			buildings.forEach(function(build){
				var newBuild = this.appendBuilding(build); // to controller
				this.view.appendBuilding(newBuild);
			}, this);

		},
		appendUnit: function(data) {
			var unit = new APP.units[data.type](data),
				unitId = this.unitCounter;

			unit.id = unitId;

			this.units[unitId] = unit;

			this.unitCounter += 1;

			return unit;
		},
		appendBuilding: function(build) {
			this.buildings['x' + build.x + 'y' + build.y] = build;
			return build;
		},

		hideAllActions: function() {
			this.view.hideAvailablePath();
			this.view.highlightUnit();
			this.view.hideUnitsUnderAttack();
			this.view.hideGetBuilding();
		},

		createAvailableActions: function(unit) {

			var actions = {};

			this.hideAllActions();

			unit.availableActions.forEach(function(action){

				var availablePath, availableAttack, unitX, unitY, units, key, itemUnit, building;

				unitX = unit.x;
				unitY = unit.y;

				switch (action) {

					case 'move':

						if (!unit.wasMove) {

							availablePath = unit.getAvailablePath(this);
							availablePath.forEach(function(xy){
								actions['x' + xy.x + 'y' + xy.y] = 'move';
							}, this);

							// remove other units coords

							units = this.units;

							for (key in units) {
								if (units.hasOwnProperty(key)) {
									itemUnit = units[key];
								}
							}

							this.view.highlightPath({ path: availablePath, color: unit.color });

						}

						break;

					case 'attack':

						if (!unit.wasAttack) {

							availableAttack = unit.findUnitsUnderAttack(this.units) || [];
							availableAttack.forEach(function(xy){
								actions['x' + xy.x + 'y' + xy.y] = 'attack';
							}, this);

							this.view.showUnitsUnderAttack(availableAttack);

						}

						break;

					case 'getBuilding':

						if (!unit.wasGetBuilding) {

							building = this.buildings['x' + unitX + 'y' + unitY];

							if (
								building &&
								building.playerId !== unit.playerId &&
								util.has(unit.availableBuildingsType, building.type)
								) {
								actions['x' + unitX + 'y' + unitY] = 'getBuilding';
								this.view.showGetBuilding(unit);
							}

						}

						break;

					case 'upBones':

						if (!unit.wasUpBones) {

							var graves = unit.findGravesForUp(this.unitsRIP, this.units) || [];

							graves.forEach(function(xy){
								actions['x' + xy.x + 'y' + xy.y] = 'upBones';
							}, this);

							this.view.showGravesForUp(graves);

						}

						break;

				}


			}, this);


			return actions;

		},

		getUnitAction: function(x, y) {
			return this.unitAvailableActions['x' + x + 'y' + y];
		},

		endAction: function() {

			var x, y;
			x = this.focusedUnit.x;
			y = this.focusedUnit.y;
			this.focusedUnit = false;
			this.unitAvailableActions = {};
			this.onClick({x: x, y: y});

		},

		onClick: function(coordinates) {

			var units, unit, x, y, unitAction;

			x = coordinates.x;
			y = coordinates.y;

			units = this.getUnitsByCoordinates(coordinates);

			unit = units[units.length - 1]; // get las unit // workaround for store

			unitAction = this.getUnitAction(x, y);

			if (unitAction) {

				switch (unitAction) {
					case 'move':
						this.focusedUnit.moveTo(coordinates, this);
						this.view.moveUnit(this.focusedUnit);

						this.endAction();
						this.wispAction();
						break;

					case 'attack':
						this.attackUnit(this.focusedUnit, unit);
						this.view.hideUnitsUnderAttack();

						this.endAction();
						this.wispAction();
						break;

					case 'getBuilding':

						this.focusedUnit.getBuilding(this);

						this.view.hideGetBuilding();

						this.endAction();
						this.setStoreButtonStateForActivePlayer();
						break;

					case 'upBones':

						this.upBonesFromGrave(this.focusedUnit, coordinates)

						this.endAction();

						break;


				}


			} else {

				this.focusedUnit = false;
				this.unitAvailableActions = {};

				if (unit) {
					this.focusedUnit = unit;
					if (unit.playerId === this.activePlayer.id) {
						this.unitAvailableActions = this.createAvailableActions(unit);
						this.view.highlightUnit(unit);
						// detect - no available action of unit
						if (!Object.keys(this.unitAvailableActions).length) {
							this.focusedUnit.setEndTurn();
							this.view.showEndUnitTurn(unit);
						}
					} else {
						this.view.highlightPath({ path: unit.getAvailablePath(this), color: unit.color });
						this.view.highlightUnit(unit);
					}

					this.view.showUnitInfo(unit);

				} else {
					this.focusedUnit = false;
					this.unitAvailableActions = {};
					this.hideAllActions();

					this.view.showPlaceInfo({
						map: this.map,
						coordinates: coordinates
					});

				}
			}

		},

		attackUnit: function(active, passive) {

			active.attackTo(passive, this);

			if (passive.health <= 0) {
				this.killUnit(passive);
			} else {
				// detect - can passive attack active
				if (passive.canAttackUnit(active, this)) {

					passive.attackTo(active, this);

					if (active.health <= 0) {
						this.killUnit(active);
					}

				}
			}

			this.view.redrawHealthUnit(active);
			this.view.redrawHealthUnit(passive);

		},

		upBonesFromGrave: function(active, coordinates) {
			active.setEndTurn();
			this.createUnitByCoordinates(coordinates, 'Bones', active.playerId);
			this.removeGraveByCoordinates(coordinates);
		},

		createUnitByCoordinates: function(xy, type, id) {

			var unit = {
				type: type,
				x: xy.x,
				y: xy.y,
				playerId: id
			},
				player = this.getPlayerById(unit.playerId),
				newUnit;

			unit.color = player.color;

			newUnit = this.appendUnit(unit);

			this.view.appendUnit(newUnit);

			newUnit.setEndTurn();
			this.view.showEndUnitTurn(newUnit);

		},

		removeGraveByCoordinates: function(coordinates) {
			var graves = this.unitsRIP,
				x = coordinates.x,
				y = coordinates.y,
				key,
				grave, graveX, graveY;

			for (key in graves) {
				if (graves.hasOwnProperty(key)) {
					grave = graves[key];
					graveX = grave.x;
					graveY = grave.y;
					if (graveX === x && graveY === y) {
						// remove grave
						this.view.removeRIP(grave);
						delete graves[key];
					}

				}
			}

		},

		killUnit: function(unit) {

			if ( unit.notCreateGrave ) {
				this.view.removeRIP(unit); // hack - use removeRIP instead removeUnit (removeUnit is not implemented)
			} else {
				this.appendRIP(unit);
				this.view.drawRIP(unit);
			}

			delete this.units[unit.id];

		},

		appendRIP: function(unit) {
			unit.lifeAfterDeadLength = 0;
			this.unitsRIP[unit.id] = unit;
			return unit;

		},

		updateRIPs: function() {
			var RIPs = this.unitsRIP,
				key, unit;
			for (key in RIPs) {
				if (RIPs.hasOwnProperty(key)) {
					unit = RIPs[key];
					unit.lifeAfterDeadLength += 1;

					if (unit.lifeAfterDeadLength >= this.lifeAfterDeadLimit + 1000) {
						this.view.removeRIP(unit);
						delete RIPs[key];
					}

				}
			}

		},

		getUnitsByCoordinates: function(coordinates) {
			var key,
				units = [],
				allUnits = this.units,
				unitForTest;

			for (key in allUnits) {
				if (allUnits.hasOwnProperty(key)) {

					unitForTest = allUnits[key];

					if (unitForTest.x === coordinates.x && unitForTest.y === coordinates.y) {
						units.push(unitForTest);
					}

				}
			}

			return units;

		},

		startBattle: function() {
//			this.endTurn();
			this.step();
		},
		step: function() {
			this.setActivePlayer();
			this.setStatusBarForActivePlayer();
			this.updateRIPs();
			this.updateUnitsOnBuilding();
			this.wispAction();
		},
		wispAction: function(argsPlayer) {

			// 0 - get players
			// 1 - get wisps
			// 2 - create active map
			// 3 - get all units
			// 4 - set state for each units

			var ctrl = this,
				players = ctrl.players,
				view = ctrl.view;

			players.forEach(function(player){

				var allUnits = ctrl.getUnitByPlayer(player),
					wisps = ctrl.getUnitByPlayerAndType(player, 'Wisp'),
					auraMap = ctrl.createAuraMap(wisps);

				// apply aura to needed units
				allUnits.forEach(function(unit){

					var x = unit.x,
						y = unit.y;

					if ( auraMap['x' + x + 'y' + y] ) {

						if (unit.underWispAura || unit.canNotBeUnderWispAura) {
							// do nothing, unit is OK
						} else {
							unit.underWispAura = true;
							view.showWispAura(unit);
						}

					} else {

						view.hideWispAura(unit);
						unit.underWispAura = false;

					}

				})

			});

			view.removeWispAuraFromGraves();

		},
		getUnitByPlayer: function(player) {
			var unitsByPlayer = [],
				allUnits = this.units,
				key, unit,
				playerId = player.id;

			for (key in allUnits) {
				if (allUnits.hasOwnProperty(key)) {
					unit = allUnits[key];
					if (unit.playerId === playerId) {
						unitsByPlayer.push(unit);
					}
				}
			}

			return unitsByPlayer;

		},
		getUnitByPlayerAndType: function(player, type) {

			var allUnits = this.getUnitByPlayer(player),
				neededUnits = [];

			allUnits.forEach(function(unit){
				if (unit.type === type) {
					neededUnits.push(unit);
				}
			});

			return neededUnits;

		},
		createAuraMap: function(units) {

			var map = {};

			units.forEach(function(unit){

				var unitMap = unit.getAuraMap();

				unitMap.forEach(function(xy){
					map['x' + xy.x + 'y' + xy.y] = xy;
				});

			});

			return map;

		},

		updateUnitsOnBuilding: function() {
			var player = this.activePlayer,
				playerId = player.id,
				units = this.units,
				buildings = this.buildings,
				key,
				that = this;

			for (key in units) {
				if (units.hasOwnProperty(key)) {

					(function (unit) {

						// filter only for active unit
						if (unit.playerId !== playerId) {
							return;
						}

						var x = unit.x,
							y = unit.y,
							building = buildings['x' + x + 'y' + y],
							addedHealth,
							endHealth;

						// detect building
						if (!building) {
							return;
						}

						// detect only building for active player
						if (building.playerId !== playerId) {
							return;
						}

						addedHealth = APP.map.healthFrom[building.type];
						endHealth = addedHealth + unit.health;


						if ( endHealth > unit.defaultHealth ) {
							addedHealth = unit.defaultHealth - unit.health;
							unit.health = unit.defaultHealth;
						} else {
							unit.health += addedHealth;
						}
						that.view.addHealthToUnit({
							endHealth: unit.health,
							addedHealth: addedHealth,
							unit: unit
						});

					}(units[key]));

				}
			}

		},
		setStatusBarForActivePlayer: function() {
			this.setMoneyForActivePlayer();
			this.setStoreButtonStateForActivePlayer();
		},
		setMoneyForActivePlayer: function() {

			var buildings = this.buildings,
				key,
				building,
				player = this.activePlayer,
				playerId = player.id,
				moneyFrom = APP.map.moneyFrom;

			for (key in buildings) {
				if (buildings.hasOwnProperty(key)) {
					building = buildings[key];
					if (building.playerId === playerId) {
						player.gold += moneyFrom[building.type];
					}
				}
			}

			this.view.showPlayerInfo(player);

		},
		setStoreButtonStateForActivePlayer: function() {

			this.view.setStoreButtonState( this.getPlayerCastle() );

		},
		setActivePlayer: function() {
			// set active player
			var index,
				players = this.players;
			if ( this.activePlayer ) {
				index = players.indexOf(this.activePlayer);
				this.activePlayer = players[index + 1] || players[0];
			} else {
				this.activePlayer = players[0];
			}


			this.view.showPlayerInfo(this.activePlayer);


		},
		endTurn: function() {

			// set default properties all units
			var units = this.units,
				unit,
				key;

			for (key in units) {
				if (units.hasOwnProperty(key)) {
					unit = units[key];
					unit.setDefaultProperties();
				}
			}

			this.focusedUnit = false;
			this.unitAvailableActions = {};

			this.hideAllActions();

			this.step();

		},
		getPlayerCastle: function(player) {

			player = player || this.activePlayer;

			var buildings = this.buildings,
				building,
				playerId = player.id,
				key;

			for (key in buildings) {
				if (buildings.hasOwnProperty(key)) {
					building = buildings[key];
					if (building.playerId === playerId && building.type === 'castle') {
						return building;
					}
				}
			}

			return false;

		},

		getDefByBuilding: function(unit) {

			var unitX = unit.x,
				unitY = unit.y,
				building = this.buildings['x' + unitX + 'y' + unitY]

			if (!building) {
				return 0;
			}

			return APP.map.defence[building.type];

		},

		getDefByTerrain: function(unit) {

			var unitX = unit.x,
				unitY = unit.y,
				terrain = this.map.terrain['x' + unitX + 'y' + unitY]

			if (!terrain) {
				return 0;
			}

			// lizard only
			if (unit.runType === 'flow' && terrain === 'water') {
				return APP.map[terrain].specialDefence;
			}

			return APP.map[terrain].defence;


		}



	};

	APP.BattleController = BattleController;

}(window, document, document.documentElement));