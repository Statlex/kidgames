(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document, setTimeout, clearTimeout */
	/*global APP, $*/

	APP.AirFreshView = APP.BaseView.extend({

		events: {

		},

		url: 'air-fresh',

		proto: APP.BaseView.prototype,

		constructor: function() {
			this.baseConstructor.apply(this, arguments);
		},
		initialize: function() {
			this.proto.initialize.apply(this, arguments);

			this.setTimers();

			this.clearFullTime = APP.util.getRandom(2 * 6, 4 * 6) * 1000;

			this.firstStepTime = APP.util.getRandom(1, 3) * 1000;

			this.transitionTime = 1000;

			this.setTimeOuts();

		},

		setTimers: function() {
			var timers = {
				hideDataCollection: APP.util.getRandom(2, 4),
				clearingLine: []
			},
			i;

			for (i = 0; i < 7; i += 1) {
				timers.clearingLine.push(APP.util.getRandom(100));
			}

			timers.clearingLine = timers.clearingLine.concat([1, 5, 10, 100]);

			timers.clearingLine = timers.clearingLine.sort(function(a, b){
				return a - b;
			});

			this.timers = timers;

		},

		setTimeOuts: function() {

			this.timeoutIds = {};

			this.timeoutIds.hideDataCollection = setTimeout(function() {
				APP.$wrapper.find('.js-getting-air-data').remove();
				APP.$wrapper.find('.js-clearing-line-wrapper').removeClass('hidden');
			}, this.timers.hideDataCollection * 1000);

			this.timers.clearingLine.forEach(function(value){
				this.timeoutIds[value] = setTimeout(function(width){
					APP.$wrapper.find('.js-clearing-line').html(width + '%').css('width', width + '%');
				}.bind(this, value), value * this.clearFullTime / 100 + this.firstStepTime);

			}, this);

			this.timeoutIds.clearFullTime = setTimeout(function(){
				alert(APP.langMaster.airHasBeenClean);
			}, this.clearFullTime + this.firstStepTime + this.transitionTime); // see css

		},

		clearTimeOuts: function() {
			$.each(this.timeoutIds, function(key, value) {
				clearTimeout(value);
			});
		}


	});



}(window, document, document.documentElement));