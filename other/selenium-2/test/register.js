(function () {

	"use strict";
	/*global */

	var TestParent = require('viaden-modules/test-parent');


	function Test() {

		var now = String(Date.now());

		this.cfg = {
			eMail: 'viadenTest' + now.substr(-6) + '@gmail.com', // text
			//eMail: 'test@playtech.com', // text
			phoneNumber: '+' + now.substr(-9), // tel
			userName: 'dima' + now.substr(-6), // text
			password: 'qwerty', // text
			confirmPassword: 'qwerty', // text
			firstName: 'Dima', // text
			lastName: 'Turov', // text
			birthDate: '07281985', // text
			postcode: 'm21da' // text
		};

		this.info = {
			name: 'registration test',
			description: 'test registration for user register',
			steps: [
				'load page',
				'go to registration',
				'fill out all fields',
				'submit form',
				'accept terms and condition'
			],
			expectedResult: 'All point in check list must be passed'
		};

		this.args = {};

		this.body = function () {

			var dep = this.dep,
				selector = dep.selector,
				args = this.args,
				util = dep.util,
				cfg = this.cfg,
				driver = args.driver,
				reportItem = args.reportItem,
				trueFn = dep.trueFn,
				falseFn = dep.falseFn;

			//console.log(cfg);

			driver
				.wait(function () { // click to "join now" button until this is displayed
					return driver.findElement({css: selector.joinNow}).click().then(trueFn, falseFn);
				}, 10000);

			driver
				.wait(function () {
					return driver.findElement({css: selector.register.registrationForm}).then(trueFn, falseFn);
				}, 3000);


			driver.findElement({css: selector.register.eMail}).sendKeys(cfg.eMail).then(function () {
				console.log(cfg.eMail);
			});

			// close modal window if needed
			driver.findElement({css: 'body' }).click();
			driver.sleep(1000).then(function () {
				driver.findElement({ css: selector.modalClose }).click().then(trueFn, falseFn);
			});

			driver.sleep(1000);

			driver.findElement({css: selector.register.phoneNumber}).sendKeys(cfg.phoneNumber);

			driver.findElement({css: selector.register.userName}).sendKeys(cfg.userName);

			driver.findElement({css: selector.register.password}).sendKeys(cfg.password);

			driver.findElement({css: selector.register.confirmPassword}).sendKeys(cfg.confirmPassword);

			driver.findElement({css: selector.register.title}).click();

			driver.findElement({css: selector.register.firstName}).sendKeys(cfg.firstName);

			driver.findElement({css: selector.register.lastName}).sendKeys(cfg.lastName);

			driver.findElement({css: selector.register.birthDate}).sendKeys(cfg.birthDate);

			driver.findElement({css: selector.register.postcode}).sendKeys(cfg.postcode);

			driver.findElement({css: selector.register.postcodeFind}).click();

			driver
				.wait(function () {
					return driver.findElement({css: selector.register.postcodeSuggestion}).then(trueFn, falseFn);
				}, 1000)
				.then(function () {
					driver.findElement({css: selector.register.postcodeSuggestion}).click();
				});

			driver.findElement({css: selector.register.submit}).then(function (elem) {
				util.scrollTo(driver, selector.register.submit);
				elem.click();
			});

			driver
				.wait(function () {
					return driver.findElement({css: selector.register.termsContent}).then(trueFn, falseFn);
				}, 15000)
				.then(function () {
					driver.findElement({css: selector.register.termsSubmit}).click();
				});

			driver
				.wait(function () {
					return driver.findElement({css: selector.register.deposit}).then(trueFn, falseFn);
				}, 5000)
				.then(function () {
					reportItem.takeScreenShot('register successful window');
					driver.sleep(1000);
				});

			driver.findElement({ css: selector.modalClose }).click().then(function () {
				driver.sleep(1000).then(function () {
					reportItem.setResult(reportItem.results.passed);
					reportItem.takeScreenShot('after register');
				});

			});

		};

	}

	module.exports = Test;

	Test.prototype = new TestParent();

}());