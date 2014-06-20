(function (win) {

	"use strict";
	/*global window */
	/*global bingo, $ */

	win.APP = win.APP || {};

	win.APP.TitleView = win.APP.MainView.extend({
		templates: ['title'],
		events: {
			'click .js-bingo-preview': 'startBingo'
		},
		init: function() {

			this.$el = $('<div class="title js-title"/>').html(this.tmpl.title({}));

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

		},

		startBingo: function(e) {

			var $node = $(e.currentTarget);

			win.APP.router.navigate($node.data('name'));
			
			new win.APP.BingoView($node.data());



		}


	});


}(window));