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
				restPathArray,
				upPath;

			console.log('from');
			console.log(this.path.root);
			console.log(to, dirName);
			restPathArray = encodeURIComponent(restPath).split(pathDivider);

			restPathArray = restPathArray.filter(function(str){
				return !!str;
			});

			console.log(restPathArray);
			console.log('./' + new Array(restPathArray.length + 1).join('../') + this.path[to]);
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
		}

	};

}());