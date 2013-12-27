(function (win) {

	"use strict";
	/*global window, document */

	var main = {

		handleEvent: function() {

			this.wrapper = $('#wrapper');
			viewer.show('tangram-page');

		},
		setMorePage: function(){
			var langSelectNode = $('.js-language-select', this.wrapper);

			langSelectNode.addEventListener('change', function(){
				info.set('lang', this.value, true);
				viewer.refresh();
			}, false);

		},
		runTangram: function() {
			tangram.init();
		}

	};

	win.main = main;

	win.addEventListener('load', main, false);

}(window));
