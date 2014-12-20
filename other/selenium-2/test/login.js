(function () {

	"use strict";
	/*global */


	var selector = require('viaden-modules/config/css-selector'),
		util = require('viaden-modules/util'),
		trueFn = util.trueFn,
		falseFn = util.falseFn,
		cfg,
		//now = String(Date.now()),
		exception = require('viaden-modules/exception');

	cfg = {
		userName: 'govnokod', // text
		password: 'qwerty' // text
	};

	exports.info = {
		name: 'login test',
		description: 'login test for exist user',
		steps: [
			'load page',
			'open login form',
			'login'
		],
		expectedResult: 'All point in check list must be passed'
	};

	exports.test = function (args, asStep) {

		var driver = args.driver,
			reportItem = args.reportItem;

		if ( !asStep ) {

			reportItem.markStartTime();
			reportItem.addText('Start login test');

			driver.get(args.url).then(function () {

				exception.empty();

				exception.extend({
					url: args.url,
					args: util.get('args'),
					driver: driver,
					reporter: args.reporter
				});

			});

		}

		driver
			.wait(function () { // click to "login" button until this is displayed
				return driver.findElement({ css: selector.login.openLogin }).click().then(trueFn, falseFn);
			}, 10000);

		driver.findElement({ css: selector.login.userName }).sendKeys(cfg.userName);
		driver.findElement({ css: selector.login.password }).sendKeys(cfg.password);

		driver.findElement({ css: selector.login.loginSubmit }).click();

		driver
			.wait(function () {
				return driver.findElement({ css: selector.login.loginSuccessPopup }).isDisplayed().then(trueFn, falseFn);
			}, 10000)
			.then(function () {
				reportItem.takeScreenShot({label: 'Login success popup'});
			});

		driver.findElement({ css: selector.modalClose }).click();

		driver.sleep(1000).then(function () {

			if (!asStep) {
				reportItem.setResult(reportItem.results.passed);
			}

			reportItem.takeScreenShot({label: 'Login successful'});
		});

		driver.sleep(3000);

	};

}());
