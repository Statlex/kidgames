(function () {

	"use strict";
	/*global console, alert, require */

	global.mainConfig = require('./cfg/main.js'); // see main config -> main.js

	var mailUrl = 'https://passport.yandex.ru/registration/mail?mode=simplereg';

	var mainConfig = require('./cfg/main.js'),
		util = require('user/util/util.js'),
		bUtil = require('./util/index.js'),
		args = util.getArguments(),
		fs = require('fs'),
		path = require('path'),
		botDataPath = process.cwd() + '/bot-data/';

	bUtil.getAllUserFIO().forEach(function (user) {

		var fullUserName = user.join(''),
			pathToFile = path.normalize(botDataPath + fullUserName + '.txt'),
			data = {
				name: user,
				dob: Date.now(),
				yandexMail: {}
			};

			fs.writeFile(pathToFile, JSON.stringify(data), 'utf-8', function (err) {
				return err && console.log(err);
			});

		//}

	});

	//return;

	fs.readdir(path.normalize(botDataPath), function (err, fileList) {
		fileList.forEach(function (fileName) {

			var driver = util.createWebDriverClient(args),
				data = JSON.parse(fs.readFileSync(path.normalize(botDataPath) + fileName, 'utf-8')),
				i = 10;

			if (data.registered) {
				console.log(data.name.join(' ') + 'is registered' );
				driver.quit();
				return;
			}

			data.yandexMail = data.yandexMail || {};

			driver.get(mailUrl);

			data.yandexMail.firstname = data.name[1];
			driver.findElement({ css: '#firstname' }).sendKeys(data.name[1]);
			data.yandexMail.lastname = data.name[0];
			driver.findElement({ css: '#lastname' }).sendKeys(data.name[0]);

			function createLogin() {

				data.yandexMail.login = data.name[1]  + '.' + data.name[0] + (i || '');

				driver.findElement({ css: '#login' }).clear();
				driver.findElement({ css: '#login' }).sendKeys(data.yandexMail.login);
				driver.findElement({ css: 'body' }).click();

				driver.sleep('1000');

				driver.findElement({css: '.control__error__login_notavailable'}).click().then(function () {
					createLogin();
				}, function(){});

				i += 1;

			}

			createLogin();

			data.yandexMail.pass = bUtil.generatePass();

			driver.findElement({ css: '#password' }).sendKeys(data.yandexMail.pass);
			driver.sleep(1000);

			driver.findElement({ css: '#password_confirm' }).sendKeys(data.yandexMail.pass);
			driver.sleep(1000);

			driver.findElement({ css: '#hint_question_id' }).click();
			driver.sleep(1000);

			data.yandexMail.hintQuestion =  Math.round(Math.random() * 7) + 2;

			driver.findElement({ css: 'ul li:nth-child(' + data.yandexMail.hintQuestion + ')' }).click();
			driver.sleep(1000);

			data.yandexMail.hintAnswer = data.name[1] + ' ' + data.name[0];

			driver.findElement({ css: '#hint_answer' }).sendKeys(data.yandexMail.hintAnswer);
			driver.sleep(1000);

			driver.findElement({ css: '#answer' }).click();

			driver.wait(function () {
				return driver.getCurrentUrl().then(function (url) {

					if (url.indexOf('https://passport.yandex.ru/passport') !== -1) {
						driver.get('https://mail.yandex.by/');
					}

					return url.indexOf('https://mail.yandex.by/') !== -1;

				});
			}, 10000 * 1000);

			driver.wait(function () {

				return driver.findElement({ css: '.b-popup__close.daria-action' }).isDisplayed().then(function () {
					return true;
				}, function(){
					return false;
				});

			}, 100 * 1000);

			driver.findElement({ css: '.b-popup__close.daria-action' }).click().then(function () {

				data.registered = true;

				fs.writeFile(path.normalize(botDataPath + '/' + fileName), JSON.stringify(data), 'utf-8', function (err) {
					return err && console.log(err);
				});

				driver.sleep(5000);
				driver.quit();

			},
			function (err) {
				console.log(err);
			});

		});
	});

}());