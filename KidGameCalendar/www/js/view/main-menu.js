(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	win.APP = win.APP || {};

	win.APP.MainMenuView = Backbone.View.extend({
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
			console.log(1);
		},
		showNotes: function() {
			console.log(2);
		},
		showTime: function() {
			console.log(3);
		},
		showOptions: function() {
			console.log(4);
		}

	});

}(window, document, document.documentElement));