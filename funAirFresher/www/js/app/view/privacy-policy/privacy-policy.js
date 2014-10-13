(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP, _ */

	APP.PrivacyPolicyView = APP.BaseView.extend({

		events: {
			'click span': 'alert'
		},

		url: 'privacy-policy',

		constructor: function() {
			this.baseConstructor.apply(this, arguments);
		},

		alert: function() {
			console.log('alert');
		}

	});



}(window, document, document.documentElement));