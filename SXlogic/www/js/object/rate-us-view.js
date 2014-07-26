(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global templateMaster, lang, Backbone, APP, info, $, clearInterval, setTimeout, location */

	win.APP = win.APP || {};

	win.APP.RateUsView = win.APP.MainView.extend({
		templates: ['rate-us'],
		events: {
//			'click .js-set-question': 'setQuestion',
//			'click .js-hint-button': 'showHint',
//			'click h1': 'test'
		},
		period: 1, // one day
		oneDayMs: 1000 * 60 * 60 * 24,
		parent: '.js-wrapper',
		init: function (data) {

			this.$el = $(this.tmpl['rate-us']({}));
			this.show();

		},
		show: function () {

			var now = Date.now(),
				lastShow = info.get('last-show-rate-us');

			if (now < (lastShow + this.period * this.oneDayMs * 0.00000000001 )) {
				return;
			}

			info.set('last-show-rate-us', now, true);

			APP.router.navigate('rate-us', {trigger: false});

			$(this.parent).append(this.$el);

			win.addEventListener('hashchange', function () {
				if (location.hash.replace('#', '') !== 'rate-us') {
					win.APP.rateUsView.remove();
				}
			}, false);

		},
		remove: function () {
			$('.js-rate-us-wrapper').remove();
		}


	});


	win.addEventListener('load', function () {

		// <!-- get data of first run
		if (info.get('was-rated')) {
			return;
		}

		if (!info.get('last-show-rate-us')) {
			info.set('last-show-rate-us', Date.now(), true);
		}
		// --> get data of first run

		setTimeout(function () {
			win.APP.rateUsView = new win.APP.RateUsView();
		}, 2000); // todo: 2000 -> 10-15 min

	}, false);


}(window, document, document.documentElement));