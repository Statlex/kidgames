(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP, _ */

	APP.PrivacyPolicyView = APP.BaseView.extend({

		events: {
			'click span': 'alert'
		},

		constructor: function() {
			var proto = APP.BaseView.prototype;
			this.events = _.extend( {}, proto.events, this.events );
			proto.constructor.apply( this, arguments );
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