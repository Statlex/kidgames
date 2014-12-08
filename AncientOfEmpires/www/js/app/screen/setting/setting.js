(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP */

	win.APP = win.APP || {};

	APP.SettingView = APP.BaseView.extend({

		templates: ['setting'],

		events: {

		},

		init: function() {

			this.$el = $(this.tmpl.setting());

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

		}









	});

}(window));