(function (win) {

	"use strict";
	/*global window */
	/*global templateMaster, lang, Backbone, APP */

	lang.push('ru');

	window.APP = window.APP || {};

	var Router;

	Router = Backbone.Router.extend({
		routes: {
			'': 'title'
		},
		title: function() {
			APP.titleView = new win.APP.TitleView();
		}
	});

	APP.router = new Router();


	// start of app here
	function main () {
		templateMaster.init();
		Backbone.history.start();

		function back() {
			if (window.location.hash) {
				Backbone.history.history.back();
				win.setTimeout(back, 200);
			}
		}

		back();
	}

	win.addEventListener('load', main, false);

	// other data here


}(window));