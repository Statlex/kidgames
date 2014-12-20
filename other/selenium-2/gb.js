(function () {

	"use strict";
	/*global */

	var util = require('viaden-modules/util'),
		mainCfg = require('viaden-modules/config/main.js'),
		path = require('path'),
		Reporter = require('viaden-modules/reporter/reporter.js'),
		reporter = new Reporter(),
		args = util.get('args'),
		exception = require('viaden-modules/exception'),
		testList = args.testList;

	exception.startListener();



	util.getTest(testList).forEach(function(testFileName, index, arr){

		var driver, test, reportItem, url;

		driver = util.createWebDriverClient();

		test = require(path.resolve(util.getStartPath(), mainCfg.folder.test, testFileName)).test;

		reportItem = reporter.newItem({testFileName: testFileName, driver: driver});

		url = (args.url || mainCfg.url.gb.default) + args.urlPostfix;

		test({
			url: url,
			driver: driver,
			reportItem: reportItem,
			reporter: reporter
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


