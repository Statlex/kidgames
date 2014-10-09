(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP */

	var proto = APP.BaseView.extend();

	APP.TitleView = APP.BaseView.extend({

		events: {
			'click span': 'alert'
		},

		initialize: function() {
			APP.$wrapper.append(this.$el);
		},

		alert: function() {
			console.log('alert');
		}

	});



}(window, document, document.documentElement));