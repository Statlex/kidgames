(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var spider = APP.units.Spider = function(data) {
		this.baseInit(data);

		this.atk = 6;
		this.def = 2;
		this.mov = 5;
		this.cost = 600;

		this.attackRange = 1;

	};

	spider.prototype = new APP.units.BaseUnit();

}(window, document, document.documentElement));