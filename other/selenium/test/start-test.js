(function () {

	"use strict";
	/*global console, alert */


	var util = require('./util/util.js').util,
		mainConfig = require('./cfg/main.js').config,// see main config -> main.js
		pathToConfig = mainConfig.const.pathToConfig,
		pathToTest = mainConfig.const.pathToTest,
		args = util.getArguments();

	var tests = args.cfg ? require(pathToConfig + args.cfg).config : require(pathToConfig + 'all.js').config,
		testList = args.testList;

	if (testList) {
		tests = {
			tests: testList.split(',')
		}
	}

	tests.tests.forEach(function(testName){

		var driver, test;

		driver = util.createWebDriverClient(args);

		test = require(pathToTest + testName).test;

		test({ driver: driver, args: args });

		driver.quit();

	});


}());