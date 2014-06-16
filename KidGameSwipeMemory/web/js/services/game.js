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
//			'left': 37,
//			'up': 38,
//			'right': 39,
//			'down': 40,
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
		},
		start: function() {




			header.init();

			this.$field = $('.js-main-field');

			this.clearField();


			this.createLevel(3);

		},
		clearField: function() {
			this.$field.html('');
		},
		createLevel: function(number) {

			header.text(lang[info.lang].swipe);

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

						header.text(lang[info.lang].swipeAgain);

						this.mode = 'test';

						this.curLevelData.directions.forEach(function(dir){
							dir.isDone = false;
						});

						$node = $('.js-dir');
						$node.removeClass('wrong-dir', 'done-dir');

						console.log(' -- show level is done -- ');

						break;

					case 'test':

						console.log(' -- test level is done -- ');

						this.createLevel(this.curLevelData.number + 1);

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

		alertEndGame: function() {

			this.mode = 'endGame';

			var data = {
					score: this.curLevelData.number,
					hiScore: info.get('hi-score') || 0
				},
				html = templateMaster.tmplFn.alert(data),
				$node = $(html);

			$node.appendTo('.js-main-wrapper');

		}

	};

	header = {
		init: function() {
			this.$text = $('.js-main-wrapper .js-text');
			this.$mistake = $('.js-main-wrapper .js-mistake');
		},
		text: function(text) {
			this.$text.html(text);
		},
		mistake: function(miss) {
			this.$mistake.html(miss);
		}
	};


	win.game = game;


}(window));