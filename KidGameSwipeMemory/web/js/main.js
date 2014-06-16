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

	}

	$(win).on('load', start);

}(window));