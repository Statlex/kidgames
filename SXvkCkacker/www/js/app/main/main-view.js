(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP */

	win.APP = win.APP || {};

	APP.MainView = win.APP.BaseView.extend({
		templates: ['main'],
		events: {
//			'click .js-go-to-section': 'showSection'
		},
		init: function() {

			this.$el = $(this.tmpl.main());

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

			this.showLaws();

		},

		showLaws: function() {
			APP.lawView = new APP.LawView();
		}



	});

}(window));