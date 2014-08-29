(function (win) {

	"use strict";
	/*global window */
	/*global templateMaster, lang, Backbone, APP, info, history, setTimeout */

	lang.push('en');

	window.APP = window.APP || {};

	var Router;

	Router = Backbone.Router.extend({

		routes: {
			'': 'title',
			'battle': 'battle'
		},

		title: function () {
			APP.titleView = new APP.TitleView();
		},
		battle: function () {
			APP.battleView = new APP.BattleView();

		}

	});

	APP.router = new Router();

	// start of app here
	function main() {
		templateMaster.init();
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

	// other data here

}(window));