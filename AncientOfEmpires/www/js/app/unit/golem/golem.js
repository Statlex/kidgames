(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var golem = APP.units.Golem = function(data) {
		this.baseInit(data);

		this.atk = 6;
		this.def = 4;
		this.mov = 4;
		this.cost = 600;

		this.attackRange = 1;

	};

	golem.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));