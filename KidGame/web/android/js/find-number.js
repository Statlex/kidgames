(function (win) {

	"use strict";
	/*global window, document */

	win.findNumber = {
		init: function() {
			win.addEventListener('resize', this.setBlocksSize.bind(this), false);
			this.template = $('.js-template.find-number').innerHTML;
			this.template = viewer.template(this.template);
		},
		availableNumbers: $.createSimpleArray(0, 9), // [0..19]
		questions: [],
		showLevel: function() {
			statusBar.show(['playAgain']);
			// if difficult == 1 -> show message + voice
			// if difficult == 2 -> voice only
			// if difficult == 3 -> voice only + change number positions

			this.questions = Object.create(this.availableNumbers);
			this.answer = $.shuffle(Object.create(this.availableNumbers))[5];

			console.log(this.answer);

			if (info.difficult === 1) {
				ui.message.show(lang[info.lang].find + ': ' + this.answer);
			}

			if (info.difficult === 2) {
				// remove {
				ui.message.show(lang[info.lang].find + ': ' + this.answer);
				// } remove
				this.questions = $.shuffle(this.questions);
			}

			if (info.difficult === 3) {
				// remove {
				ui.message.show(lang[info.lang].find + ': ' + this.answer);
				// } remove
				this.questions = $.shuffle(this.questions);
			}

			$('#wrapper').innerHTML = this.template({});

			var that = this;
			var blocks = $$('#wrapper .js-number-for-find');
			blocks.forEach(function(node){
				node.onclick = function() {
					if (parseInt(node.getAttribute('number')) === that.answer) {
						that.showLevel();
						win.ui.splashScreen.show(true);
					} else {
						$.addClass(this, 'disable');
						this.onclick = function(){};
						win.ui.splashScreen.show(false);
					}
				}
			});

			this.setBlocksSize();
			setTimeout(player.play.bind(player, 'numbers/' + info.lang + '/' + this.answer + '.mp3'), 1000);

		},
		setBlocksSize: function() {

			var blocks = $$('#wrapper .js-number-for-find span');
			blocks.forEach(function(node){
				node.style.fontSize = 0;
				node.style.lineHeight = 0;
			});

			var height = (blocks[0] && blocks[0].clientHeight) || 0;
			blocks.forEach(function(node){
				node.style.lineHeight = height + 'px';
				node.style.fontSize = height * 0.8 + 'px';
			});

		}

	};

	win.addEventListener('load', findNumber.init.bind(findNumber), false);

}(window));
