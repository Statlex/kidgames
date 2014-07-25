(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global templateMaster, lang, Backbone, APP, info, $ */

	win.APP = win.APP || {};

	win.APP.RateUsView = win.APP.MainView.extend({
		templates: ['rate-us'],
		events: {
//			'click .js-set-question': 'setQuestion',
//			'click .js-hint-button': 'showHint',
			'click h1': 'test'
		},
		period: 1, // one day
		oneDayMs: 1000 * 60 * 60 * 24,
		parent: '.js-wrapper',
		init: function (data) {

			this.$el = $(this.tmpl['rate-us']({}));

			this.timeOutIntervalId = win.setInterval(this.show.bind(this), 1000);

		},
		show: function() {

			if (this.isShow) {
				return;
			}

			var now = Date.now(),
				lastShow = info.get('last-show-rate-us');

			if ( now < (lastShow + this.period * this.oneDayMs * 0.00000000001 ) ) {
				return;
			}

			this.isShow = true;
			$(this.parent).append(this.$el);

			info.set('last-show-rate-us', now, true);

			clearInterval(this.timeOutIntervalId);

		},
		remove: function() {
			$('.js-rate-us-wrapper').remove();
			clearInterval(this.timeOutIntervalId);
		},
		test: function() {
			console.log('test');
		}

	});


	win.addEventListener('load', function(){

		// <!-- get data of first run
		if ( info.get('was-rated') ) {
			return;
		}

		if ( !info.get('last-show-rate-us') ) {
			info.set('last-show-rate-us', Date.now(), true);
		}
		// --> get data of first run

		setTimeout(function(){

			win.APP.rateUsView = new win.APP.RateUsView();

		}, 2000);

		function hideRateUs() {

			if (!win.APP.rateUsView) {
				return;
			}

			win.APP.rateUsView.remove();
			delete win.APP.rateUsView;

		}

		win.addEventListener('hashchange', hideRateUs, false);

	}, false);


}(window, document, document.documentElement));