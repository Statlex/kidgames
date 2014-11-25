(function () {

	"use strict";
	/*global console, alert, require */

	global.mainConfig = require('./cfg/main.js'); // see main config -> main.js

	var gmailUrl = 'https://accounts.google.com/SignUp';

	var mainConfig = require('./cfg/main.js'),
		util = require('user/util/util.js'),
		args = util.getArguments(),
		path = require('path'),
		tests;


	[1].forEach(function (value) {

		var driver = util.createWebDriverClient(args);

		driver.get(gmailUrl);

		driver.findElement({ css: '#FirstName' }).sendKeys('dima');
		driver.findElement({ css: '#LastName' }).sendKeys('dimchev');

		var i = 1;
		
		function getGmailName() {

			driver.findElement({ css: '#GmailAddress' }).clear();
			driver.findElement({ css: '#GmailAddress' }).sendKeys('restFullAppIsHere' + i);
			driver.findElement({ css: 'body' }).click();


			driver.sleep('1000');

			driver.findElement({css: '#username-errormsg-and-suggestions'}).click().then(function () {
				getGmailName();
			}, function(){
			});

			i++;

		}

		getGmailName();

		driver.findElement({ css: '#password-label' }).click();
		driver.findElement({ css: '#Passwd' }).sendKeys('asEr125ASd');
		driver.findElement({ css: '#confirm-password-label' }).click();
		driver.findElement({ css: '#PasswdAgain' }).sendKeys('asEr125ASd');


		driver.findElement({ css: '#BirthDay' }).sendKeys(i);
		driver.findElement({ css: '#BirthYear' }).sendKeys(1980 + i);


		// set month
		driver.findElement({ css: '#month-label' }).click();
		driver.findElement({ css: '#month-label .goog-menuitem:nth-child(4)' }).click();

		// set gender
		driver.findElement({ css: '#gender-form-element' }).click();
		driver.findElement({ css: '#gender-form-element .goog-menuitem:nth-child(1)' }).click();






		driver.findElement({ css: '#TermsOfService' }).click();


		driver.sleep(5000);

//		driver.quit();


	});









}());