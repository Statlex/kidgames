(function () {

	"use strict";
	/*global console, alert, require, exports, process */

	var mainConfig = require('./../cfg/main.js').config, // see main config -> main.js
		fs = require('fs');

	function Reporter() {

		this.data = {
			args: null,
			timeStart: new Date()
		};

		this.init();
		this.items = [];

	}

	Reporter.prototype = {
		newItem: function (data) {
			data.reporter = this;
			var item = new ReportItem(data);
			this.items.push(item);
			return item;
		},
		compile: function () {

			var pathToReport = mainConfig.const.path.report + this.dirName + '/' + this.dirName + '.html';

			fs.writeFile(pathToReport, this.template(this.reportTemplate)(this), function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("The report was saved in " + pathToReport);
				}
			});

			// create report

		},
		init: function () {

			this.data.args = JSON.parse(JSON.stringify(process.argv)); // get string with arguments

			// create folders

			var date = new Date();

			this.dirName = ['report',
				date.getFullYear(),
					date.getMonth() + 1,
				date.getDate(),
				date.getHours(),
				date.getMinutes(),
				date.getSeconds()].join('-').replace(/(-)(\d)(?!\d)/gi, function (match, p1, p2) {
					return p1 + '0' + p2;
				});

			fs.mkdir(mainConfig.const.path.report + this.dirName);
			fs.mkdir(mainConfig.const.path.report + this.dirName + '/screenshot');
			fs.readFile(mainConfig.const.path.util + 'report-template.html', "utf8", (function (err, data) {
				if (err) {
					return console.log(err);
				}
				this.reportTemplate = data;
			}.bind(this)));


		},
		template:  function (str) {
			return new Function("obj",
					"var p=[];obj=obj||{};with(obj){p.push('" + str
					.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=([\s\S]*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'") + "');} return p.join('');");
		}
	};


	function ReportItem(data) {

		this.data = {
			timeStart: new Date(),
			timeEnd: null,
			testFileName: data.testFileName,
			testInfo: require('./.' + mainConfig.const.path.test + data.testFileName).info || {},
			result: this.results.fail
		};

		this.reporter = data.reporter;
		this.driver = data.driver;
		this.items = [];

	}

	ReportItem.prototype = {
		results: {
			fail: 'fail',
			passed: 'passed'
		},
		setResult: function(result) {
			this.data.timeEnd = new Date();
			this.data.result = result;
		},
		addText: function (text) {

			this.items.push({
				type: 'text',
				text: text,
				timeStamp: new Date()
			});

			return this;

		},
		takeScreenShot: function (data) {

			var timeStamp = new Date(),
				item = {
					type: 'image',
					label: data.label || '',
					timeStamp: timeStamp,
					src: 'screenshot/screenshot-' + timeStamp.getTime() + '.png',
					screenShotSrc: mainConfig.const.path.report + this.reporter.dirName + '/screenshot/screenshot-' + timeStamp.getTime() + '.png'
				};

			this.driver.takeScreenshot().then(function (image, err) {

				fs.writeFile(item.screenShotSrc, image, 'base64');

			});

			this.items.push(item);


		}
	};


	exports.Reporter = Reporter;

}());