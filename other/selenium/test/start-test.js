(function () {

	"use strict";
	/*global console, alert */


	var util = require('./util/util.js').util,
		mainConfig = require('./cfg/main.js').config,
		args = util.getArguments();

	console.log(args);

	var testConfig = args.cfg ? require(mainConfig.const.pathToConfig + args.cfg).config : require(mainConfig.const.pathToConfig + 'all.js').config;

	testConfig.tests.forEach(function(testName){

		var driver = util.createWebDriverClient(args),

			test = require(mainConfig.const.pathToTest + testName).test;

		test({ driver: driver });

		driver.quit();

	});


}());