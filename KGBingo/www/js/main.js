(function (win) {

	"use strict";
	/*global window */
	/*global templateMaster, Backbone, lang */

	lang.push('ru');

	window.APP = window.APP || {};

	var Router;

	Router = Backbone.Router.extend({
		routes: {
			'': 'title'
		},
		title: function() {


			new win.APP.TitleView();


		}
	});

	APP.router = new Router();



	// start of app here
	var main = function () {
		templateMaster.init();
		Backbone.history.start();
	};

	win.addEventListener('load', main, false);

	// other data here




}(window));