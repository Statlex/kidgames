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

			var data = {};

			data.unitList = APP.units.info.unitList;

			this.$el = $(this.tmpl.store(data));

			this.$wrapper = $('.js-wrapper');
			this.$wrapper.append(this.$el);

		}


	});

}(window));