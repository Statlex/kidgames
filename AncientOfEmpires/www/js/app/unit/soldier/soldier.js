(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP, util */

	var soldier = APP.units.Soldier = function(data) {
		this.baseInit(data);
		this.speed = 5;
	};

	soldier.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));