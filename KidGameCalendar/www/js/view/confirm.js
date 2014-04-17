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
		show: function(text, fun) {
			console.log(text);
			this.$el.html(_.template(this.template, {text: text}));
			this.$el.show();
		},
		hide: function() {
			this.$el.hide();
			APP.router.navigate('', {trigger: true});
		}


	});

}(window, document, document.documentElement));