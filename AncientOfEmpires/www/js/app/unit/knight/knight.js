(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var archer = APP.units.Knight = function(data) {

		this.atk = 6;
		this.def = 2;
		this.mov = 5;
		this.cost = 400;

		this.availableActions = ['getBuilding'];
		this.availableBuildingsType = ['farm', 'castle'];
		this.defaultList.wasGetBuilding = false;

		this.baseInit(data);

	};

	archer.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));