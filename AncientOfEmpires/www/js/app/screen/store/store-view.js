(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP */

	win.APP = win.APP || {};

	APP.StoreView = APP.BaseView.extend({
		templates: ['store'],
		events: {

		},
		init: function () {

			this.$el = $(this.tmpl.store());

			this.$wrapper = $('.js-wrapper');
			this.$wrapper.append(this.$el);

		}


	});

}(window));