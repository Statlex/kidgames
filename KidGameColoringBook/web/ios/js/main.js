(function (win) {

	"use strict";
	/*global window, document */

	var main = {

		handleEvent: function() {

//			window.onerror = function(message, source, lineno) {
//				alert("error: " + message + "\n" + "file: " + source + "\n" + "str: " + lineno);
//			};

			this.wrapper = $('#wrapper');
			viewer.show('title-page');
			main.setSizing();
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
		setSizing: function() {
			var blocks = $$('.categories-list-item', main.wrapper);
			var height = false;
			blocks.forEach(function(block){
				if (!height) {
					height = Math.round(block.clientWidth) + 'px';
				}
				block.style.height = height;
			});
		},
		createResize: function() {
			this.setSizing();
			setTimeout(this.setSizing.bind(this), 200);
			setTimeout(this.setSizing.bind(this), 400);
		}

	};

	win.main = main;

	win.addEventListener('load', main, false);
	win.addEventListener('resize', main.createResize.bind(main), false);

}(window));

