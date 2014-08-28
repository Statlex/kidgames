(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP */

	win.APP = win.APP || {};

	APP.LawView = win.APP.BaseView.extend({
		templates: ['law'],
		events: {
//			'click .js-go-to-section': 'showSection'
		},
		init: function() {

			console.log('law');

//			this.$el = $(this.tmpl.main({}));
//
//			this.$wrapper = $('.js-wrapper');
//
//			this.$wrapper.html('');
//
//			this.$wrapper.append(this.$el);
//
//			this.showLaws();

		}



	});

}(window));