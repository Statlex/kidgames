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

			//debugger;

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

		attackTo: function(enemyUnit) {
			enemyUnit.health = enemyUnit.health - this.atk + enemyUnit.def;
			this.setEndTurn();
		},
		setDefaultProperties: function() {
			util.extend(this, this.defaultList);
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

		}

	};

}(window, document, document.documentElement));