(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.DateInfoView = Backbone.View.extend({

		el: '.js-date-info-wrapper',
		events: {
			'click .js-hide-view': 'hide'
		},
		selectors: {
			details: '.js-date-details-wrapper'
		},
		initialize: function() {
			this.templates = {
				main: templateContainer.templates['date-info'],
				details: templateContainer.templates['date-info-details']
			};
			this.$el.html(_.template(this.templates.main, {}));
		},
		show: function() {
			// get template and add to wrapper
			this.$el.find(this.selectors.details).html(_.template(this.templates.details, {}));


			this.$el.show();
		},
		hide: function() {
			this.$el.hide();
			APP.router.navigate('', {trigger: true});
		}

	});


}(window, document, document.documentElement));