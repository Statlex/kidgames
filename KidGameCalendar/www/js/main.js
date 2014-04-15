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
			'date-info/:id': 'dateInfo'
		},
		home: function() {
			console.log('router:home');
			APP.dateInfo.hide();
		},
		dateInfo: function(id) {
			console.log(id);
			console.log('router:date info');
			APP.dateInfo.show(id);
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