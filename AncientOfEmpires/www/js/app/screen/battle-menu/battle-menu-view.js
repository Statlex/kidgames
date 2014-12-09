(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP, util */

	win.APP = win.APP || {};

	APP.BattleMenuView = APP.BaseView.extend({
		templates: ['battle-menu'],
		events: {
			//'click .js-buy-unit': 'buyUnit',
			//'click .js-get-unit-info': 'showUnitInfo'
		},
		init: function () {

			this.$el = $(this.tmpl['battle-menu']());

			this.$wrapper = $('.js-wrapper');
			this.$wrapper.find('.js-battle-menu-wrapper').remove();
			this.$wrapper.append(this.$el);

		}


	});

}(window));