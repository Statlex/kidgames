(function (win, doc, docElem) {

	"use strict";
	/*global window, document, console, alert */

	var tower;

	function Block(row, col) {

		this.isActive = true;

		this.tower = tower;

		this.coordinates = {
			row: row || 0,
			col: col || 0
		};

		this.speed = {
			row: 0,
			col: 1
		};

		this.id = this.constructor.prototype.curreentId ? this.constructor.prototype.curreentId + 1 : 1;
		this.constructor.prototype.curreentId = this.id;

		// block add to blockMap
		this.constructor.prototype.blockMap[this.id] = this;

	}

	Block.prototype.blockMap = {};

	Block.prototype.update = function() {

		if (!this.isActive) {
			return;
		}

		this.coordinates.row += this.speed.row;
		this.coordinates.col += this.speed.col;

		if (this.coordinates.col > this.tower.field.size.width - 1) {
			this.coordinates.col = this.tower.field.size.width - 1;
			this.speed.col = -this.speed.col;
		}

		if (this.coordinates.row > this.tower.field.size.height - 1) {
			this.coordinates.row = this.tower.field.size.height - 1;
			this.isActive = false;
		}

		if (this.coordinates.row < 0) {
			this.coordinates.row = 0;
		}

		if (this.coordinates.col < 0) {
			this.coordinates.col = 0;
			this.speed.col = -this.speed.col;
		}

		var blocks = this.constructor.prototype.blockMap,
			key;
		for (key in blocks) {
			if (blocks.hasOwnProperty(key)) {
				if (this.coordinates.col === blocks[key].coordinates.col && this.coordinates.row === blocks[key].coordinates.row && this.id !== blocks[key].id) {
					this.coordinates.row -= this.speed.row;
					break;
				}
			}
		}

	};

	tower = {
		field: {
			size: {
				width: 7,
				height: 10
			}
		},
		isActive: false,
		speed: 200,
		symbols: {
			full: '<i><\/i>',
			empty: '<b><\/b>'
		},
		rows: {
			created: 0
		},
		handleEvent: function() {

		},
		startGame: function() {
			this.wrapperNode = $('.game-wrapper', main.wrapper);
			this.wrapperNode.addEventListener(info.evt.down, this.dropLine.bind(this), false);
			this.createLine();
			this.isActive = true;
			this.createMatrix();
			setTimeout(this.step.bind(this), this.speed);
		},
		step: function() {

			if (!this.isActive) {
				return;
			}

			var blocks = Block.prototype.blockMap,
				key;
			for (key in blocks) {
				if (blocks.hasOwnProperty(key) && blocks[key].isActive) {
					this.matrix[blocks[key].coordinates.row][blocks[key].coordinates.col] = this.symbols.empty;
					blocks[key].update();
				}
			}

			for (key in blocks) {
				if (blocks.hasOwnProperty(key)) {
					this.matrix[blocks[key].coordinates.row][blocks[key].coordinates.col] = this.symbols.full;
				}
			}

			this.wrapperNode.innerHTML = this.matrix.join('<br>').replace(/,/gi, ' ');

			setTimeout(this.step.bind(this), this.speed);

		},
		createMatrix: function() {

			this.matrix = [];

			for (var i = 0; i < this.field.size.height; i += 1) {
				this.matrix[i] = [];
				for (var j = 0; j < this.field.size.width; j += 1) {
					this.matrix[i][j] = this.symbols.empty;
				}
			}

			var blocks = Block.prototype.blockMap;
			for (var key in blocks) {
				if (blocks.hasOwnProperty(key)) {
					this.matrix[blocks[key].coordinates.row][blocks[key].coordinates.col] = this.symbols.full;
				}
			}

			this.wrapperNode.innerHTML = this.matrix.join('<br>').replace(/,/gi, ' ');

		},
		dropLine: function() {
			var blocks = Block.prototype.blockMap;
			for (var key in blocks) {
				if (blocks.hasOwnProperty(key) && blocks[key].isActive) {
					blocks[key].speed = {
						row: 1,
						col: 0
					}
				}
			}

			this.createLine();

		},
		createLine: function() {
			new Block(0, 2);
			new Block(0, 3);
			new Block(0, 4);
			this.rows.created += 1;
		}

	};

	win.tower = tower;

}(window, document, document.documentElement));
