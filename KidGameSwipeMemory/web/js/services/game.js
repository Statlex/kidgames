(function (win) {

	"use strict";
	/*global console, alert, $, window, document */

	var game = {

		$field: false,
		directions: ['up', 'right', 'down', 'left'],
		start: function() {

			this.$field = $('.js-main-field');

			this.createLevel(1);

		},
		clearField: function() {
			this.$field.html('');
		},
		createLevel: function(number) {

			var util = $(),
				ii,
				arr = [],
				arrow,
				directions = util.duplicate(this.directions),
				data = {},
				html,
				obj;
			for (ii = 1; ii <= number; ii += 1) {

				obj = {
					arrow: util.shuffle(directions)[0],
					number: ii,
					isDone: false
				};
				arr.push(obj);
			}

			data.directions = arr;

			html = templateMaster.tmplFn['level'](data);
			this.$field.html(html);

		}


	};

	win.game = game;


}(window));