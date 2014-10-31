(function () {

	"use strict";
	/*global console, alert */

	exports.info = {
		name: 'load test',
		description: 'steps for test load app'
	};

	exports.test = function(args) {

		var driver = args.driver,
			chai = args.chai,
			reportItem = args.reportItem;

		driver.get("http://statlex.com/game/air/");

		reportItem.addText('test started');

		driver.wait(function() {
			return driver.findElement({css: '.js-wrapper'});
		}, 10000).then(function(){
			reportItem.takeScreenShot({ label: 'screen at load' });
			reportItem.setResult(reportItem.results.passed);
		}, function(){
			reportItem.setResult(reportItem.results.fail);
		});


	};


}());