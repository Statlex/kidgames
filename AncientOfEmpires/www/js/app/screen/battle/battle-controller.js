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

				// my or enemy user
				if (unit.playerId === this.activePlayer.id) {
					// my unit
					this.activeSelectedUnit = unit;

					// show available path
					if ( !unit.wasMoved ) {
						availablePth = unit.getAvailablePath(this.map);
						this.view.highlightPath(availablePth);
					}

					if ( this.activeSelectedUnit.wasAttack ) {
						this.view.hideUnitsUnderAttack();
					} else {
						this.getUnitsUnderAttack(this.activeSelectedUnit);
					}


				} else {
					// enemy unit
					//this.activeSelectedUnit = false;

					if (this.activeSelectedUnit && !this.activeSelectedUnit.wasAttack && this.unitsIsAvailableToAttack && this.unitsIsAvailableToAttack.indexOf(unit) !== -1) {
						this.attackUnit(this.activeSelectedUnit, unit);
						this.view.hideUnitsUnderAttack();
					} else {
						if ( unit.wasMoved ) {
							this.activeSelectedUnit = false;
						} else {
							availablePth = unit.getAvailablePath(this.map);
							this.view.highlightPath(availablePth);
						}
					}

				}

			} else {

//

				if (this.activeSelectedUnit) {
					// try to move
					var wasMove = this.activeSelectedUnit.moveTo(coordinates, this.map);
					this.view.moveUnit(this.activeSelectedUnit);
					this.getUnitsUnderAttack(this.activeSelectedUnit);
					if ( !wasMove ) {
						this.activeSelectedUnit = false;
						this.view.hideUnitsUnderAttack();
					}
					//this.activeSelectedUnit = false;

				} else {
					// ???

				}










			}

		},

		attackUnit: function(active, passive) {
			active.attackTo(passive);

			if (passive.health <= 0) {
				this.killUnit(passive);
			}

			if (active.health <= 0) {
				this.killUnit(active);
			}

			this.view.redrawHealthUnit(active);
			this.view.redrawHealthUnit(passive);

		},

		killUnit: function(unit) {
			console.log('DEAD - ' + unit);
			this.view.drawRIP(unit);
		},


		getUnitsUnderAttack: function(unit) {
			this.unitsIsAvailableToAttack = unit.findUnitsUnderAttack(this.units);
			if (this.unitsIsAvailableToAttack) {
				this.view.showUnitsUnderAttack(this.unitsIsAvailableToAttack);
			} else {
				this.view.hideUnitsUnderAttack();
			}

			return this.unitsIsAvailableToAttack;

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
//			this.endTurn();
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

		},
		endTurn: function() {

			this.unitsIsAvailableToAttack = this.activeSelectedUnit = false;

			// set default properties all units
			var units = this.units,
				unit,
				key;

			for (key in units) {
				if (units.hasOwnProperty(key)) {
					unit = units[key];
					unit.setDefaultProperties();
				}
			}

			this.step();

			console.log(this.units);
		}



	};

	APP.BattleController = BattleController;

}(window, document, document.documentElement));