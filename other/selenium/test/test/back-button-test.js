(function () {

	"use strict";
	/*global console, alert */

	exports.test = function(args) {

		var driver = args.driver,
			chai = args.chai,
			reportItem = args.reportItem;

		driver.get("http://statlex.com/game/air/");

		reportItem.addText('test started');

//		reportItem.takeScreenShot({ label: 'test started' });


		var airFreshBtn = '[data-route="air-fresh"]',
			backBtn = '.js-back';

		driver.wait(function() {

			// wait for button to air fresh screen
			return driver.findElement({css: airFreshBtn});

		}, 10000).then(function(){

			driver.findElement({css: airFreshBtn}).click();

			driver.sleep(1000);

//			driver.findElement({css: '.js-air-fresh'}).then(
//				function(){
//					chai.expect('.js-page-wrapper').dom.to.have.count(1).then(
//						function(){
//							console.log('1');
//							reportItem.addText('page wrapper is 1 on page');
//						},
//						function(){
//							console.log('2');
//							reportItem.addText('page wrapper is not 1 on page');
//							reportItem.setResult(reportItem.results.fail);
//						}
//					);
//
//				},
//				function(){
//					reportItem.addText('air fresher is BAD');
//					reportItem.setResult(reportItem.results.fail);
//				}
//			);

			driver.findElement({css: backBtn}).click();

//		driver.sleep(4000);

			reportItem.takeScreenShot({ label: 'end test' });

//		reportItem.setResult(reportItem.results.passed);

		});


/*
		driver.wait(function() {

			// wait for button to air fresh screen
			return chai.expect(airFreshBtn).dom.to.be.visible().then(function(){
				return true;
			}, function(){
				return false;
			});

		}, 10000).then(function(){
			driver.findElement({css: '[data-route="air-fresh"]'}).click();
		}, function(){
			reportItem.setResult(reportItem.results.fail);
		});

*/




	};


}());