(function (win) {

	"use strict";
	/*global window, document */

	var main = {

		handleEvent: function() {

			this.wrapper = $('#wrapper');
			viewer.show('title-page');

		},
		setMorePage: function(){
			var langSelectNode = $('.js-language-select', this.wrapper);

			langSelectNode.addEventListener('change', function(){
				info.set('lang', this.value, true);
				viewer.refresh();
			}, false);

		}

	};

	win.main = main;

	win.addEventListener('load', main, false);

}(window));

(function () {
	"use strict";
	/*global window, document, console, alert */

	window.addEventListener('load', noBodyScroll, false); // + no gesture
	function noBodyScroll() {
		var wrapper = $('body');
		wrapper.addEventListener('touchmove', function(e){
			e.preventDefault();
		}, false);
	}

}());