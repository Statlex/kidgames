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
		setColor: function() {
			var svgs = $$('svg');
			svgs.forEach(function(svg){
				var polygons = $$('*', svg);
				polygons.forEach(function(polygon){
					polygon.setAttribute('fill', '#0cc');
				});
				var rect = $('rect', svg);
				rect.setAttribute('fill', '#c00');
			});


		}

	};

	win.main = main;

	win.addEventListener('load', main, false);

}(window));

