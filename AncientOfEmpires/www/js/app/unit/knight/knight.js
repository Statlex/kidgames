(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var archer = APP.units.Knight = function(data) {
		this.baseInit(data);
		this.speed = 6;
		this.attackRange = 1;
	};

	archer.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));