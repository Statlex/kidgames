(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.ConfirmView = Backbone.View.extend({
		el: '.js-confirm-wrapper',
		events: {
			'click .js-ok': 'ok',
			'click .js-cancel': 'hide'
		},
		initialize: function() {
			this.template = templateContainer.templates.confirm;
		},
		show: function(text, func, context) {
			this.$el.html(_.template(this.template, text));
			this.$el.show();
			if (func) {
				this.$el.find('.js-ok').on('click', func.bind(context || win));
			}
		},
		hide: function(noHistoryBack) {
			this.$el.hide();
			if (!noHistoryBack) {
				Backbone.history.history.back();
			}
		}


	});

}(window, document, document.documentElement));