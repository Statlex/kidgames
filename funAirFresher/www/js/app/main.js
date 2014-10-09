(function (win, doc) {

	"use strict";
	/*global window, document, console */
	/*global APP, $, Backbone, location, history, setTimeout */

	win.APP = win.APP || {};

	APP.Router = Backbone.Router.extend({

		routes: {
			'': 'title'
		},

		title: function () {
			APP.titleView = new APP.TitleView({el: $(APP.templateMaster.tmplFn.title())});
			console.log('route title');

		}

	});

	APP.router = new APP.Router();

	// start of app here
	function main() {

		APP.$wrapper = $('.js-wrapper');
		APP.wrapper = doc.querySelector('.js-wrapper');

		APP.templateMaster.init();
		Backbone.history.start();

		function back() {
			if (win.location.hash) {
				history.back();
				setTimeout(back, 200);
			}
		}

		back();
	}

	win.addEventListener('load', main, false);

}(window, document));