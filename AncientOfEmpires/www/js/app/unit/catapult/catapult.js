(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var catapult = APP.units.Catapult = function(data) {

		this.baseInit(data);

	};

	catapult.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));