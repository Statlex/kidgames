(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var lizard = APP.units.Lizard = function(data) {

		this.atk = 5;
		this.def = 2;
		this.mov = 6;
		this.cost = 300;

		this.attackRange = 1;

		this.baseInit(data);

	};

	lizard.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));