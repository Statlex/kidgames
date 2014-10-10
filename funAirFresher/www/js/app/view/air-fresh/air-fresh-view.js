(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP, _ */

	APP.AirFreshView = APP.BaseView.extend({

		events: {
			'click span': 'alert'
		},

		constructor: function() {
			this.baseConstructor.apply(this, arguments);
		},

		initialize: function() {

			this.baseInitialize();

			APP.$wrapper.append(this.$el);
		},

		alert: function() {
			console.log('alert');
		}

	});



}(window, document, document.documentElement));