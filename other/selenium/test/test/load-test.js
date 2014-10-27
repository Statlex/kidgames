(function () {

	"use strict";
	/*global console, alert */

	exports.test = function(args) {

		var driver = args.driver,
			chai = args.chai;

		driver.get("http://statlex.com/game/air/");

		driver.sleep(5000);

		chai.expect('.js-wrapper').dom.to.not.visible().then(function(){
			console.log(1);
			console.log(arguments);
		},
		function(){
			console.log(2);
			console.log(arguments);
		});

		chai.expect('.js-wrapper').dom.to.be.visible().then(function(){
			console.log(3);
			console.log(arguments);
		},
		function(){
			console.log(4);
			console.log(arguments);
		});
		//driver['args'] = args;

		console.log('test - load-test.js is done');

	}


}());