(function (win) {

	"use strict";
	/*global window, document */

	var main = {

		handleEvent: function() {

			this.wrapper = $('#wrapper');
			viewer.show('title-page');
			ui.fn.setBodyScroll(true);

		},
		setMorePage: function(){
			var langSelectNode = $('.js-language-select', this.wrapper);

			langSelectNode.addEventListener('change', function(){
				info.set('lang', this.value, true);
				viewer.refresh();
			}, false);

			// set external link
			var links = $$('a', main.wrapper);
			ui.externalLinkHandler.setLinks(links);

		},
		test: function() {
			var blocks = $$('h1', this.wrapper);
			blocks.forEach(function(block){
				block.addEventListener(info.evt.move, function(){
					this.style.backgroundColor = '#c00';
				}, this);
			});

			console.log(arguments);
		}

	};

	win.main = main;

	win.addEventListener('load', main, false);

}(window));

