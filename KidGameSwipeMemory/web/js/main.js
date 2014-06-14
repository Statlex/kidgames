(function (win) {

	"use strict";
	/*global console, alert, templateMaster, $, window */

	function start() {
		templateMaster.init();
		game.start();
	}

	$(win).on('load', start);




}(window));