(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP */

	win.APP = win.APP || {};

	APP.StoreView = APP.BaseView.extend({
		templates: ['store'],
		events: {

		},
		init: function (args) {

			var data = {},
				player = args.controller.activePlayer;

			data.unitList = APP.units.info.unitList;
			data.gold = player.gold;

			this.$el = $(this.tmpl.store(data));

			this.$wrapper = $('.js-wrapper');
			this.$wrapper.append(this.$el);

		}


	});

}(window));