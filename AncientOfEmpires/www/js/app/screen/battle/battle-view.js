(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP, util */

	win.APP = win.APP || {};

	APP.BattleView = APP.BaseView.extend({
		templates: ['battle', 'unit', 'build'],
		events: {
			'click .js-event-handler-square': 'onClickSquare',
			'click .js-end-turn': 'endTurn'

		},
		squareSize: 36,
		cssSelector: '.square, .unit, .build',
		init: function () {

			this.setStyles();

			// set map to this view
			this.setMap(util.createCopy(win.testMap));
			// show draft map
			this.$el = $(this.tmpl.battle(this.map));
			this.setFieldSize();

			this.$unitLayer = this.$el.find('.js-units-layer');
			this.$buildingsLayer = this.$el.find('.js-buildings-layer');

			this.$eventLayer = this.$el.find('.js-event-handler');
			this.$bgLayer = this.$el.find('.js-background-layer');

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

			this.drawMap();

		},
		setFieldSize: function () {
			var size = this.squareSize,
				sizes = this.map.size,
				$node = this.$el.find('.js-layers-wrapper');
			$node.css({
				width: size * sizes.width + 'px',
				height: size * sizes.height + 'px'
			});
		},
		onClickSquare: function (e) {

			var data = e.currentTarget.dataset;

			this.controller.onClick({x: +data.x, y: +data.y});

		},
		setMap: function (map) {
			this.map = map;
		},
		drawMap: function () {

			this.$bgLayer.css('display', 'none');

			var map = this.map,
				data = map.terrain,
				key,
				wrapper = this.$bgLayer[0];

			for (key in data) {
				if (data.hasOwnProperty(key)) {
					wrapper.querySelector('[data-xy="' + key + '"]').classList.add('terrain-' + data[key]);
				}
			}

			this.$bgLayer.css('display', '');

		},
		appendUnit: function (unit) {

			var $unit = $(this.tmpl.unit({ unit: unit, view: this }));

			this.$unitLayer.append($unit);

		},
		appendBuilding: function (build) {

			var $build = $(this.tmpl.build({ build: build, view: this }));
			this.$buildingsLayer.append($build);

		},
		highlightPath: function (data) {

			this.hideAvailablePath();

			var color = data.color,
				path = data.path;

			path.forEach(function (xy) {
				var $square = this.$availablePathWrapper.find('[data-xy="' + ['x', xy.x, 'y', xy.y].join('') + '"]');
				$square.addClass('available-path-square').data('color', color);
			}, this);

		},
		hideAvailablePath: function () {
			this.$availablePathSquares.removeClass('available-path-square');
		},
		moveUnit: function (moveUnit) {
			var $unit = this.getUnitById(moveUnit.id);
			$unit.css({
				left: moveUnit.x * this.squareSize + 'px',
				top: moveUnit.y * this.squareSize + 'px'
			});
		},
		detectEndUnitTurn: function (unit, toDisable) {

			if ((unit.wasAttack && unit.wasMoved && !unit.canGetBuilding) || toDisable) {
				this.getUnitById(unit.id).addClass('unit-end-turn');
			}

		},
		showUnitsUnderAttack: function (units) {
			units.forEach(function (unit) {

				var x = unit.x,
					y = unit.y,
					$block = this.$eventLayer.find('[data-xy="x' + x + 'y' + y + '"]');

				$block.addClass('unit-under-attack');

			}, this);
		},
		hideUnitsUnderAttack: function () {
			this.$eventLayer.find('.unit-under-attack').removeClass('unit-under-attack');
		},
		endTurn: function () {
			this.hideAvailablePath();
			this.hideUnitsUnderAttack();
			this.resetEndTurnState();
			this.controller.endTurn();
		},
		resetEndTurnState: function () {
			this.$unitLayer.find('.unit-end-turn').removeClass('unit-end-turn');
		},
		redrawHealthUnit: function (unit) {
			var $unit = this.getUnitById(unit.id);
			$unit.find('.js-health').html(unit.health);
		},
		drawRIP: function (unit) {
			var $unit = this.getUnitById(unit.id);
			$unit.addClass('grave');

		},
		removeRIP: function (unit) {
			this.$unitLayer.find('[data-id="' + unit.id + '"]').remove();
		},
		getUnitById: function (id) {
			return this.$unitLayer.find('[data-id="' + id + '"]');
		},
		setStyles: function () {
			var size = this.squareSize,
				selector = this.cssSelector,
				style = document.styleSheets[0],
				cssRules = style.cssRules,
				index,
				cssText = selector + '{ width: ' + size + 'px; height: ' + size + 'px; }';

			Array.prototype.forEach.call(cssRules, function (rule, i) {
				if (rule.cssText.indexOf(selector) !== -1) {
					index = i;
				}
			});

			if (index !== undefined) {
				style.removeRule(index);
			}

			style.insertRule(cssText, cssRules.length);

		},
		showUnitCanGetBuilding: function (unit) {

			var x = unit.x,
				y = unit.y,
				build = this.controller.buildings['x' + x + 'y' + y];

			this.$eventLayer
				.find('[data-xy="x' + x + 'y' + y + '"]')
				.addClass('can-get-building')
				.data('building-color', unit.color)
				.data('building-type', build.type);

		},
		hideUnitCanGetBuilding: function () {

			this.$eventLayer
				.find('.can-get-building')
				.removeClass('can-get-building')
				.data('building-color', '')
				.data('building-type', '');

		},
		setBuildingColor: function(build) {
			var x = build.x,
				y = build.y,
				color = build.color,
				$build = this.$buildingsLayer.find('[data-xy="x' + x + 'y' + y + '"]');

			$build.data('building-color', color);

		}

	});

}(window));