(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.OptionsView = Backbone.View.extend({
		el: '.js-options-wrapper',
		events: {
			'click h1': 'test' // test field
		},
		initialize: function() {
			this.template = templateContainer.templates.options;
		},
		show: function() {
			this.$el.html(_.template(this.template, {}));
			this.$el.css('top', '0');
			this.setEvents();
		},
		hide: function(noHistoryBack) {
			//this.$el.hide();
			this.$el.css('top', '');
			if (!noHistoryBack) {
				Backbone.history.history.back();
			}
			this.$el.empty();
		},
		setEvents: function() {
			// add events to elements
			console.log(this.events);
		}

	});

}(window, document, document.documentElement));