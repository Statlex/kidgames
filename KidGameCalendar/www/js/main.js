/*global $ */
$(function(){

	"use strict";
	/*global window, document, console, alert */
	/*global GC, lang, templateContainer, info, APP, $, Backbone */

	lang.push('en');

	lang.push(info.lang);

	templateContainer.init();

	window.APP = window.APP || {};

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'date-info': 'dateInfo',
			'confirm': 'confirm',
			'options': 'options',
			'help': 'help',
			'title': 'title'
//			'options:/id': 'options'
		},
		home: function() {
			console.log('router:home');
			APP.dateInfo.hide(true);
			APP.confirm.hide(true);
			APP.alert.hide(true);
			APP.options.hide(true);
			APP.help.hide(true);
			APP.mainView.fade.hide();
			APP.title.hide();
			APP.closeDatePicker();
		},
		title: function() {
			APP.title.show();
			APP.window.hide();
			APP.closeDatePicker();
		},
		dateInfo: function() {
			console.log('router:dateInfo');
			//APP.dateInfo.show();
		},
		confirm: function() {
			console.log('router:confirm');
			//APP.confirm.show();
		},
		options: function() {
			// detect id
			console.log('show options');
			APP.options.show();
			APP.window.hide(true);
			// hide all view from options
			//APP.confirm.show();
		},
		help: function() {
			APP.help.show();
			console.log('show help');
		}

	});

	APP.router = new Router();

	APP.closeDatePicker = function() {
		if (APP.datePicher && APP.datePicher.close) {
			APP.datePicher.close();
			APP.datePicher = false;
			delete APP.datePicher;
			console.log('datePickerClose');
		}
	};

	APP.mainView = new GC.MainView();

	APP.mainMenuView = new GC.MainMenuView();

	APP.dateInfo = new GC.DateInfoView();

	APP.confirm = new GC.ConfirmView();

	APP.alert = new GC.AlertView();

	APP.options = new GC.OptionsView();

	APP.help = new GC.HelpView();

	APP.window = new GC.WindowView();

	APP.cycleDelayed = new GC.CycleDelayedView();

	APP.title = new GC.TitleView();

	//APP.cycleDelayed.show();

	// show calendar on app start
	APP.mainView.show('calendar');

	Backbone.history.start();

	// go to title page
	APP.router.navigate('title', {trigger: true});

	// go to calendar page
	//APP.router.navigate('', {trigger: true});

});