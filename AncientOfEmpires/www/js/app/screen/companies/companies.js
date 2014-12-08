(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP */

	win.APP = win.APP || {};

	APP.CompaniesView = APP.BaseView.extend({

		templates: ['companies'],

		events: {

		},

		init: function() {

			this.$el = $(this.tmpl.companies());

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

		}









	});

}(window));