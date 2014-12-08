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
			'store': 'store',
			'maps': 'maps',
			'create-map': 'createMap',
			'companies': 'companies',
			'setting': 'setting'
		},

		title: function () {

			APP.titleView = new APP.TitleView({ currentView: APP.titleView });

		},

		battle: function () {

			$('.js-wrapper .js-status-bar').data('state', 'battle');
			APP.removeExtraView();

		},

		store: function () {

			$('.js-wrapper .js-status-bar').data('state', 'store');

		},

		maps: function() {

			APP.mapsView = new APP.MapsView();

		},

		createMap: function() {

			new APP.CreateMapView();

		},
		companies: function () {

			new APP.CompaniesView();

		},
		setting: function () {
			new APP.SettingView();

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