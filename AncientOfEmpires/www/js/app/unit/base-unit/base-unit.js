(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, lang, util */

	win.APP = win.APP || {};

	APP.units.BaseUnit = function(data) {

		// set defaults
		this.speed = 5;
		this.attackRange = 1;
		this.wasMoved = false;
		this.wasAttack = false;

		this.defList = {
			wasMoved: false,
			wasAttack: false,
			canGetBuilding: false,
			isEndTurn: false
		};

		this.damage = 50;
		this.health = 100;
		this.armor = 2;

		this.canBuildings = [];

	};

	APP.units.BaseUnit.prototype = {
		baseInit: function(data) {
			util.extend(this, data);
		},
		getAvailablePath: function(map) {

			var pathFinder = new util.PathFinder({
				map: map,
				speed: this.speed,
				x: this.x,
				y: this.y,
				relativeTypeSpace: true
			});

			return pathFinder.getAvailablePath();

		},
		moveTo: function(coordinates, map) {

			if (this.wasMoved) {
				return false;
			}

			var availablePath = this.getAvailablePath(map),
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
				this.wasMoved = true;
				this.x = coordinates.x;
				this.y = coordinates.y;
				return this;
			}

			return false;

		},
		findUnitsUnderAttack: function(units) {

			var pathFinder = new util.PathFinder({
//				map: map,
				speed: this.attackRange,
				x: this.x,
				y: this.y,
				relativeTypeSpace: false
			}),

			availableSquare = pathFinder.getAvailablePath(),
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

			enemyUnit.health = enemyUnit.health - this.damage + enemyUnit.armor;

			this.endTurn();
		},
		setDefaultProperties: function() {
			util.extend(this, this.defList);
		},
		endTurn: function() {
			this.wasAttack = true;
			this.wasMoved = true;
			this.canGetBuilding = false;
			this.isEndTurn = true;
		}

	};

}(window, document, document.documentElement));