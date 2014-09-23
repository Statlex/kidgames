(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	var proto;
	
	var	catapult = APP.units.Catapult = function(data) {

		this.baseInit(data);

	};

	catapult.prototype = new APP.units.BaseUnit();

	proto = {
		moveTo: catapult.prototype.moveTo
	};

	catapult.prototype.moveTo = function() {
		proto.moveTo.apply(this, arguments);
		this.setEndTurn();
	}

}(window, document, document.documentElement));