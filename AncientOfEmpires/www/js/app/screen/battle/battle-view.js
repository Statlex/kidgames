(function (win) {

	"use strict";
	/*global window, document, history */
	/*global bingo, $, info, APP, util, Backbone, MoveArea */

	win.APP = win.APP || {};

	APP.BattleView = APP.BaseView.extend({
		templates: ['battle', 'unit', 'build'],
		events: {
			'click .js-event-handler-square': 'onClickSquare',
			'click .js-end-turn': 'endTurn',
			//'click .js-go-to-store': 'goToStore',
			'click .js-scale-button': 'scale'
		},
		squareSize: 36,
		maxSquareSize: 100,
		minSquareSize: 6,
		scaleStep: 10,
		cssSelector: '.square, .unit, .build',
		styleTagSelector: '.js-battle-styles',
		init: function (data) {

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

			this.setMoveArea();

			this.setStyles();

		},

		scale: function(e) {

			var $node = $(e.currentTarget),
				isIncrease = $node.data('type') === '+' ? 1 : -1,
				newSize = this.squareSize + isIncrease * this.scaleStep;

			if (newSize > this.maxSquareSize || newSize < this.minSquareSize) {
				return;
			}

			this.squareSize = newSize;

			this.setStyles();
			this.setFieldSize();

			this.setBuildingPosition();

			this.setUnitsPosition();

			this.moveArea.onResize();

		},

		activeButtons: function (isActive) {

			if (isActive) {
				this.$el.find('.js-cpu-running').addClass('hidden');
			} else {
				this.$el.find('.js-cpu-running').removeClass('hidden');
			}

		},

		setBuildingPosition: function() {

			var squareSize = this.squareSize;

			this.$buildingsLayer.find('.build').forEach(function(build){
				var $build = $(build),
					x = parseInt($build.data('x'), 10),
					y = parseInt($build.data('y'), 10);

				if ($build.hasClass('build-castle')) {
					$build.css({
						left: squareSize * x + 'px',
						top: squareSize * (y - 1) + 'px',
						height: squareSize * 2 + 'px'
					});
				} else {
					$build.css({
						left: squareSize * x + 'px',
						top: squareSize * y + 'px'
					});
				}

			});

		},

		setUnitsPosition: function() {
			var squareSize = this.squareSize,
				units = this.controller.units,
				graves = this.controller.unitsRIP,
				prefix = info.preJS,
				key, unit, $unit;

			for (key in units) {
				if (units.hasOwnProperty(key)) {
					unit = units[key];
					$unit = this.getUnitById(unit.id);
					$unit.css(prefix+'Transform','translate(' + unit.x * squareSize + 'px, ' + unit.y * squareSize + 'px)');
				}
			}

			for (key in graves) {
				if (graves.hasOwnProperty(key)) {
					unit = graves[key];
					$unit = this.getUnitById(unit.id);
					$unit.css(prefix+'Transform','translate(' + unit.x * squareSize + 'px, ' + unit.y * squareSize + 'px)');
				}
			}


		},

		goToStore: function(data) {

			// to open store user must have the castle
			if (!this.controller.getPlayerCastle()) {
				win.alert('to BUY unit you have to has the castle');
				return;
			}

			APP.storeView = new APP.StoreView(data);

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
			this.redrawHealthUnit(unit);

		},
		appendBuilding: function (build) {

			var $build = $(this.tmpl.build({ build: build, view: this }));
			this.$buildingsLayer.append($build);

		},
		highlightPath: function (data) {

			this.hideAvailablePath();
			this.hideGravesForUp();
			var color = data.color,
				path = data.path;

			path.forEach(function (xy) {
				var $square = this.$availablePathWrapper.find('[data-xy="' + ['x', xy.x, 'y', xy.y].join('') + '"]');
				$square.addClass('available-path-square').data('color', color);
			}, this);

		},

		hideAvailablePath: function () {
			this.hideGravesForUp();
			this.hideUnitsUnderAttack();
			this.$availablePathSquares.removeClass('available-path-square');
		},

		moveUnit: function (moveUnit) {
			this.hideAvailablePath();
			var $unit = this.getUnitById(moveUnit.id),
				size = this.squareSize;
			$unit[0].style[info.preJS + 'Transform'] = 'translate(' +  moveUnit.x * size + 'px, ' + moveUnit.y * size + 'px)';
			//$unit.css( info.preCSS + 'transform', 'translate(' +  moveUnit.x * size + 'px, ' + moveUnit.y * size + 'px)');
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

		showGravesForUp: function(graves) {

			graves.forEach(function (grave) {

				var x = grave.x,
					y = grave.y,
					$block = this.$eventLayer.find('[data-xy="x' + x + 'y' + y + '"]');

				$block.addClass('unit-for-grave-up');

			}, this);

		},

		hideGravesForUp: function() {
			this.$eventLayer.find('.unit-for-grave-up').removeClass('unit-for-grave-up');
		},

		endTurn: function () {
			this.hideAvailablePath();
			this.hideUnitsUnderAttack();
			this.resetEndTurnState();
			this.drawUnitCurrentState();
			this.goFromStore();
			this.activeButtons(true);
			this.controller.endTurn();
		},
		goFromStore: function() {
			if (Backbone.history.fragment !== 'battle') {
				history.back();
			}
		},
		resetEndTurnState: function () {
			this.$unitLayer.find('.unit-end-turn').removeClass('unit-end-turn');
		},
		drawUnitCurrentState: function() {

			var controller = this.controller,
				units = controller.units,
				graves = controller.unitsRIP;

			this.$unitLayer.find('[data-id]').forEach(function(node){

				var $unit = $(node),
					id = +$unit.data('id'),
					unit = units[id] || graves[id];

				if (!unit) {
					return;
				}

				if (unit.wasPoisoned) {
					$unit.addClass('unit-poisoned');
				} else {
					$unit.removeClass('unit-poisoned');
				}

			});

		},
		redrawHealthUnit: function (unit) {

			var $unit = this.getUnitById(unit.id),
				health = Number(Math.max(unit.health, 0.1).toFixed(1)),
				$health = $unit.find('.js-health'),
				$deltaHealth = $unit.find('.js-delta-health'),
				beforeHealth = parseFloat($health.html()),
				deltaHealth = Number((health - beforeHealth).toFixed(1));

			$deltaHealth.removeClass('delta-health-animation');

			if (deltaHealth) {

				$deltaHealth.html(deltaHealth);

				if (deltaHealth > 0) {
					$deltaHealth.addClass('color-green');
				} else {
					$deltaHealth.addClass('color-red');
				}

				setTimeout(function () { // hack for redraw
					$deltaHealth.addClass('delta-health-animation');
				}, 50);

			}

			$health.html(health);

			if (unit.wasPoisoned) {
				this.drawPoisoned($unit);
			}

		},

		redrawLevelUnit: function (unit) {
			var $unit = this.getUnitById(unit.id);
			$unit.data('level', unit.level);
		},

		drawPoisoned: function(unitNode) {
			unitNode.addClass('unit-poisoned');
		},
		drawRIP: function (unit) {
			var $unit = this.getUnitById(unit.id);
			$unit.addClass('grave');
			this.redrawLevelUnit(unit);
		},
		removeRIP: function (unit) {
			this.$unitLayer.find('[data-id="' + unit.id + '"]').remove();
		},
		getUnitById: function (id) {
			return this.$unitLayer.find('[data-id="' + id + '"]');
		},
		setStyles: function () {

			var $wrapper = this.$wrapper,
				tagSelector = this.styleTagSelector,
				$style = $wrapper.find(tagSelector),
				size = this.squareSize,
				selector = this.cssSelector,
				cssText = selector + '{ width: ' + size + 'px; height: ' + size + 'px; }';

			if (!$style.length) {
				$style = $('<style type="text/css" class="' + tagSelector.substr(1) + '"></style>');
				$wrapper.append($style);
			}

			$style.html(cssText);

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

		showGoToStore: function (xy) {

			this.$eventLayer
				.find('[data-xy="x' + xy.x + 'y' + xy.y + '"]')
				.addClass('go-to-store-by-unit');

		},

		hideGoToStore: function () {

			var $square = this.$eventLayer.find('.go-to-store-by-unit'),
				xy;

			if ($square.isEmpty()) {
				return false;
			}

			xy = {
				x: +$square.data('x'),
				y: +$square.data('y')
			};

			$square.removeClass('go-to-store-by-unit');

			return xy;

		},

		showUnitInfo: function(unit) {
			this.$statusBar.find('.js-status-bar-armor').html(unit.def);
			this.$statusBar.find('.js-status-bar-damage').html(unit.atk);
		},

		showPlayerInfo: function(player) {
			player = player || this.controller.activePlayer;
			this.$statusBar.find('.js-status-bar-color')
				.html(player.color)
				.css('color', player.color);
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
		//setStoreButtonState: function(isEnable) {
		//	this.$el.find('.js-go-to-store').data('state', isEnable ? 'enable' : 'disable');
		//},
		addHealthToUnit: function(data) {
			this.redrawHealthUnit(data.unit);
		},
		showWispAura: function(unit) {
			var $unit = this.getUnitById(unit.id);
			$unit.addClass('under-wisp-aura');
		},
		hideWispAura: function(unit) {
			var $unit = this.getUnitById(unit.id);
			$unit.removeClass('under-wisp-aura');
		},
		removeWispAuraFromGraves: function() {
			this.$unitLayer.find('.grave').removeClass('under-wisp-aura');
		},
		setMoveArea: function() {
			var $el = this.$el;
			this.moveArea = new MoveArea({
				wrapper: $el.find('.js-layers-moving-wrapper')[0],
				container: $el.find('.js-layers-wrapper')[0]
			});
		},
		setDisableScreen: function (isShow) {

			if (isShow) {
				this.$el.find('.js-disable-screen').removeClass('hidden');
			} else {
				this.$el.find('.js-disable-screen').addClass('hidden');
			}

		}

	});

}(window));