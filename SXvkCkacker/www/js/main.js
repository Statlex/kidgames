(function (win) {

	"use strict";
	/*global window */
	/*global templateMaster, lang, Backbone, APP, info, location, history */

	lang.push('ru');

	win.APP = win.APP || {};

	var Router;

	Router = Backbone.Router.extend({
		routes: {
			'': 'main'
		},
		main: function () {
			APP.mainView = new APP.MainView();
		}

	});

	APP.router = new Router();

	// start of app here
	function main() {
		templateMaster.init();
		Backbone.history.start();

		function back() {
			if (location.hash) {
				history.back();
				win.setTimeout(back, 200);
			}
		}

		back();
	}

	win.addEventListener('load', main, false);
//	win.addEventListener('resize', resize, false);

	// other data here

}(window));