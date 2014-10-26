(function () {

	"use strict";
	/*global console, alert */

	var fs = require('fs'),
		mainConfig = require('./main.js').config;

	function getFileList() {
		return fs.readdirSync(mainConfig.const.pathToTest);
	}

	exports.config = {
		tests: getFileList()
	};

}());