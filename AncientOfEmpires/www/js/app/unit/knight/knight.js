(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var archer = APP.units.Knight = function(data) {
		this.baseInit(data);

		this.atk = 6;
		this.def = 2;
		this.mov = 5;
		this.cost = 400;

		this.canBuildings = ['farm', 'castle'];

	};

	archer.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));