(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP, debug, util */

	win.APP = win.APP || {};

	APP.BattleView = APP.BaseView.extend({
		templates: ['battle', 'unit'],
		events: {
			'click .js-event-handler-square': 'onClickSquare',
			'click .js-end-turn': 'endTurn'

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
			var $unit = this.getUnitById(moveUnit.id);
			$unit.css({
				left: moveUnit.x * this.squareSize + 'px',
				top: moveUnit.y * this.squareSize + 'px'
			});
		},
		showUnitsUnderAttack: function(units) {
			units.forEach(function(unit){

				var x = unit.x,
					y = unit.y,
					$block = this.$el.find('.js-event-handler [data-xy="x' + x + 'y' + y + '"]');

				$block.css('background-color', '#c00');

			}, this);
		},
		hideUnitsUnderAttack: function() {
			this.$el.find('.js-event-handler-square').css('background-color', '');
			console.log('hideUnitsUnderAttack');
		},
		endTurn: function() {
			this.hideAvailablePath();
			this.hideUnitsUnderAttack();
			this.controller.endTurn();
		},
		redrawHealthUnit: function(unit) {
			var $unit = this.getUnitById(unit.id);
			$unit.find('.js-health').html(unit.health);
		},
		drawRIP: function(unit) {
			var $unit = this.getUnitById(unit.id);
			$unit.remove(); // TODO: not remove, just add cssClass
			console.log('DRAW RIP from UNIT');
		},
		getUnitById: function(id) {
			return this.$unitLayer.find('[data-id="' + id + '"]');
		}

	});

}(window));