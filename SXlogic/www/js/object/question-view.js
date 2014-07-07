(function (win) {

	"use strict";
	/*global window */
	/*global bingo, $ */

	win.APP = win.APP || {};

	win.APP.QuestionView = win.APP.MainView.extend({
		templates: ['question'],
		events: {

		},
		init: function() {

			this.$el = $('<div class="question js-question"/>').html(this.tmpl.question({}));

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

		}





	});


}(window));