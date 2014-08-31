(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global util, APP */

	win.util = {
		extend: function(main, plused) {
			var key;
			for (key in plused) {
				if (plused.hasOwnProperty(key)) {
					main[key] = plused[key];
				}
			}

			return main;
		},
		findBy: function(list, key, value) {

			var result = null;

			list.every(function(item, index){

				if (item[key] === value) {
					result = {
						item: item,
						index: index
					};
					return false; // stop loop
				}

				return true; // continue loop

			});

			return result;

		},
		createCopy: function(obj) {
			return JSON.parse(JSON.stringify(obj));
		},
		isEqualsObject: function(obj1, obj2) {
			return JSON.stringify(obj1) === JSON.stringify(obj2);
		}

	};

	function PathFinder (data) {
		util.extend(this, data); // get from data - map, x, y, speed;
		this.availablePath = [];
		this.donePathPoints = [];
	}

	util.PathFinder = PathFinder;

	function PathFinderPoint(data) {
		util.extend(this, data);
		this.run();
	}

	PathFinderPoint.prototype = {

		run: function() {

			var x = this.x,
				y = this.y;

			// this is in donePoints
			if (this.parent.isInDonePoints(x, y, this.speed)) {
				return;
			}

			this.parent.addToDonePoints(x, y, this.speed);

			// add current coordinates to parent
			this.parent.addCoordinatesToAvailablePath({x: x, y: y});

			this.tryGoToSquare({x: x + 1, y: y});
			this.tryGoToSquare({x: x - 1, y: y});
			this.tryGoToSquare({x: x, y: y + 1});
			this.tryGoToSquare({x: x, y: y - 1});

		},

		tryGoToSquare: function(coordinates) {

			var x = coordinates.x,
				y = coordinates.y,
				square,
				pathResistance = 1,
				point;

			if (this.parent.relativeTypeSpace) {
				// get square bu coordinates
				square = APP.map.getSquareByXY(this.parent.map, x, y);
				if (square) {
					pathResistance = APP.map[square].pathResistance;
				}
			}

			if (this.speed >= pathResistance) {
				point = new PathFinderPoint({
					parent: this.parent,
					speed: this.speed - pathResistance,
					x: x,
					y: y
				});

			}


		}

	};

	PathFinder.prototype = {

		getAvailablePath: function() {
			var point = new PathFinderPoint({
				parent: this,
				speed: this.speed,
				x: this.x,
				y: this.y
			});

			return this.availablePath;

		},

		addCoordinatesToAvailablePath: function(data) {

			var isInPoints = false,
				x = data.x,
				y = data.y;

			this.availablePath.every(function(point){

				if (point.x === x && point.y === y) {
					isInPoints = true;
					return false;
				}

				return true;

			});

			if ( !isInPoints ) {
				this.availablePath.push(data);
			}


		},

		isInDonePoints: function(x, y, speed) {

			var isInDonePoints = false;

			this.donePathPoints.every(function(point){

				if (point.x === x && point.y === y && speed <= point.speed) {
					isInDonePoints = true;
					return false;
				}

				return true;

			});

			return isInDonePoints;

		},

		addToDonePoints: function(x, y, speed) {

			if (this.isInDonePoints(x, y, speed)) {
				return;
			}

			this.donePathPoints.push({ x: x, y: y, speed: speed });
		}

	};



}(window, document, document.documentElement));