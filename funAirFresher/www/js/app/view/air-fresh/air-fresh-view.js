(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global APP, _ */

	APP.AirFreshView = APP.BaseView.extend({

		events: {

		},

		url: 'air-fresh',

		proto: APP.BaseView.prototype,

		constructor: function() {
			this.baseConstructor.apply(this, arguments);
		},
		initialize: function() {
			this.proto.initialize.apply(this, arguments);
		}


	});



}(window, document, document.documentElement));