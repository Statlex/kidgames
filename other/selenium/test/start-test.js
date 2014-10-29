(function () {

	"use strict";
	/*global console, alert, require */

	var util = require('./util/util.js').util,
		Reporter = require('./util/reporter.js').Reporter,
		reporter = new Reporter(),
		mainConfig = require('./cfg/main.js').config,// see main config -> main.js
		args = util.getArguments(),
		tests;

	if (args.testList) {
		tests = {
			tests: args.testList.split(',')
		};
	} else {
		tests = require(mainConfig.const.path.config + (args.cfg || 'all.js') ).config;
	}

	tests.tests.forEach(function(testName, index, arr){

		var driver, test, chai, chaiWebdriver;

		// detect last item
		driver = util.createWebDriverClient(args);

		chai = require('chai');
		chaiWebdriver = require('chai-webdriver');
		chai.use(chaiWebdriver(driver));

		test = require(mainConfig.const.path.test  + testName).test;

		test({
			driver: driver,
			chai: chai,
			args: args,
			reportItem: reporter.newItem({testName: testName, driver: driver})
		});

		driver.quit().then(function(){

			if (index === arr.length - 1) { // check last item
				reporter.compile();
			}

		});

	});


}());