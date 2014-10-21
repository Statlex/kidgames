(function () {

	"use strict";
	/*global */

	console.log('//');

	var webdriver = require('selenium-webdriver');

	var driver = new webdriver.Builder().
		withCapabilities(webdriver.Capabilities.chrome()).
		build();

	driver.get('http://www.google.com');
	var promise = driver.getTitle();

	promise.then(function(title) {
		console.log("title is: " + title);
	});

	promise.then(function(title) {
		console.log("title still is: " + contents);
	});

	driver.quit();

}());