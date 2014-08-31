(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP, debug, util */

	win.APP = win.APP || {};

	APP.BattleView = APP.BaseView.extend({
		templates: ['battle', 'unit'],
		events: {
			'click .js-event-handler-square': 'onClickSquare'
		},
		squareSize: 20,
		init: function() {

			// set map to this view
			this.setMap(util.createCopy(win.testMap));
			// show draft map
			this.$el = $(this.tmpl.battle(this.map));
			this.$unitLayer = this.$el.find('.js-units-layer');

			// create and set controller
			this.controller = new APP.BattleController();
			this.controller.setView(this);
			this.controller.setMap(this.map);
			this.controller.setMapForView();

			this.$wrapper = $('.js-wrapper');
			this.$availablePathWrapper = this.$el.find('.js-available-path-layer');
			this.$availablePathSquares = this.$el.find('.js-available-path-square');


			this.$wrapper.html('');
			this.$wrapper.append(this.$el);

			this.controller.startBattle();

		},
		onClickSquare: function(e) {

			var data = e.currentTarget.dataset;

			this.controller.onClick({x: +data.x, y: +data.y});

		},
		setMap: function(map) {
			this.map = map;
		},
		appendUnit: function(unit) {

			var $unit = $(this.tmpl.unit( { unit: unit, view: this } ));

			this.$unitLayer.append($unit);

		},
		highlightPath: function(data) {

			this.hideAvailablePath();

			data.forEach(function(xy){
				var $square = this.$availablePathWrapper.find('[data-xy="' + ['x', xy.x, 'y', xy.y].join('') + '"]');
				$square.addClass('available-path-square');
			}, this);

		},
		hideAvailablePath: function() {
			this.$availablePathSquares.removeClass('available-path-square');
		},
		moveUnit: function(moveUnit) {
			var $unit = this.$unitLayer.find('[data-id="' + moveUnit.id + '"]');
			$unit.css({
				left: moveUnit.x * this.squareSize + 'px',
				top: moveUnit.y * this.squareSize + 'px'
			});
		}

	});

}(window));