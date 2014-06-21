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

			var obj = this.copyObject(bingo[this.name]);

			console.log(obj);

			this.$el = $('<div class="bingo js-bingo"/>').html(this.tmpl.bingo(obj));

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

		},
		copyObject: function(obj) {
			return JSON.parse(JSON.stringify(obj));
		}



	});


}(window));