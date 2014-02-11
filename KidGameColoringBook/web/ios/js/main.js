(function (win) {

	"use strict";
	/*global window, document */

	var main = {

		handleEvent: function() {

			window.onerror = function(message, source, lineno) {
				alert("error: " + message + "\n" + "file: " + source + "\n" + "str: " + lineno);
			};

			this.wrapper = $('#wrapper');
			viewer.show('title-page');

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

		}

	};

	win.main = main;

	win.addEventListener('load', main, false);

}(window));

