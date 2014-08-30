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

		}
	};

}(window, document, document.documentElement));