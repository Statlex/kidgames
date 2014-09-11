(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var soldier = APP.units.Soldier = function(data) {
		this.baseInit(data);

		this.atk = 5;
		this.def = 1;
		this.mov = 4;
		this.cost = 150;

		this.canBuildings = ['farm'];

	};

	soldier.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));