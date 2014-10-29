(function () {

	"use strict";
	/*global console, alert */

	exports.info = {
		name: '11111111'
	};

	exports.test = function(args) {

		var driver = args.driver,
			chai = args.chai,
			reportItem = args.reportItem;

		console.log(reportItem);

		reportItem.addText('text test');

		driver.get("http://statlex.com/game/air/");

		driver.sleep(5000);

		reportItem.takeScreenShot({ label: 'label text' });

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