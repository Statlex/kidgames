(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.MainMenuView = Backbone.View.extend({
		el: '.js-main-menu-wrapper',
		events: {

		},
		initialize: function() {
			var template = templateContainer.templates['main-menu'];
			this.$el.html(_.template(template, {}));

			this.$el.find('.js-calendar').on('click', this.showCalendar.bind(this));
			this.$el.find('.js-notes').on('click', this.showNotes.bind(this));
			this.$el.find('.js-time').on('click', this.showTime.bind(this));
			this.$el.find('.js-options').on('click', this.showOptions.bind(this));
			this.$el.find('.js-to-home').on('click', this.showHome.bind(this));

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
		},
		showHome: function() {
			APP.router.navigate('title', {replace: true, trigger: true}); // replace: true -> remove history
		}

	});

}(window, document, document.documentElement));