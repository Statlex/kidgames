(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.MainMenuView = Backbone.View.extend({
		el: '.js-main-menu-wrapper',
		events: {
			'click .js-calendar': 'showCalendar',
			'click .js-notes': 'showNotes',
			'click .js-time': 'showTime',
			'click .js-options': 'showOptions'
		},
		initialize: function() {
			var template = templateContainer.templates['main-menu'];
			this.$el.html(_.template(template, {}));
		},
		showCalendar: function() {
			APP.mainView.show('calendar');
		},
		showNotes: function() {
			APP.mainView.show('notes');
		},
		showTime: function() {
			APP.mainView.show('time');
		},
		showOptions: function() {
			APP.router.navigate('options', {trigger: true});
			APP.options.show();
		}

	});

}(window, document, document.documentElement));