(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var catapult = APP.units.Catapult = function(data) {
		this.baseInit(data);

		this.atk = 7;
		this.def = 2;
		this.mov = 3;
		this.cost = 700;

		this.attackRange = 7;

	};

	catapult.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));