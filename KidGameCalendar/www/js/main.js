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
			'date-info/:id': 'dateInfo',
			'confirm': 'confirm'
		},
		home: function() {
			console.log('router:home');
			APP.dateInfo.hide();
			APP.confirm.hide();
		},
		dateInfo: function(id) {
			console.log(id);
			console.log('router:date info');
			APP.dateInfo.show(id);
		},
		confirm: function() {
			//APP.confirm.show();
		}
	});

	APP.router = new Router();

	APP.mainView = new GC.MainView();

	APP.mainMenuView = new GC.MainMenuView();

	APP.dateInfo = new GC.DateInfoView();

	APP.confirm = new GC.ConfirmView();

	// show calendar on app start
	APP.mainView.show('calendar');

	Backbone.history.start();

});