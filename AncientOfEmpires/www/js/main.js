(function (win, doc) {

	"use strict";
	/*global window, document */
	/*global templateMaster, lang, Backbone, APP, info, history, setTimeout, $ */

	lang.push('en');

	window.APP = window.APP || {};

	var Router;

	Router = Backbone.Router.extend({

		routes: {
			'': 'title',
			'battle': 'battle',
			'store': 'store'
		},

		title: function () {
			APP.titleView = new APP.TitleView({ currentView: APP.titleView });
		},
		battle: function () {

			APP.removeExtraView();

			if ( doc.querySelector('.js-battle-screen') ) {
				return;
			}

			APP.battleView = new APP.BattleView();

		},
		store: function () {
			APP.storeView = new APP.StoreView();
		}

	});

	APP.router = new Router();

	APP.removeExtraView = function() {
		$('.js-store-wrapper').remove();
	};

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

}(window, document));