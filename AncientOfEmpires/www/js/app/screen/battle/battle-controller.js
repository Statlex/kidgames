(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP */

	win.APP = win.APP || {};

	function BattleController() {

		this.unitCounter = 0;
		this.units = {};
		this.map = {};
		this.view = {};
		////////////////
		APP.owners = [
			{
				id: 1,
				name: 'Vasya'
			},
			{
				id: 2,
				name: 'Petya'
			}
		];


	}

	BattleController.prototype = {
		setMap: function(map) {
			this.map = map;
		},
		setView: function(view) {
			this.view = view;
		},

		setMapForView: function() {
			this.addUnitsToControllerAndView();
		},
		addUnitsToControllerAndView: function() {

			// get units
			var units = this.map.units;

			units.forEach(function(unit){
				var newUnit = this.appendUnit(unit); // to controller
				this.view.appendUnit(newUnit);
			}, this);

		},
		appendUnit: function(data) {
			var unit = new APP.units[data.constructorName](data),
				unitId = this.unitCounter;

			unit.id = unitId;

			this.units[unitId] = unit;

			this.unitCounter += 1;

			return unit;
		},
		onClick: function(coordinates) {

			console.log(coordinates);

		},
		startBattle: function() {

		}


	};

	APP.BattleController = BattleController;

}(window, document, document.documentElement));