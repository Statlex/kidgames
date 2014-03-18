(function (win) {

	"use strict";
	/*global window, document, $, $$, info, viewer, ui */

	var main = {

		handleEvent: function() {

			this.wrapper = $('#wrapper');
			viewer.show('title-page');
			ui.fn.setBodyScroll(true);

		},
		setMorePage: function(){
			var langSelectNode = $('.js-language-select', this.wrapper),
				links = $$('a', main.wrapper);

			langSelectNode.addEventListener('change', function(){
				info.set('lang', this.value, true);
				viewer.refresh();
			}, false);

			ui.externalLinkHandler.setLinks(links);

		}

	};

	win.main = main;

	win.addEventListener('load', main, false);

}(window));

