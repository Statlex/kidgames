(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP, lang, util */

	win.APP = win.APP || {};

	APP.units.BaseUnit = function(data) {

		// set defaults
		this.speed = 7;

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
				y: this.y
			});

			return pathFinder.getAvailablePath();

		},
		moveTo: function(coordinates, map) {
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
				this.x = coordinates.x;
				this.y = coordinates.y;
				return this;
			}

			return false;

		}
	};

}(window, document, document.documentElement));