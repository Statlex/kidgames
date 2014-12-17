(function () {

	"use strict";
	/*global */

	var util = require('viaden-modules/util'),
		mainCfg = require('viaden-modules/config/main.js'),
		path = require('path'),
		Reporter = require('viaden-modules/reporter/reporter.js'),
		reporter = new Reporter()

	;

	util.getTest().forEach(function(testFileName, index, arr){

		var driver, test;

		driver = util.createWebDriverClient();

		test = require(path.resolve(util.getStartPath(), mainCfg.folder.test, testFileName)).test;

		test({
			driver: driver,
			reportItem: reporter.newItem({testFileName: testFileName, driver: driver})
		});


		if (index === arr.length - 1) { // check last item
			driver.quit().then(function(){
				reporter.compile();
			});
		} else {
			driver.quit();
		}

	});



}());


