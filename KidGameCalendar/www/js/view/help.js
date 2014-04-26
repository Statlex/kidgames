(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.HelpView = Backbone.View.extend({
		el: '.js-confirm-wrapper',
		events: {
//			'click .js-ok': 'hide'
		},
		initialize: function() {
			this.template = templateContainer.templates.help;
		},
		show: function() {
			this.$el.html(_.template(this.template, {}));
			this.$el.show();
		},
		hide: function(noHistoryBack) {
			this.$el.hide();
			if (!noHistoryBack) {
				Backbone.history.history.back();
			}
		}

	});

}(window, document, document.documentElement));