(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.ConfirmView = Backbone.View.extend({
		el: '.js-confirm-wrapper',
		events: {
			'click .js-ok': 'ok'
		},
		initialize: function() {
			this.template = templateContainer.templates.confirm;
		},
		show: function(text, func, context) {
			APP.mainView.fade.show();
			this.$el.css('top', '50%');
			this.$el.html(_.template(this.template, text));
			if (func) {
				this.$el.find('.js-ok').on('click', func.bind(context || win));
			}
			this.$el.find('.js-cancel').on('click' , this.hide.bind(this, false));
		},
		hide: function(noHistoryBack) {
			if (!noHistoryBack) {
				Backbone.history.history.back();
			}
			this.$el.css('top', '');
			APP.mainView.fade.hide();
		}

	});

}(window, document, document.documentElement));