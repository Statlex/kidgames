(function () {

	"use strict";
	/*global console, alert */

	var fs = require('fs'),
		pathHere = __dirname;

	function getFileList() {
		return fs.readdirSync(mainConfig.getPath('test', pathHere, 1));
	}


	exports.tests = getFileList();

}());