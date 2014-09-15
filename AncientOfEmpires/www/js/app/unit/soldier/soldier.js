(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var soldier = APP.units.Soldier = function(data) {

		this.atk = 5;
		this.def = 1;
		this.mov = 4;
		this.cost = 150;

		this.availableActions = ['getBuilding'];
		this.availableBuildingsType = ['farm'];
		this.defaultList.wasGetBuilding = false;

		this.baseInit(data);


	};

	soldier.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));