$(function(){

	"use strict";
	/*global window, document, console, alert */
	/*global GC, lang, templateContainer, info, APP, $, Backbone */

	lang.push(info.lang);

	templateContainer.init();

	window.APP = window.APP || {};

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'date-info': 'dateInfo'
		},
		home: function() {
			console.log('router:home');
			APP.dateInfo.hide();
		},
		dateInfo: function() {
			console.log('router:date info');
			APP.dateInfo.show();
		}
	});

	APP.router = new Router();

	APP.mainView = new GC.MainView();

	APP.mainMenuView = new GC.MainMenuView();

	APP.dateInfo = new GC.DateInfoView();

	// show calendar on app start
	APP.mainView.show('calendar');

	Backbone.history.start();

});