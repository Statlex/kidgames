(function (win) {

	"use strict";
	/*global console, alert, setTimeout, window, document */
	/*global $, info, lang */

	var tower, block, jsPre, gameInfo;
	jsPre = 'webkit';
	// 7 * 14

	gameInfo = {
		squareSize: 20,
		w: 7,
		h: 14,
		maxFloor: 9,
		colors: ['5856d6', '007aff', '34aadc', '5ac8fa', '4cd964', 'ff2d55', 'ff3d30', 'ff9500', 'ffcc00', '8e8e93'],
		getColor: function() {

			this.colors = this.colors.sort(function(){
				return Math.random() - 0.5;
			});

			return this.colors[3];

		}
	};

	function customAlert(args) {

		if (args.hide) {
			// hide all alerts
			console.log('hide alerts');
			return;
		}

		var html, template, $node;
		html = $('.js-alert-template').html();
		template = $().template(html);
		$node = $(template(args)).appendTo('body');

		setTimeout(function(){
			$('body').addClass('blur');
		}, 20);

	}

	tower = {
		count: -1, // see lineLength
		wrapper: 0, // node wrapper
		blocks: [],
		isActive: true,
		lineLength: 3, // must be
		defaultLineLength: 3, // the same
		stepTime: 150,
		speedIncrease: 0.99,
		init: function () {
			this.wrapper.on('click', this.dropBlocks.bind(this));
		},
		dropBlocks: function () {

			// can drop

			var cantDrop = false;

			this.blocks.forEach(function (block) {
				cantDrop = cantDrop || block.g || block.remove;
			});

			if (cantDrop) {
				return;
			}

			this.blocks.forEach(function (block) {
				if (block.direction) {
					block.direction = 0;
					block.g = 1;
				}
			});

		},
		createBlock: function (direction) {

			var newBlock = Object.create(block);
			newBlock.init(direction);

			this.wrapper.append(newBlock.node);
			this.blocks.push(newBlock);

			return newBlock;

		},
		createLine: function () {

			var centerX = Math.round(gameInfo.w - 1.5) / 2,
				direction = Math.random() > 0.5 ? 1 : -1,
				linesBlock;

			switch (this.lineLength) {

				case 1:
					linesBlock = this.createBlock(direction);
					linesBlock.tower = this;
					linesBlock.x = centerX;
					break;

				case 2:
					linesBlock = this.createBlock(direction);
					linesBlock.tower = this;
					linesBlock.x = centerX;

					linesBlock = this.createBlock(direction);
					linesBlock.tower = this;
					linesBlock.x = centerX + 1;
					break;

				case 3:
					linesBlock = this.createBlock(direction);
					linesBlock.tower = this;
					linesBlock.x = centerX;

					linesBlock = this.createBlock(direction);
					linesBlock.tower = this;
					linesBlock.x = centerX + 1;

					linesBlock = this.createBlock(direction);
					linesBlock.tower = this;
					linesBlock.x = centerX - 1;
					break;

				default : // detect 0 and other
					console.log('end');
					this.isActive = false;
					break;

			}

			if (!this.isActive) {
				return;
			}

			this.stepTime *= this.speedIncrease;
			this.count += 1;

			$('.js-count').html(this.count);

		},
		step: function () {

			if (!this.isActive) {
				this.endGame();
				return;
			}

			// remove extra block 1110111
			var bottomBlockCount = 0,
				createLine = true,
				maxFloor = gameInfo.h,
				removeBlock,
				ii, len,
				shiftCount = 0;

			this.blocks.forEach(function (block) {
				if (block.y === gameInfo.h - 1) {
					bottomBlockCount += 1;
				}
			});

			if (bottomBlockCount === this.defaultLineLength * 2) {
				console.log('end');
				this.isActive = false;
				this.endGame();
				return;
			}

			this.blocks.forEach(function (block) {

				if (block.y === 0) {
					createLine = false;
				}

				if (block.remove) {
					createLine = false;
				}

				if (block.g === 1 && block.direction === 0) {
					createLine = false;
				}

			});

			if (createLine) {
				// try to remove extra floors
				this.blocks.forEach(function (block) {
					if (block.direction === 0 && block.g === 0) {
						maxFloor = Math.min(block.y, maxFloor);
					}
				});

				if (maxFloor !== gameInfo.h && maxFloor < gameInfo.maxFloor) {
					// down 3 blocks

					this.blocks.forEach(function (block) {
						if (!block.direction && !block.g && block.y === gameInfo.h - 1) {
							shiftCount += 1;
						}
					});

					for (ii = 0, len = shiftCount; ii < len; ii += 1) {
						removeBlock = this.blocks.shift();
						removeBlock.killBlock();
					}

					this.blocks.forEach(function (block) {
						block.y += 1;
						block.node.style[jsPre + 'Transition'] = 'all ease-out 0.3s';
						block.node.style[jsPre + 'Transform'] = 'translate(' + block.x * gameInfo.squareSize + 'px, ' + block.y * gameInfo.squareSize + 'px)';
					});
				}

				this.createLine();

			}

			this.blocks.forEach(function (block, index, arr) {

				if (block.remove) {
					block.remove += 1;
					block.node.style.opacity = 1 - block.remove / 8;
				}

				if (block.remove > 9) {
					block.removeBlock();
					arr.splice(index, 1);
				}

			});

			// get current state and decide solve
			this.blocks.forEach(function (block) {

				var before = {
					x: block.x,
					y: block.y
				};

				block.step();

				if (before.x === block.x && before.y === block.y) {
					return;
				}

				// detect changes
				block.node.style[jsPre + 'Transform'] = 'translate(' + block.x * gameInfo.squareSize + 'px, ' + block.y * gameInfo.squareSize + 'px)';

			});

			setTimeout(this.step.bind(this), this.stepTime);

		},
		endGame: function () {
			customAlert({
				msg: lang[info.lang].yourScoreIs + ': ' + this.count
			});
		}
	};

	block = {
		x: 0,
		y: 0,
		direction: 1, // 1 to right, -1 to left
		g: 0,
		init: function (direction) {
			this.node = $('<div class="block"/>').css('background-color', '#' + gameInfo.getColor())[0];
			this.timeStamp = Date.now();
			this.direction = direction || 1;
		},
		step: function () {

			var canDown, remove;

			if (this.remove) {
				this.remove += 1;
				return;
			}

			if (this.direction) { // detect direction !== 0

				this.x += this.direction;

				if (this.x >= gameInfo.w - 1 && this.direction > 0) {
					this.direction = -this.direction;
				}

				if (this.x <= 0 && this.direction < 0) {
					this.direction = -this.direction;
				}

			}

			if (this.g) {

				// detect dropped block
				canDown = true;
				this.tower.blocks.forEach(function (block) {
					if (block.y === this.y + 1 && block.g === 0 && this.x === block.x) {
						canDown = false;
					}
				}, this);

				if (!canDown) {
					this.g = 0;
				}

				this.y += this.g;

				// detect floor
				if (this.y >= gameInfo.h) {
					this.y -= this.g;
					this.g = 0;
				}


				if (this.g === 0) {

					remove = 0;
					this.tower.blocks.forEach(function (block) {

						if ((block.g === 0) && (block.direction === 0)) {

							if (block.y < this.y) {
								remove = 1;
							}

							if ((this.tower.lineLength === 1) && (block.y <= this.y) && (block.timeStamp !== this.timeStamp)) {
								remove = 1;
							}

						}

					}, this);

					this.remove = remove;

				}

			}

		},
		removeBlock: function () {
			this.tower.lineLength -= 1;
			this.killBlock();
		},
		killBlock: function () {
			this.node.parentNode.removeChild(this.node);
			delete this.tower;
			delete this.node;
		}
	};

	// run game

	function startGame() {

		function setGameStyles() {

			var h = info.screen.getHeight() - (info.isAdsFree ? 0 : 80) - 80,
				w = h / 2,
				wrapper = $('.js-main-field'),
				blockSize;

			wrapper.css({
				height: h + 'px',
				width: w + 'px'
			});

			blockSize = h / gameInfo.h;
			gameInfo.squareSize = blockSize;

			$('<style type="text/css">.block {width: ' + blockSize + 'px; height: ' + blockSize + 'px;}</style>').appendTo('body');

		}

		setGameStyles();

		// begin - show n set tutor screen
		$('.js-tutor-screen').on('click', function(){

			this.style.display = 'none';

			var towerObj = Object.create(tower);
			towerObj.wrapper = $('.js-main-field');
			towerObj.createLine();

			towerObj.init();
			towerObj.step();

		});
		// end - show n set tutor screen

	}

	function gameOnResize () {
		if (info.screen.orientation() === '|' && document.querySelector('.js-tutor-screen').clientHeight) {
			win.location.reload();
		}
	}

	$(win).on('load', startGame);

	$(win).on('resize', gameOnResize);

	function noBodyScroll() {
		$('body').addEventListener('touchmove', function (e) {
			if (!info.canScroll) {
				e.preventDefault();
			}
		}, false);
	}

	win.addEventListener('load', noBodyScroll, false);



}(window));