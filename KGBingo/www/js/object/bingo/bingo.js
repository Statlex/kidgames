(function (win) {

	"use strict";
	/*global window */
	/*global bingo, $ */

	win.APP = win.APP || {};

	win.APP.BingoView = win.APP.MainView.extend({
		templates: ['bingo'],
		events: {

			'click .js-bingo-word': 'setWord'


		},
		selectors: {

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
		},
		setWord: function(e) {
			var $node = $(e.currentTarget);

			if ($node.data('checked') === 'true') {
				$node.data('checked', 'false');
				$node.removeClass('checked');
			} else {
				$node.data('checked', 'true');
				$node.addClass('checked');
			}

			this.bingoTest();

		},
		bingoTest: function() {
			var table = this.$el.find('.js-words-tablet'),
				i, diagonal_1 = [], diagonal_2 = [], $nodes, isBingo, $row, $column, diagonalNode;

			for (i = 1; i <= 5; i += 1) {

				// get diagonal data
				diagonalNode = this.$el.find('.js-words-tablet .table-row:nth-child(' + i + ') .table-cell:nth-child(' + i + ') [data-checked="true"]');
				if (!diagonalNode.isEmpty()) {
					diagonal_1.push(diagonalNode);
				}

				diagonalNode = this.$el.find('.js-words-tablet .table-row:nth-child(' + i + ') .table-cell:nth-child(' + (6 - i) + ') [data-checked="true"]');
				if (!diagonalNode.isEmpty()) {
					diagonal_2.push(diagonalNode);
				}

				// horizontal test
				$row = this.$el.find('.js-words-tablet .table-row:nth-child(' + i + ')');
				$nodes = $row.find('[data-checked="true"]');

				isBingo = isBingo || $nodes.length === 5;

				// vertical test
				$column = this.$el.find('.js-words-tablet .table-row .table-cell:nth-child(' + i + ')');
				$nodes = $column.find('[data-checked="true"]');

				isBingo = isBingo || $nodes.length === 5;

				// test diagonal
				isBingo = isBingo || diagonal_1.length === 5;
				isBingo = isBingo || diagonal_2.length === 5;

			}

			console.log(isBingo);

		}



	});


}(window));