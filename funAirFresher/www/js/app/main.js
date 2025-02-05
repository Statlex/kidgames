(function (win, doc) {

	"use strict";
	/*global window, document, console */
	/*global APP, $, Backbone, location, history, setTimeout */

	win.APP = win.APP || {};

	APP.Router = Backbone.Router.extend({

		routes: {
			'': 'title',
			'air-fresh': 'airFresh',
			'how-it-works': 'howItWorks'
		},

		title: function () {

			if ( APP.$wrapper.find('.js-title').length ) {
				return;
			}

			APP.titleView = new APP.TitleView({el: $(APP.templateMaster.tmplFn.title())});

		},

		airFresh: function() {

			if (APP.airFreshView) {
				APP.airFreshView.clearTimeOuts();
			}

			if ( APP.$wrapper.find('.js-air-fresh').length ) {
				return;
			}

			APP.airFreshView = new APP.AirFreshView({el: $(APP.templateMaster.tmplFn['air-fresh']())});

		},

		howItWorks: function() {

			if ( APP.$wrapper.find('.js-how-it-works').length ) {
				return;
			}

			APP.howItWorks = new APP.HowItWorksView({el: $(APP.templateMaster.tmplFn['how-it-works']())});

		}

	});

	APP.router = new APP.Router();

	// start of app here
	function main() {

		APP.$wrapper = $('.js-wrapper');
		APP.wrapper = doc.querySelector('.js-wrapper');

		// set font size
		APP.util.setWrapperStyle(APP.$wrapper);

		APP.templateMaster.init();
		Backbone.history.start();

		function back() {

			if (Backbone.history.fragment) {
				Backbone.history.history.back();
				setTimeout(back, 200);
			}
		}

		back();

	}

	$(main);

}(window, document));

