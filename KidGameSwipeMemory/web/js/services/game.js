(function (win) {

	"use strict";
	/*global console, alert, $, window, document, templateMaster, lang, info */

	var game, header;

	game = {

		$field: false,
		directions: ['left', 'up', 'right', 'down'],
		mode: 'show', // show ^ test
		mistakePercent: 25,
		keyMap: {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
		},
		start: function() {

			header.init();

			this.$field = $('.js-main-field');

			this.clearField();

			this.createLevel(1);

			this.startGame = Date.now();

		},
		clearField: function() {
			this.$field.html('');
		},
		createLevel: function(number) {

			if (number <= 3) {
				header.text(lang[info.lang].swipe);
			}

			this.mode = 'show';

			var util = $(),
				ii,
				arr = [],
				directions = util.duplicate(this.directions),
				data = {},
				html,
				obj;

			for (ii = 1; ii <= number; ii += 1) {

				obj = {
					dir: util.shuffle(directions)[0],
					index: ii,
					isDone: false
				};
				arr.push(obj);
			}

			data.directions = arr;

			this.curLevelData = {
				number: number,
				directions: arr,
				mistake: 0
			};

			info.set('hi-score', number, true);

			header.mistake(0);

			html = templateMaster.tmplFn.level(data);

			this.$field.html(html);


			// detect too many
			win.setTimeout((function(){

				var wrapperH = $('.js-main-wrapper').prop('clientHeight'),
					containerH = $('.js-arrows-wrapper').prop('clientHeight');

				if (wrapperH < containerH) {
					this.alertEndGame();
				}

			}.bind(this)), 1000);


		},
		dispatchSwipe: function(args) {

			if (this.mode === 'endGame') {
				return;
			}

			var dir = args.dir || this.keyMap[args.key],
				firstNode,
				lastNode,
				$node;

			if (!dir) {
				return;
			}

			// get first not done node
			this.curLevelData.directions.forEach(function(dir){
				if (firstNode) {
					return;
				}
				if (!dir.isDone) {
					firstNode = dir;
				}
			});

			if (!firstNode) {
				return;
			}

			$node = $('.js-dir[data-index="' + firstNode.index + '"]');

			switch (this.mode) {

				case 'show':

					if (firstNode.dir === dir) {
						firstNode.isDone = true;
						$node.removeClass('wrong-dir');
						$node.addClass('done-dir');
					} else {
						$node.addClass('wrong-dir');
					}

					break;

				case 'test':

					if (firstNode.dir === dir) {
						firstNode.isDone = true;
						$node.removeClass('wrong-dir');
						$node.addClass('done-dir');
					} else {
						this.curLevelData.mistake += 1;     // use only for test
						header.mistake(this.curLevelData.mistake);
						$node.addClass('wrong-dir');
						if (this.hasExtraMistakes()) {
							this.alertEndGame();

							$node = $('.js-dir');
							$node.addClass('show-arrow');
							$node.removeClass('hide-arrow' ,'wrong-dir', 'done-dir');

							console.log('-- too many mistakes - end game --');
						}
					}

					break;

				default :
					console.warn('-- not supported mode --');

			}

			// detect end level

			lastNode = this.curLevelData.directions[this.curLevelData.directions.length - 1];

			if (lastNode.isDone) {

				switch (this.mode) {

					case 'show':

						if (this.curLevelData.number <= 3) {
							header.text(lang[info.lang].swipeAgain);
						}

						this.mode = 'test';

						this.curLevelData.directions.forEach(function(dir){
							dir.isDone = false;
						});

						win.setTimeout(function(){
							var $node = $('.js-dir');
							$node.addClass('hide-arrow');
							$node.removeClass('wrong-dir', 'done-dir', 'show-arrow');
						}, 300);

						console.log(' -- show level is done -- ');

						break;

					case 'test':

						console.log(' -- test level is done -- ');

						win.setTimeout((function(){
							this.createLevel(this.curLevelData.number + 1);
						}.bind(this)), 1500);

						break;

					default :
						console.warn('-- not supported mode --');

				}

			}

		},

		hasExtraMistakes: function() {

			var allPoints = this.curLevelData.directions.length,
				mistakes = this.curLevelData.mistake,
				percent = mistakes / allPoints * 100;

			return percent > this.mistakePercent;

		},

		getGameTime: function() {

			var gameTime = Date.now() - this.startGame;

			if (gameTime > 86400 * 1000) {
				return false;
			}

			gameTime = new Date(gameTime);

			return {
				s: gameTime.getSeconds(),
				m: gameTime.getMinutes(),
				h: gameTime.getUTCHours()
			};

		},

		alertEndGame: function() {

			this.mode = 'endGame';

			var data = {
					score: this.curLevelData.number,
					hiScore: info.get('hi-score') || 0,
					gameTime: this.getGameTime()
				},
				html = templateMaster.tmplFn.alert(data),
				$node = $(html);

			console.log(data.gameTime);

			$node.appendTo('.js-main-wrapper');

			win.setTimeout(function(){
				$('.js-main-wrapper').addClass('blur');
			}, 10);

		}

	};

	header = {
		init: function() {
			this.$text = $('.js-main-wrapper .js-text');
			this.$mistake = $('.js-main-wrapper .js-mistake');

			this.$text.on('click', this.hideText.bind(this));

		},
		text: function(text) {

			win.clearTimeout(this.textTimeId);

			this.$text.html(text);

			this.textIsShow = true;

			this.$text.removeClass('show-alert');

			win.setTimeout((function(){
				this.$text.addClass('show-alert');
			}.bind(this)), 300);

			this.textTimeId = win.setTimeout((function(){
				this.hideText();
				win.clearTimeout(this.textTimeId);
			}.bind(this)), 3000);

		},

		hideText: function() {

			win.clearTimeout(this.textTimeId);

			if (!this.textIsShow) {
				return;
			}

			this.textIsShow = false;

			this.$text.removeClass('show-alert');

		},

		mistake: function(miss) {
			this.$mistake.html(miss);
		}

	};


	win.game = game;


}(window));