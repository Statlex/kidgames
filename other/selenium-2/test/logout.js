(function () {

	"use strict";
	/*global */


	var selector = require('viaden-modules/config/css-selector'),
		util = require('viaden-modules/util'),
		trueFn = util.trueFn,
		falseFn = util.falseFn,
		cfg,
		now = String(Date.now()),
		exception = require('viaden-modules/exception'),
		mainCfg = require('viaden-modules/config/main.js'),
		path = require('path');

	cfg = {
		eMail: 'viadenTest' + now.substr(-6) + '@gmail.com', // text
		phoneNumber: '+' + now.substr(-9), // tel
		userName: 'dima' + now.substr(-6), // text
		password: 'qwerty', // text
		confirmPassword: 'qwerty', // text
		firstName: 'Dima', // text
		lastName: 'Turov', // text
		birthDate: '07281985', // text
		postcode: 'm21da' // text
	};

	exports.info = {
		name: 'logout test',
		description: 'test logout user',
		steps: [
			'load page',
			'login',
			'logout'
		],
		expectedResult: 'All point in check list must be passed'
	};


	exports.test = function (args) {

		var driver = args.driver,
			reportItem = args.reportItem;

		reportItem.markStartTime();
		reportItem.addText('Start logout test');

		driver.get(args.url).then(function () {

			exception.empty();

			exception.extend({
				url: args.url,
				args: util.get('args'),
				driver: driver,
				reporter: args.reporter
			});

		});

		// login
		var loginStep = require(path.resolve(util.getStartPath(), mainCfg.folder.test, 'login.js')).test;
		loginStep(args, true);

		// open footer
		driver
			.wait(function () {
				return driver.findElement({ css: selector.openFooter }).click().then(trueFn, falseFn);
			}, 1000);


		// click to logout link
		driver
			.wait(function () {
				return driver.findElement({ css: selector.logout.openLogout }).click().then(trueFn, falseFn);
			}, 1000);


		// click to submit logout button
		driver
			.wait(function () {
				return driver.findElement({ css: selector.modal + ' ' + selector.logout.logoutSubmit }).click().then(trueFn, falseFn);
			}, 1000);

		// click check current modal is close
		driver
			.wait(function () {
				return driver.findElement({ css: selector.modal + ' ' + selector.logout.logoutSubmit }).isDisplayed().then(trueFn, falseFn);
			}, 2000)
			.then(
				function () {

				},
				function () {
					// confirm modal is not visible
					driver.findElement({ css: selector.modalClose }).click();
				}
			);

		driver.sleep(1000).then(function () {
			reportItem.setResult(reportItem.results.passed);
			reportItem.takeScreenShot({ label: 'Logout successful - logout state'});
		});

		driver.sleep(5000);

	};
















}());