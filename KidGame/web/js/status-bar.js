(function (win) {

	"use strict";
	/*global window, document */

	win.statusBar = {
		handleEvent: function() {
			this.wrapper = $('.js-status-bar');
			this.scoreWords = $$('[text]', this.wrapper);
			this.score = $('.js-score-field', this.wrapper);
			this.update();
			this.setLang();
		},
		setLang: function() {
			this.scoreWords.forEach(function(node){
				node.innerHTML = lang[info.lang][node.getAttribute('text')];
			});
		},
		update: function() {
			this.score.innerHTML = info.score;
		}

	};

	win.addEventListener('load', win.statusBar, false);

}(window));
