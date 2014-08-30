(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP, lang, util */

	win.APP = win.APP || {};

	APP.units.BaseUnit = function(data) {



	};

	APP.units.BaseUnit.prototype = {
		baseInit: function(data) {
			util.extend(this, data);

		}
	};

}(window, document, document.documentElement));