(function (win) {

	"use strict";
	/*global window, document, $$, $, ui, setTimeout, info, viewer */

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
			var size = Math.floor((this.wrapper.clientWidth - 30) / 3) + 'px';
			blocks.forEach(function(block){
				block.style.width = size;
				block.style.height = size;
			});
		},
		createResize: function() {
			this.setSizing();
			setTimeout(this.setSizing.bind(this), 100);
			setTimeout(this.setSizing.bind(this), 200);
			setTimeout(this.setSizing.bind(this), 300);
		},
		setExternalLinks: function() {
			setTimeout(function(){
				if (info.isAdsFree) {
					return;
				}
				var link = $('.ads-free', this.wrapper);
				link.style.display = 'block';
				ui.externalLinkHandler.setLinks([link]);
			}, 1500);
		}

	};

	win.main = main;

	win.addEventListener('load', main, false);
	win.addEventListener('resize', main.createResize.bind(main), false);

}(window));

