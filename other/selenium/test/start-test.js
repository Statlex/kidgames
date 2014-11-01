(function () {

	"use strict";
	/*global console, alert, require */

	var mainConfig = require('./cfg/main.js').config, // see main config -> main.js
		util = require(mainConfig.const.path.util + 'util.js').util,
		Reporter = require(mainConfig.const.path.util + 'report/reporter.js').Reporter,
		reporter = new Reporter(),
		args = util.getArguments(),
		tests;

	if (args.testList) {
		tests = {
			tests: args.testList.split(',')
		};
	} else {
		tests = require(mainConfig.const.path.config + (args.cfg || 'all.js') ).config;
	}

	tests.tests.forEach(function(testFileName, index, arr){

		var driver, test, chai, chaiWebdriver;

		// detect last item
		driver = util.createWebDriverClient(args);

		driver.manage().timeouts().implicitlyWait(1000);

		chai = require('chai');
		chaiWebdriver = require('chai-webdriver');
		chai.use(chaiWebdriver(driver));

		test = require(mainConfig.const.path.test  + testFileName).test;

		test({
			driver: driver,
			chai: chai,
			args: args,
			reportItem: reporter.newItem({testFileName: testFileName, driver: driver})
		});

		driver.quit().then(function(){

			if (index === arr.length - 1) { // check last item
				reporter.compile();
			}

		});

	});


}());