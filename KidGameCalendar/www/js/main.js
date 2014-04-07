$(function(){

	"use strict";
	/*global window, document, console, alert */
	/*global GC, lang, templateContainer, info, APP, $ */

	lang.push(info.lang);

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'date-info': 'dateInfo'
		},
		home: function() {
			//APP.dateInfo.hide();
		},
		dateInfo: function() {
			APP.dateInfo.show();
		}
	});

	window.APP = window.APP || {};

	templateContainer.init();

	APP.router = new Router();

	APP.mainMenuView = new GC.MainMenuView();


	APP.dateInfo = new GC.DateInfoView();

	Backbone.history.start();

});