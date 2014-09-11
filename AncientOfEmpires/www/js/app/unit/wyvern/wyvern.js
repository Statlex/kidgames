(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var wyvern = APP.units.Wyvern = function(data) {
		this.baseInit(data);

		this.atk = 8;
		this.def = 3;
		this.mov = 7;
		this.cost = 1000;

		this.attackRange = 1;

	};

	wyvern.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));