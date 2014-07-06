(function (win) {

	"use strict";
	/*global window */
	/*global bingo, $ */

	win.APP = win.APP || {};

	win.APP.TitleView = win.APP.MainView.extend({
		templates: ['title'],
		events: {
			'click .js-go-to-section': 'showSection'
		},
		init: function() {

			this.$el = $('<div class="title js-title"/>').html(this.tmpl.title({}));

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

		},
		showSection: function(e) {

			var $node = $(e.currentTarget),
				sectionName = $node.data('section-name');

			console.log(sectionName);

		}




	});


}(window));