(function () {

	"use strict";
	/*global console, alert, process, module */

	// get root path

	var pathDivider = '%5C',
	rootPath = process.argv[1];
	rootPath = encodeURIComponent(rootPath).split(pathDivider);
	rootPath.pop();
	rootPath = decodeURIComponent(rootPath.join(pathDivider));

	module.exports = {

		getPath: function(to, dirName, q) {

			var restPath = dirName.replace(this.path.root, ''),
				restPathArray;

			restPathArray = encodeURIComponent(restPath).split(pathDivider);

			restPathArray = restPathArray.filter(function(str){
				return !!str;
			});

			return './' + new Array(restPathArray.length + 1 - (q || 0)).join('../') + this.path[to];

		},

		path: {
			root: rootPath,
			test: 'test/',
			config: 'cfg/',
			report: 'report/',
			util: 'util/'
		},
		host: {
			mobile: 'http://localhost:8080/wd/hub'
		},
		browserName: 'chrome',
		screen: {
			width: 320,
			height: 480
		}

	};

}());