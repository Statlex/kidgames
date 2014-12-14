(function (win, doc) {

	"use strict";
	/*global window, document */
	/*global templateMaster, lang, Backbone, APP, info, history, setTimeout, $, util */

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
			util.forceReDraw($('.js-wrapper .js-status-bar')[0]);
			APP.removeExtraView();

		},

		store: function () {

			$('.js-wrapper .js-status-bar').data('state', 'store');
			util.forceReDraw($('.js-wrapper .js-status-bar')[0]);

		},

		maps: function() {

			if ( /^[\s\S]+?#battle$/.test(event.oldURL) ) {

				if ( confirm('are you sure to leave mission?') ) {
					APP.mapsView = new APP.MapsView();
				} else {
					history.forward();
				}
			} else {
				APP.mapsView = new APP.MapsView();
			}

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
		$('.js-battle-menu-wrapper').remove();
	};

	// start of app here
	function main() {
		templateMaster.init();
		Backbone.history.start();

		util.setWrapperStyle($('body'));

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