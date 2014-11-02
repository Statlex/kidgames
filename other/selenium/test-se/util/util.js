(function () {

	"use strict";
	/*global console, alert, mainConfig, module, process */

	module.exports = {
		keyList: ['isMobile', 'sendMail'],
		createWebDriverClient: function(args) {

			args = args || {};

			var webDriver = require('selenium-webdriver'),
				driver = new webDriver
				.Builder()
				.usingServer(args.isMobile ? mainConfig.host.mobile : '')
				.withCapabilities({ browserName: mainConfig.browserName })
				.build();

			driver.manage().window().setSize(mainConfig.screen.width, mainConfig.screen.height);

			return driver;

		},
		scrollTo: function(data) {

			var driver = data.driver,
				selector = data.selector,
				dY = data.dY || 0;

													// scroll to element			                // scroll by vertical offset
			driver.executeScript("document.querySelector('" + selector + "').scrollIntoView(true); window.scrollBy(0, " + dY + ");");

		},
		getArguments: function () {
			var data = {};
			process.argv.forEach(function (val) {
				var arr = val.split('=');
				data[arr[0]] = arr[1] || this.inKeyList(arr[0]);
			}, this);

			return data;
		},
		inKeyList: function(field) {
			return this.keyList.indexOf(field) !== -1;
		}


	};

}());