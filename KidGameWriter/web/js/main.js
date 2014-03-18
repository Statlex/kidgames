(function (win) {

	"use strict";
	/*global window, document, setTimeout, console, $, $$, info, viewer, ui */

	var main = {
		handleEvent: function() {

			this.wrapper = $('#wrapper');
			viewer.show('title-page');
			ui.fn.setBodyScroll(true);

			win.addEventListener('resize', this.onResize.bind(this), false);
			this.onResize();

		},
		setMorePage: function(){
			var langSelectNode = $('.js-language-select', this.wrapper),
				links = $$('a', main.wrapper);

			langSelectNode.addEventListener('change', function(){
				info.set('lang', this.value, true);
				viewer.refresh();
			}, false);

			ui.externalLinkHandler.setLinks(links);

		},
		// custom methods...
		onResize: function() {
			var resize = (function () {
				var blocks = $$('.symbol-thumbs', this.wrapper),
					height = (blocks[0] ? blocks[0].clientWidth : 0) + 'px';

				blocks.forEach(function(block) {
					block.style.height = height;
					var preview = $('.symbol-preview', block),
						previewHeight = preview.clientHeight;
					preview.style.lineHeight = previewHeight * 0.9 + 'px';
					preview.style.fontSize = previewHeight * 0.8 + 'px';
				});

			}.bind(this));
			resize();
			setTimeout(resize, 250);
		}

	};

	win.main = main;

	win.addEventListener('load', main, false);

}(window));

