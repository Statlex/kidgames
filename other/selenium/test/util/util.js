(function () {

	"use strict";
	/*global console, alert */

	var webDriver = require('selenium-webdriver'),
		mainConfig = require('./../cfg/main.js').config,
		seleniumHost = mainConfig.const.seleniumHost;

	var util = {
		keyList: ['isMobile'],
		createWebDriverClient: function(args) {

			args = args || {};

			return new webDriver.
				Builder().
				usingServer(args.isMobile ? seleniumHost : '').
				withCapabilities({ browserName: "chrome" }).
				build();

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
			process.argv.splice(2).forEach(function (val) {
				var arr = val.split('=');
				data[arr[0]] = arr[1] || util.inKeyList(arr[0]);
			});

			return data;
		},
		inKeyList: function(field) {
			return util.keyList.indexOf(field) !== -1;
		}

	}

	exports.util = util;

}());