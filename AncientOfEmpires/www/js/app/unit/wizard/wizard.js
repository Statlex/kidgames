(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var wizard = APP.units.Wizard = function(data) {

		this.atk = 4;
		this.def = 1;
		this.mov = 4;
		this.cost = 400;

		this.attackRange = 1;

		this.baseInit(data);

	};

	wizard.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));