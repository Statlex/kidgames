(function () {

	"use strict";
	/*global console, alert, window, document */
	/*global APP*/

	function Cpu(data) {

		this.player = data.player;
		this.controller = data.controller;
		this.view = data.view;
	}

	Cpu.prototype = {
		run: function () {

			// get all unit
			// get all no player's farm
			// get soldier which nearest to farm
			// all units go to farm
			// if unit can attack -> try to get safe position to attack



		}
	};

	APP.Cpu = Cpu;

}());