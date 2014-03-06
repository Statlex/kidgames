(function (win, doc, docElem) {

	"use strict";
	/*global window, document, console, alert, $, setTimeout, info, main */

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
				if (this.speed.row && this.coordinates.col === blocks[key].coordinates.col && this.coordinates.row === blocks[key].coordinates.row && this.id !== blocks[key].id) {
					this.coordinates.row -= this.speed.row;
					this.isActive = false;
					break;
				}
			}
		}

//		if (this.coordinates.row === 0 && this.isActive === false)
		if (!this.coordinates.row && !this.isActive) {
			this.remove();
		}

	};

	Block.prototype.remove = function() {
		delete this.constructor.prototype.blockMap[this.id];
	};

	tower = {
		field: {
			size: {
				width: 7,
				height: 14
			}
		},
		cell: {
			size: 20
		},
		isActive: false,
		speed: 200,
		symbols: {
			full: '<i><\/i>',
			empty: '<b><\/b>',
			inActiveFull: '<em><\/em>'
		},
		rows: {
			created: 0
		},
		blockInLine: 3,
		handleEvent: function() {

		},
		startGame: function() {
			this.wrapperNode = $('.game-wrapper', main.wrapper);
			this.wrapperNode.style.width = this.field.size.width * this.cell.size + 'px';
			this.wrapperNode.addEventListener(info.evt.down, this.dropLine.bind(this), false);
			this.isActive = true;
			this.createMatrix();
			this.createLine();
			setTimeout(this.step.bind(this), this.speed);
		},
		step: function() {

			if (!this.isActive) {
				return;
			}

			var blocks = Block.prototype.blockMap,
				key,
				activeBlockCounter = 0;
			for (key in blocks) {
				if (blocks.hasOwnProperty(key)) {
					if (blocks[key].isActive) {
						this.matrix[blocks[key].coordinates.row][blocks[key].coordinates.col] = this.symbols.empty;
					} else {
						this.matrix[blocks[key].coordinates.row][blocks[key].coordinates.col] = this.symbols.inActiveFull;
					}
					blocks[key].update();
				}
			}

			for (key in blocks) {
				if (blocks.hasOwnProperty(key)) {
					if (blocks[key].isActive) {
						this.matrix[blocks[key].coordinates.row][blocks[key].coordinates.col] = this.symbols.full;
						activeBlockCounter += 1;
					} else {
						this.matrix[blocks[key].coordinates.row][blocks[key].coordinates.col] = this.symbols.inActiveFull;
					}
				}
			}

			if (!activeBlockCounter) {
				this.createLine();
			}

			this.wrapperNode.innerHTML = this.matrix.join('').replace(/,/gi, '');

			setTimeout(this.step.bind(this), this.speed);

		},
		createMatrix: function() {

			var i, j, key, blocks;

			this.matrix = [];
			for (i = 0; i < this.field.size.height; i += 1) {
				this.matrix[i] = [];
				for (j = 0; j < this.field.size.width; j += 1) {
					this.matrix[i][j] = this.symbols.empty;
				}
			}

			blocks = Block.prototype.blockMap;
			for (key in blocks) {
				if (blocks.hasOwnProperty(key)) {
					this.matrix[blocks[key].coordinates.row][blocks[key].coordinates.col] = this.symbols.full;
				}
			}

			this.wrapperNode.innerHTML = this.matrix.join('<br>').replace(/,/gi, ' ');

		},
		dropLine: function() {
			var blocks, key;
			blocks = Block.prototype.blockMap;
			for (key in blocks) {
				if (blocks.hasOwnProperty(key) && blocks[key].isActive) {
					blocks[key].speed = {
						row: 1,
						col: 0
					};
				}
			}
		},
		createLine: function() {

			var that, minLineLength, centerCol, i;
			that = this;

			minLineLength = 0;

			// detect line size
			this.matrix.forEach(function(row){

				if (minLineLength || row.indexOf(that.symbols.inActiveFull) === -1) {
					return;
				}

				row.forEach(function(value) {
					minLineLength += +(value === that.symbols.inActiveFull);
				});

			});

			centerCol = Math.round((this.field.size.width - this.blockInLine) / 2) + 1;

			for (i = 0; i < (this.blockInLine || minLineLength); i += 1) {
				new Block(0, centerCol - i);
			}

			this.rows.created += 1;

			this.blockInLine = 0;

		}

	};

	win.tower = tower;

}(window, document, document.documentElement));
