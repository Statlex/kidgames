(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP, util */

	win.APP = win.APP || {};

	APP.BattleView = APP.BaseView.extend({
		templates: ['battle', 'unit', 'build'],
		events: {
			'click .js-event-handler-square': 'onClickSquare',
			'click .js-end-turn': 'endTurn',
			'click .js-go-to-store': 'goToStore'
		},
		squareSize: 36,
		cssSelector: '.square, .unit, .build',
		init: function (data) {

			this.setStyles();

			// set map to this view
			this.setMap(util.createCopy(data.map));
			// show draft map
			this.$el = $(this.tmpl.battle(this.map));
			this.setFieldSize();

			this.$unitLayer = this.$el.find('.js-units-layer');
			this.$buildingsLayer = this.$el.find('.js-buildings-layer');

			this.$eventLayer = this.$el.find('.js-event-handler');
			this.$bgLayer = this.$el.find('.js-background-layer');
			this.$statusBar = this.$el.find('.js-status-bar');

			// create and set controller
			this.controller = new APP.BattleController(data);
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

		goToStore: function() {

			// to open store user must have the castle
			if (!this.controller.getPlayerCastle()) {
				win.alert('to BUY unit you have to has the castle');
				return;
			}

			APP.storeView = new APP.StoreView({controller: this.controller});

			APP.router.navigate('store', {trigger: true});

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
			this.hideAvailablePath();
			var $unit = this.getUnitById(moveUnit.id),
				size = this.squareSize;
			$unit.css( info.preCSS + 'transform', 'translate(' +  moveUnit.x * size + 'px, ' + moveUnit.y * size + 'px)');
		},

		showEndUnitTurn: function(unit) {
			this.getUnitById(unit.id).addClass('unit-end-turn');
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
			this.goFromStore();
		},
		goFromStore: function() {
			if (Backbone.history.fragment !== 'battle') {
				history.back();
			}
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

		setBuildingColor: function(build) {
			var x = build.x,
				y = build.y,
				color = build.color,
				$build = this.$buildingsLayer.find('[data-xy="x' + x + 'y' + y + '"]');

			$build.data('building-color', color);

		},
		highlightUnit: function(unit) {

			this.$unitLayer.find('.active-unit').removeClass('active-unit');

			if (!unit) {
				return;
			}

			this.$unitLayer.find('[data-id="' + unit.id + '"]').addClass('active-unit');

		},

		showUnitInfo: function(unit) {
			this.$statusBar.find('.js-status-bar-armor').html(unit.def);
			this.$statusBar.find('.js-status-bar-damage').html(unit.atk);
		},

		showPlayerInfo: function(player) {
			player = player || this.controller.activePlayer;
			this.$statusBar.find('.status-bar-gold').html(player.gold);
		},

		showPlaceInfo: function(data) {

			var building,
				x = data.coordinates.x,
				y = data.coordinates.y;

			data.map.buildings.every(function(build){
				if (build.x === x && build.y === y) {
					building = build;
					return false;
				}
				return true;
			});

			if (building) {
				console.log('show building', building);
			} else {
				console.log('show terrainn', data.map.terrain['x' + x + 'y' + y]);
			}

			this.$statusBar.find('.js-status-bar-armor').html('_');
			this.$statusBar.find('.js-status-bar-damage').html('_');
		},
		hideGetBuilding: function(){
			this.$eventLayer
				.find('.can-get-building')
				.removeClass('can-get-building')
				.data('building-color', '')
				.data('building-type', '');

		},
		showGetBuilding: function(unit) {
			var x = unit.x,
				y = unit.y,
				build = this.controller.buildings['x' + x + 'y' + y];

			this.$eventLayer
				.find('[data-xy="x' + x + 'y' + y + '"]')
				.addClass('can-get-building')
				.data('building-color', unit.color)
				.data('building-type', build.type);

		},
		setStoreButtonState: function(isEnable) {
			this.$el.find('.js-go-to-store').data('state', isEnable ? 'enable' : 'disable');
		}

	});

}(window));