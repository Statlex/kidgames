(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var wisp = APP.units.Wisp = function(data) {
		this.baseInit(data);

		this.atk = 3;
		this.def = 2;
		this.mov = 4;
		this.cost = 500;

		this.attackRange = 1;

	};

	wisp.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));