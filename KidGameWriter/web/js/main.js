(function (win) {

	"use strict";
	/*global window, document, setTimeout, console, $, $$, info, viewer, ui */

	var main = {
		handleEvent: function() {

			this.wrapper = $('#wrapper');
			viewer.show('title-page');
			ui.fn.setBodyScroll(true);

			this.setBodyClassLang();

			win.addEventListener('resize', this.onResize.bind(this), false);
			this.onResize();

		},
		setMorePage: function(){
			var langSelectNode = $('.js-language-select', this.wrapper),
				links = $$('a', main.wrapper),
				that = this;

			langSelectNode.addEventListener('change', function(){
				info.set('lang', this.value, true);
				that.setBodyClassLang();
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
					preview.style.lineHeight = previewHeight * 0.95 + 'px';
					preview.style.fontSize = previewHeight * 0.85 + 'px';
				});

			}.bind(this));
			resize();
			setTimeout(resize, 250);
			this.pageOnResize();
		},
		pageOnResize: function() {
			if (!$('.symbol-page', main.wrapper)) {
				return;
			}
			viewer.refresh();
		},
		clearIntervals: function() {
			var i;
			for (i = 1; i < 99999; i += 1) {
				window.clearInterval(i);
			}
		},
		setBodyClassLang: function() {
			info.availableLangs.forEach(function(lang){
				$.removeClass(this.wrapper, 'lang-' + lang);
			}, this);
			$.addClass(this.wrapper, 'lang-' + info.lang);
		}

	};

	win.main = main;

	win.addEventListener('load', main, false);

}(window));

