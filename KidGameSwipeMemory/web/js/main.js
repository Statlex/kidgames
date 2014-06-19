(function (win) {

	"use strict";
	/*global console, alert, templateMaster, $, window, game */

	function start() {
		templateMaster.init();
		game.start();

		$('body').on('keyup', function(e) {
			var data = {
				key: e.keyCode
			};
			game.dispatchSwipe(data);
		});

		$('.js-main-wrapper').on('swipe', function(e){
			var data = {
				dir: e.direction
			};
			game.dispatchSwipe(data);
		});

		var util = $();
		util.setBodyScroll(false);
	}

	$(win).on('load', start);

}(window));