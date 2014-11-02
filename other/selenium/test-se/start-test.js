(function () {

	"use strict";
	/*global console, alert, require */

	global.mainConfig = require('./cfg/main.js'); // see main config -> main.js

	var pathHere = __dirname,
		util = require(mainConfig.getPath('util', pathHere) + 'util.js'),
		Reporter = require(mainConfig.getPath('util', pathHere) + 'reporter/reporter.js'),
		reporter = new Reporter(),
		args = util.getArguments(),
		tests;


	if (args.testList) {
		tests = {
			tests: args.testList.split(',')
		};
	} else {
		tests = require(mainConfig.getPath('config', pathHere) + (args.cfg || 'all.js')).config;
		console.log(tests);
	}

	tests.tests.forEach(function(testFileName, index, arr){

		var driver, test, chai, chaiWebdriver;

		// detect last item
		driver = util.createWebDriverClient(args);

//		driver.manage().timeouts().implicitlyWait(1000);

		chai = require('chai');
		chaiWebdriver = require('chai-webdriver');
		chai.use(chaiWebdriver(driver));

		test = require(mainConfig.getPath('test', pathHere) + testFileName).test;

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