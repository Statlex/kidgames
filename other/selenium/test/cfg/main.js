(function () {

	"use strict";
	/*global console, alert */

	exports.config = {
		const: {
			seleniumHost: 'http://localhost:8080/wd/hub',
			path: {
				test: './test/',
				config: './cfg/',
				report: './report/',
				util: './util/'
			}
		}
	};

}());