(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP */

	win.APP = win.APP || {};

	APP.BattleView = APP.BaseView.extend({
		templates: ['battle'],
		events: {
//			'click .js-go-to-section': 'showSection'
		},
		init: function() {

			this.$el = $(this.tmpl.battle());

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

		}

	});

}(window));