(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var archer = APP.units.Archer = function(data) {

		this.atk = 5;
		this.def = 1;
		this.mov = 4;
		this.cost = 250;

		this.attackRange = 2;

		this.baseInit(data);

	};

	archer.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));