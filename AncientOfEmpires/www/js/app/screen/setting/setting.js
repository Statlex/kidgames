(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP */

	/*
	* setting
	* 1 - music off/on
	* 2 - ask for switch turn
	* 3 - animation speed -                 slow - 1 2 [3] 4 5 - fast
	*
	*
	* */

	/*

	[*] music
	[*] end turn confirm

	 animation speed
	 slow - 1 2 [3] 4 5 - fast

*/


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