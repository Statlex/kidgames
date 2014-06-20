(function (win) {

	"use strict";
	/*global window */
	/*global bingo, $ */

	win.APP = win.APP || {};

	win.APP.BingoView = win.APP.MainView.extend({
		templates: ['bingo'],
		events: {




		},
		init: function() {

			console.log(this.name);

			var obj = bingo[this.name];

			console.log(obj);

			this.$el = $('<div class="bingo js-bingo"/>').html(this.tmpl.bingo({}));

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

		}



	});


}(window));