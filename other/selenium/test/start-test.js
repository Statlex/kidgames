(function () {

	"use strict";
	/*global console, alert, require */


	var util = require('./util/util.js').util,
		mainConfig = require('./cfg/main.js').config,// see main config -> main.js
		pathToConfig = mainConfig.const.pathToConfig,
		pathToTest = mainConfig.const.pathToTest,
		args = util.getArguments(),
		tests = args.cfg ? require(pathToConfig + args.cfg).config : require(pathToConfig + 'all.js').config,
		testList = args.testList;

	if (testList) {
		tests = {
			tests: testList.split(',')
		};
	}

	tests.tests.forEach(function(testName){

		var driver, test, chai, chaiWebdriver;

		driver = util.createWebDriverClient(args);

		chai = require('chai');
		chaiWebdriver = require('chai-webdriver');
		chai.use(chaiWebdriver(driver));

		test = require(pathToTest + testName).test;

		test({ driver: driver, chai: chai, args: args });

		driver.quit().then(function(){
			console.log(driver);
		});

	});


}());