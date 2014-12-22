(function () {

	"use strict";
	/*global */

	var TestParent = require('viaden-modules/test-parent');


	function Test() {

		this.cfg = {

		};

		this.cfg.relativeSelector = {};

		this.cfg.relativeSelector['.main-nav a[href="/"]'] = '#lobby';
		this.cfg.relativeSelector['.main-nav a[href="/gaming/all"]'] = '#allgames';
		this.cfg.relativeSelector['.main-nav a[href="/promotions"]'] = '#promoListView';

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
				falseFn = dep.falseFn,
				isFailed = false;

			//console.log(cfg);

			//reportItem.setResult(reportItem.results.passed);

			// wait for splash screen hide
			driver.wait(function () {
				return driver.findElement({ css: '#splash' }).isDisplayed().then(function (isDisplayed) {
					return !isDisplayed;
				})
			}, 10000)
			.then(function () {
				selector.footerLinks.forEach(function (linkSelector) {

					driver.findElement({ css: linkSelector }).click().then(function () {

						driver.sleep(1000).then(function () {
							driver.getCurrentUrl().then(function (url) {

								driver.findElement({ css: cfg.relativeSelector[linkSelector] }).then(dep.trueFn, function () {
									reportItem.setResult(reportItem.results.failed);
									isFailed = true;
								})
								.then(function () {
									if ( !isFailed ) {
										reportItem.setResult(reportItem.results.passed);
									}
									reportItem.takeScreenShot('url: ' + url + ', by links: ' + linkSelector);
								});

							});


						})

					})

				})

			})
			.then(function () {
				driver
					.findElement({ css: '.main-nav a[href="/gaming/all"]' }).click().then(function () {
						driver
							.sleep(1000)
							.then(function () {

								driver.findElements({ css: '.games-type-list:not(.m-fixed) .games-type-item-in' })
									.then(function (elems) {

										elems.forEach(function (elem, index) {

											elem.click().then(function () {
												driver.sleep(1000).then(function () {
													reportItem.takeScreenShot(String(index));
												})
											});

										});

										elems[0].click().then(function () {
											driver.sleep(1000).then(function () {
												reportItem.takeScreenShot(String(0));
											})
										});

									})

							})

					})

			})

		};

	}

	module.exports = Test;

	Test.prototype = new TestParent();

}());