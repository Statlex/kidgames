(function () {

	"use strict";
	/*global console, alert */

	exports.test = function(args) {

		var driver = args.driver;

		driver.get("http://statlex.com/game/air/");

		driver.sleep(5000);

		console.log('test - load-test.js is done');

	}


}());