(function (win, doc, docElem) {

	"use strict";
	/*global window, document, location */
	/*global templateMaster, Backbone, lang, APP, $ */

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

	$(win).on('hashchange', function(){

		var $description = $('.js-description');
		// hide info
		if (location.hash === '#info') {
			$description.show();
		} else {
			$description.hide();
		}

	});

	// start of app here
	var main = function () {
		templateMaster.init();
		Backbone.history.start();

		function back() {
			if (window.location.hash) {
				Backbone.history.history.back();
				win.setTimeout(back, 200);
			}
		}

		back();

	};

	win.addEventListener('load', main, false);

	// other data here

}(window, document, document.documentElement));