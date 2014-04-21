(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.AlertView = Backbone.View.extend({
		el: '.js-confirm-wrapper',
		events: {
			'click .js-ok': 'hide'
		},
		initialize: function() {
			this.template = templateContainer.templates.alert;
		},
		show: function(text) {
			this.$el.html(_.template(this.template, text));
			this.$el.show();
		},
		hide: function() {
			this.$el.hide();
			Backbone.history.history.back();
		}

	});

}(window, document, document.documentElement));