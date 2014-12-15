(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP */

	win.APP = win.APP || {};

	APP.TitleView = APP.BaseView.extend({

		templates: ['title'],

		events: {
			'click .js-go-to-select-map': 'goToSelectMap',
			'click .js-create-map': 'goToCreateMap',
			'click .js-go-to-companies': 'goToCompanies',
			'click .js-go-to-settings': 'goToSetting'
		},

		init: function() {

			this.$el = $(this.tmpl.title());

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

			this.disableScroll();

		},

		goToSelectMap: function() {
			APP.router.navigate('maps', { trigger: true });
		},

		goToCreateMap: function() {
			APP.router.navigate('create-map', { trigger: true });
		},
		goToCompanies: function () {

			APP.router.navigate('companies', { trigger: true });

		},
		goToSetting: function () {
			APP.router.navigate('setting', { trigger: true });

		}









	});

}(window));