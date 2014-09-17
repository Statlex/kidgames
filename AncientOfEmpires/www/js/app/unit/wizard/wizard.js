(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var wizard = APP.units.Wizard = function(data) {

		this.baseInit(data);

	};

	wizard.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));