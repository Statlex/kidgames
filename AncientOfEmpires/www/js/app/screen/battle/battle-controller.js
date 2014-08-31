(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP, util */

	win.APP = win.APP || {};

	function BattleController() {

		this.unitCounter = 0;
		this.units = {};
		this.map = {};
		this.view = {};
		////////////////
		this.players = [
			{
				id: 1,
				name: 'Vasya',
				type: 'human'
			},
			{
				id: 2,
				name: 'Petya',
				type: 'cpu'
			}
		];

		this.activePlayer = null;

	}

	BattleController.prototype = {

		setMap: function(map) {
			this.map = util.createCopy(map);
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

			this.view.hideAvailablePath();

			var units = this.getUnitsByCoordinates(coordinates),
				// we use LIST of units cause in future many units can stay on one place
				unit = units[0],
				availablePth;

			// click to unit
			if (unit) {

				// show available path
				availablePth = unit.getAvailablePath(this.map);
				this.view.highlightPath(availablePth);

				// my or enemy user
				if (unit.playerId === this.activePlayer.id) {
					// my unit
					this.activeSelectedUnit = unit;
				} else {
					// enemy unit
					this.activeSelectedUnit = false;

				}

			} else {

				if (this.activeSelectedUnit) {
					// try to move
					var moveUnit = this.activeSelectedUnit.moveTo(coordinates, this.map);
					this.view.moveUnit(moveUnit);
					this.activeSelectedUnit = false;
				} else {
					// ???

				}










			}

		},

		getUnitsByCoordinates: function(coordinates) {
			var key,
				units = [],
				allUnits = this.units,
				unitForTest;

			for (key in allUnits) {
				if (allUnits.hasOwnProperty(key)) {

					unitForTest = allUnits[key];

					if (unitForTest.x === coordinates.x && unitForTest.y === coordinates.y) {
						units.push(unitForTest);
					}

				}
			}

			return units;

		},

		startBattle: function() {
			this.activeSelectedUnit = false;
			this.step();
		},
		step: function() {
			this.setActivePlayer();
		},
		setActivePlayer: function() {
			// set active player
			var index,
				players = this.players;
			if ( this.activePlayer ) {
				index = players.indexOf(this.activePlayer);
				this.activePlayer = players[index + 1] || players[0];
			} else {
				this.activePlayer = players[0];
			}

			console.log('Active player - ', this.activePlayer);

		}



	};

	APP.BattleController = BattleController;

}(window, document, document.documentElement));