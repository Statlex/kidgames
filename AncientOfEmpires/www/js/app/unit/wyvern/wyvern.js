(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var wyvern = APP.units.Wyvern = function(data) {

		this.atk = 8;
		this.def = 3;
		this.mov = 7;
		this.cost = 1000;

		this.attackRange = 1;

		this.isFly = true;

		this.baseInit(data);

	};

	wyvern.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));