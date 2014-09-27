(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, lang, util */

	win.APP = win.APP || {};

	APP.units.BaseUnit = function(data) {

		this.atk = 5;
		this.def = 0;
		this.mov = 4;
		this.cost = 100;

		this.health = 10;
		this.defaultHealth = 10;
		this.attackRange = 1;

		this.runType = 'walk';

//		this.availableActions = ['move', 'attack', 'getBuilding', 'createSkeleton', 'addHealthToUnit'];
		this.availableActionsDefault = ['move', 'attack'];
		this.availableActions = [];

//		this.defaultList = {
//			wasMove: false,
//			wasAttack: false
//		};

//		this.wasMove = false;
//		this.wasAttack = false;

	};

	APP.units.BaseUnit.prototype = {
		underAbilityList: {
			wasPoisoned: false
		},
		defaultList: {
			wasMove: false,
			wasAttack: false
		},
		baseInit: function(data) {

			var unitInfo = APP.units.info[data.type.toLowerCase()];

			this.defaultList = util.createCopy(this.defaultList);
			util.extend(this.defaultList, unitInfo.unitDefaultList);
			util.extend(this, unitInfo);
			util.extend(this, data);

			// create full action list
			this.availableActions = this.availableActionsDefault.concat(this.availableActions);

		},
		getAvailablePath: function(controller) {

			var x = this.x,
				y = this.y,
				pathFinder = new util.PathFinder({
					map: controller.map,
					mov: this.mov,
					x: x,
					y: y,
					relativeTypeSpace: true
				}),
				availablePath = pathFinder.getAvailablePath({unit: this}),
				removedIndex,
				units = controller.units,
				key, unit,
				findRemovedIndex = function(xy, index){
					if (xy.x === x && xy.y === y) {
						removedIndex = index;
						return false;
					}
					return true;
				};

			availablePath.every(findRemovedIndex);
			availablePath.splice(removedIndex, 1);

			for (key in units) {
				if (units.hasOwnProperty(key)) {
					unit = units[key];
					removedIndex = undefined;
					x = unit.x;
					y = unit.y;
					availablePath.every(findRemovedIndex);
					if (removedIndex !== undefined) {
						availablePath.splice(removedIndex, 1);
					}
				}
			}

			return availablePath;

		},
		moveTo: function(coordinates, controller) {

			if (this.wasMove) {
				return false;
			}

			var availablePath = this.getAvailablePath(controller),
				canMove = false,
				x = coordinates.x,
				y = coordinates.y;

			availablePath.every(function(xy){

				if (xy.x === x && xy.y === y) {
					canMove = true;
					return false;
				}

				return true;

			});

			if (canMove) {
				this.wasMove = true;
				this.x = coordinates.x;
				this.y = coordinates.y;
				return this;
			}

			return false;

		},
		findUnitsUnderAttack: function(units) {

			var pathFinder = new util.PathFinder({
//				map: map,
				mov: this.attackRange,
				x: this.x,
				y: this.y,
				relativeTypeSpace: false
			}),

			availableSquare = pathFinder.getAvailablePath({unit: this}),
			unitsUnderAttack = [],
			playerId = this.playerId;

			availableSquare.forEach(function(square){

				var x = square.x,
					y = square.y,
					key, unit;

				for (key in units) {
					if (units.hasOwnProperty(key)) {
						unit = units[key];
						if (unit.x === x && unit.y === y && playerId !== unit.playerId) {
							unitsUnderAttack.push(unit);
						}
					}
				}

			});

			if ( !unitsUnderAttack.length ) {
				return false;
			}

			return unitsUnderAttack;

		},

		findGravesForUp: function(graves, units) {

			var pathFinder = new util.PathFinder({
					mov: this.upBonesRange,
					x: this.x,
					y: this.y,
					relativeTypeSpace: false
				}),

				availableSquare = pathFinder.getAvailablePath({unit: this}),
				gravesForUp = [],
				unitsCoordinates = util.xyUnitsMap(units);

			availableSquare.forEach(function(square){

				var x = square.x,
					y = square.y,
					key, grave;

				for (key in graves) {
					if (graves.hasOwnProperty(key)) {
						grave = graves[key];
						if (grave.x === x && grave.y === y && !unitsCoordinates['x' + x + 'y' + y]) {
							gravesForUp.push(grave);
						}
					}
				}

			});

			if ( !gravesForUp.length ) {
				return false;
			}

			return gravesForUp;

		},

		attackTo: function(enemyUnit, controller) {

			if (this.health <= 0) {
				this.setEndTurn();
				return;
			}

			if (this.canPoison && !enemyUnit.canNotBePoisoned) {
				enemyUnit.wasPoisoned = true;
			}

			var defByBuilding = controller.getDefByBuilding(enemyUnit),
				defByTerrain = controller.getDefByTerrain(enemyUnit),
				unitQ = this.health / this.defaultHealth,
				enemyUnitQ = enemyUnit.health / enemyUnit.defaultHealth,
				attackValue = this.atk,
				enemyDef = enemyUnit.def,
				reduceDefBy = APP.units.info.poison.reduce.def;

			if (enemyUnit.wasPoisoned) {
				enemyDef -= reduceDefBy;
				enemyDef = Math.max(enemyDef, 0);
			}

			if (defByBuilding > 0) {
				defByTerrain = 0
			}

			attackValue = attackValue * unitQ - (enemyDef + defByBuilding + defByTerrain) * enemyUnitQ;

			attackValue = Math.max(attackValue, unitQ);

			enemyUnit.health = enemyUnit.health - attackValue;

			this.setEndTurn();

		},
		setDefaultProperties: function() {
			util.extend(this, this.defaultList);
			util.extend(this, this.underAbilityList);
		},
		setEndTurn: function() {

			var key,
				list = this.defaultList;

			for (key in list) {
				if (list.hasOwnProperty(key)) {
					this[key] = !list[key];
				}
			}

		},
		getBuilding: function(controller) {
			var build = controller.buildings['x' + this.x + 'y' + this.y];

			build.playerId = this.playerId;
			build.color = this.color;

			controller.view.setBuildingColor(build);

			this.setEndTurn();

		},
		canAttackUnit: function(enemy, controller) {
			var units = this.findUnitsUnderAttack(controller.units);

			// if no any units under attack - return false
			if (!units){
				return false;
			}

			// if has units under attack - search enemy in available units
			return units.indexOf(enemy) !== -1;
		}

	};

}(window, document, document.documentElement));