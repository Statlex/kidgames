(function () {

	"use strict";
	/*global */

	var TestParent = require('viaden-modules/test-parent');

	function Test() {

		this.info = {
			name: 'deposit from card',
			description: 'deposit from card',
			steps: [
				'load page',
				'login',
				'open deposit',
				'open visa card',
				'reg visa card',
				'close successful popup',
				'close footer'
			],
			expectedResult: 'All point in check list must be passed'
		};

		this.cfg = {
			userName: 'govnokod',
			password: 'qwerty',
			amount: 13,
			cv2: 111
		};

		this.args = {};

		this.body = function () {

			var dep = this.dep,
				util = dep.util,
				selector = dep.selector,
				args = this.args,
				cfg = this.cfg,
				driver = args.driver,
				reportItem = args.reportItem,
				currentAmount,
				isFailed;

			selector.deposit = {
				amount: '#toggle-account .amount',
				amountField: '#amount',
				deposit: '[href="/payment/deposit"]',
				submitDeposit: '.account-wrap [type=button][name=submit]',
				card: '#registered-account-list li',
				quickAmountsItems: '.quick-amounts-list .quick-amount-item',
				cv2: '#cv2'

			};

			// login if needed

			driver.wait(function () {
				return driver.findElement({ css: selector.joinNow }).then(function () {
					var loginStep = require(dep.path.resolve(dep.util.getStartPath(), dep.mainCfg.folder.test, 'login.js'));
					loginStep = new loginStep();
					loginStep.extend('args', args);
					loginStep.extend('cfg', cfg);
					loginStep.mode = 'step';
					loginStep.run();
					return true;
				}, dep.falseFn);
			}, 10000).then(dep.trueFn, dep.falseFn);

			// get current amount
			driver.findElement({ css: selector.deposit.amount }).getInnerHtml().then(function (hmtl) {
				currentAmount = hmtl.trim();
			});

			// open footer
			driver.findElement({ css: selector.openFooter }).click();

			// go to deposit
			driver.wait(function () {
				return driver.findElement({ css: selector.deposit.deposit }).click().then(dep.trueFn, dep.falseFn);
			}, 5000);

			// click to card deposit
			driver.wait(function () {
				return driver.findElement({ css: selector.deposit.card }).click().then(dep.trueFn, dep.falseFn);
			}, 25000);

			// test quick amount button
			driver.findElements({ css: selector.deposit.quickAmountsItems }).then(function (elems) {

				elems.forEach(function (elem) {

					elem.click();

					elem.getInnerHtml().then(function (html) {
						html = html.replace(/[\D\s]/g, '');

						driver.findElement({ css: selector.deposit.amountField }).getAttribute('value').then(function (value) {

							value = value.replace(/[\D\s]/g, '');

							if (value !== html) {
								isFailed = true;
							}

						})

					});

				});

			});

			driver.findElement({ css: selector.deposit.amountField }).clear();
			driver.findElement({ css: selector.deposit.amountField }).sendKeys(cfg.amount);
			driver.findElement({ css: selector.deposit.cv2 }).sendKeys(cfg.cv2);
			driver.findElement({ css: selector.deposit.submitDeposit }).click();


		}

	}

	module.exports = Test;

	Test.prototype = new TestParent();

}());


