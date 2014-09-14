(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
	/*global APP, util */

	win.APP = win.APP || {};

	function BattleController() {

		this.unitCounter = 0;
		this.units = {};
		this.buildings = {};
		this.unitsRIP = {};
		this.map = {};
		this.view = {};
		this.lifeAfterDeadLimit = 3;
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
			this.addBuildingsToControllerAndView();
		},
		addUnitsToControllerAndView: function() {

			// get units
			var units = this.map.units;

			units.forEach(function(unit){
				var newUnit = this.appendUnit(unit); // to controller
				this.view.appendUnit(newUnit);
			}, this);

		},
		addBuildingsToControllerAndView: function() {
			var buildings = this.map.buildings;

			buildings.forEach(function(build){
				var newBuild = this.appendBuilding(build); // to controller
				this.view.appendBuilding(newBuild);
			}, this);

		},
		appendUnit: function(data) {
			var unit = new APP.units[data.type](data),
				unitId = this.unitCounter;

			unit.id = unitId;

			this.units[unitId] = unit;

			this.unitCounter += 1;

			return unit;
		},
		appendBuilding: function(build) {
			this.buildings['x' + build.x + 'y' + build.y] = build;
			return build;
		},
		onClick: function(coordinates) {

			this.view.hideUnitsUnderAttack();
			this.view.hideAvailablePath();

			var units = this.getUnitsByCoordinates(coordinates),
				// we use LIST of units cause in future many units can stay on one place
				unit = units[0],
				availablePth,
				wasMove, unitsUnderAttack, building, unitForInfo;

			// click to unit
			if (unit) {

				// my or enemy user
				if (unit.playerId === this.activePlayer.id) {

					// my unit
					this.view.highlightUnit(unit);

					this.activeSelectedUnit = unit;

					if (!unit.isEndTurn) {
						if (unit.canGetBuilding) {
							this.buildingChangeOwner(unit);
							this.view.detectEndUnitTurn(this.activeSelectedUnit, true);
							this.defaultStateToOccupied();
							this.view.highlightUnit();

							unit.endTurn();
						} else {
							this.defaultStateToOccupied();
							this.getBuildingToOccupied(this.activeSelectedUnit);
						}

						// show available path
						if ( !unit.wasMoved ) {
							availablePth = unit.getAvailablePath(this.map);
							this.view.highlightPath({ path: availablePth, color: unit.color });
						}

						if ( this.activeSelectedUnit.wasAttack ) {
							this.view.hideUnitsUnderAttack();
						} else {
							this.getUnitsUnderAttack(this.activeSelectedUnit);
						}
					}



				} else {
					// enemy unit
					//this.activeSelectedUnit = false;
					this.defaultStateToOccupied();
					this.view.highlightUnit();

					if (this.activeSelectedUnit && !this.activeSelectedUnit.wasAttack && this.unitsIsAvailableToAttack && this.unitsIsAvailableToAttack.indexOf(unit) !== -1) {
						this.attackUnit(this.activeSelectedUnit, unit);
						this.view.detectEndUnitTurn(this.activeSelectedUnit);
						this.view.hideUnitsUnderAttack();
					} else {
						if ( unit.wasMoved ) {
							this.activeSelectedUnit = false;
						} else {
							availablePth = unit.getAvailablePath(this.map);
							this.view.highlightPath({ path: availablePth, color: unit.color });
						}
					}

				}

			} else {

				this.defaultStateToOccupied();

				if (this.activeSelectedUnit) {
					// try to move
					wasMove = this.activeSelectedUnit.moveTo(coordinates, this.map);
					if (wasMove) {
						this.view.moveUnit(this.activeSelectedUnit);
					}

					unitsUnderAttack = this.getUnitsUnderAttack(this.activeSelectedUnit);
					building = this.getBuildingToOccupied(this.activeSelectedUnit);

					if (!unitsUnderAttack && !building && wasMove) {
						this.view.detectEndUnitTurn(this.activeSelectedUnit, true);
					}

					if ( !wasMove ) {
						this.activeSelectedUnit = false;
						this.view.hideUnitsUnderAttack();
						this.defaultStateToOccupied();
						this.view.highlightUnit();
					}
					//this.activeSelectedUnit = false;

				}
//				else {
//					// ???
//
//				}

			}

			unitForInfo = unit || this.activeSelectedUnit;
			if (unitForInfo) {
				this.view.showUnitInfo(unitForInfo);
			} else {
				this.view.showPlaceInfo({
					map: this.map,
					coordinates: coordinates
				});
			}

		},

		getBuildingToOccupied: function(unit) {

			var build = this.buildings['x' + unit.x + 'y' + unit.y];

			if (!build) {
				return false;
			}

			if (build.playerId === unit.playerId) {
				return false;
			}

			unit.canGetBuilding = util.has(unit.canBuildings, build.type);

			if (unit.canGetBuilding) {
				this.view.showUnitCanGetBuilding(unit);
				return build;
			}

			return false;

		},

		buildingChangeOwner: function(unit) {

			var build = this.buildings['x' + unit.x + 'y' + unit.y];

			build.playerId = unit.playerId;
			build.color = unit.color;

			this.view.setBuildingColor(build);

		},

		defaultStateToOccupied: function() {
			var allUnits = this.units,
				key;

			for (key in allUnits) {
				if (allUnits.hasOwnProperty(key)) {
					allUnits[key].canGetBuilding = false;
				}
			}

			this.view.hideUnitCanGetBuilding();

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
			this.appendRIP(unit);
			this.view.drawRIP(unit);

			delete this.units[unit.id];
		},

		appendRIP: function(unit) {
			unit.lifeAfterDeadLength = 0;
			this.unitsRIP[unit.id] = unit;
			return unit;

		},

		updateRIPs: function() {
			var RIPs = this.unitsRIP,
				key, unit;
			for (key in RIPs) {
				if (RIPs.hasOwnProperty(key)) {
					unit = RIPs[key];
					unit.lifeAfterDeadLength += 1;

					if (unit.lifeAfterDeadLength >= this.lifeAfterDeadLimit) {
						this.view.removeRIP(unit);
						delete RIPs[key];
					}

				}
			}

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
			this.updateRIPs();
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

			this.defaultStateToOccupied();
			this.view.highlightUnit();

			this.step();

		}



	};

	APP.BattleController = BattleController;

}(window, document, document.documentElement));