(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP, lang, util */

	win.APP = win.APP || {};

	APP.units.BaseUnit = function(data) {

		// set defaults
		this.speed = 10;
		this.hasAttack = true;
		this.attackRange = 3;
		this.wasMoved = false;
		this.wasAttack = false;
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

		}


	};

}(window, document, document.documentElement));