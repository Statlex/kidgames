(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP */

	win.APP = win.APP || {};

	APP.TitleView = APP.BaseView.extend({
		templates: ['title'],
		events: {
			'click .js-go-to-battle': 'goToBattle'
		},
		init: function() {

			this.$el = $(this.tmpl.title());

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

		},
		goToBattle: function() {

			APP.router.navigate('battle', { trigger: true });
		}

	});

}(window));