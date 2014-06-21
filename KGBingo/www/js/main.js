(function (win, doc, docElem) {

	"use strict";
	/*global window, document */
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

	// start of app here
	var main = function () {
		templateMaster.init();
		Backbone.history.start();
		APP.router.navigate('', {trigger: true});
	};

	win.addEventListener('load', main, false);

	// other data here


}(window, document, document.documentElement));