(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.AlertView = Backbone.View.extend({
		el: '.js-confirm-wrapper',
		events: {
//			'click .js-ok': 'hide'
		},
		initialize: function() {
			this.template = templateContainer.templates.alert;
		},
		show: function(text) {
			this.$el.html(_.template(this.template, text));
			this.$el.find('.js-ok').on('click' , this.hide.bind(this, false));
			APP.mainView.fade.show();
			this.$el.css('top', '50%');
		},
		hide: function(noHistoryBack) {
			//this.$el.hide();
			console.log('hide');
			console.log(noHistoryBack);
			if (!noHistoryBack) {
				Backbone.history.history.back();
			}
			APP.mainView.fade.hide();
			this.$el.css('top', '');
		}

	});

}(window, document, document.documentElement));