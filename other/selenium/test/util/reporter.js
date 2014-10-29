(function () {

	"use strict";
	/*global console, alert */

	var mainConfig = require('./../cfg/main.js').config, // see main config -> main.js
		fs = require('fs');

	function Reporter() {

		this.data = {
			args: null,
			timeStamp: Date.now()
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

			console.log(this);

			fs.writeFile(mainConfig.const.path.report + this.dirName + '/rerer!!!!', "Hey there!", function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log(mainConfig.const.path.report + "The file was saved!");
				}
			});

			// create report

		},
		init: function () {

			this.data.args = process.argv; // get string with arguments

			// create folders

			var date = new Date();

			this.dirName = ['report',
				date.getFullYear(),
					date.getMonth() + 1,
				date.getDate(),
				date.getHours(),
				date.getMinutes(),
				date.getSeconds()].join('-').replace(/(^|-)(\d)(-|$)/gi, function (match, p1, p2, p3, offset, string) {
					return [p1, '0' + p2, p3].join('')
				});

			fs.mkdirSync(mainConfig.const.path.report + this.dirName);
			fs.mkdirSync(mainConfig.const.path.report + this.dirName + '/screenshot');


		}
	};


	function ReportItem(data) {

		this.data = {
			timeStamp: Date.now(),
			testName: data.testName
		};

		this.reporter = data.reporter;
		this.driver = data.driver;
		this.items = [];

	}

	ReportItem.prototype = {
		addText: function (text) {

			this.items.push({
				text: text,
				timeStamp: Date.now()
			});

			return this;

		},
		takeScreenShot: function (data) {

			var timeStamp = Date.now(),
				item = {
					label: data.label || '',
					timeStamp: timeStamp,
					src: mainConfig.const.path.report + this.reporter.dirName + '/screenshot/screenshot-' + timeStamp + '.png'
				};

			this.driver.takeScreenshot().then(function (image, err) {

				fs.writeFile(item.src, image, 'base64', function (err) {
					console.log(err);
				});

			});

			this.items.push(item);


		}
	};


	exports.Reporter = Reporter;

}());