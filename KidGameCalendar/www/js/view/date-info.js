(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, templateContainer */

	win.GC = win.GC || {};

	win.GC.DateInfoView = Backbone.View.extend({

		el: '.js-date-info-wrapper',
		events: {
			'click .js-hide-view': 'hide'
		},
		initialize: function() {
			this.templates = {
				mainTemplate: templateContainer.templates['date-info']
			};
		},
		show: function() {
			this.$el.html(_.template(this.templates.mainTemplate, {}));
			this.$el.show();

		},
		hide: function() {
			APP.router.navigate('', {trigger: true});
			this.$el.hide();
		}


	});

}(window, document, document.documentElement));