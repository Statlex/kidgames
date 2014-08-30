(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP, debug, util */

	win.APP = win.APP || {};

	APP.BattleView = APP.BaseView.extend({
		templates: ['battle', 'unit'],
		events: {
			'click .js-square': 'onClickSquare'
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

			this.$wrapper.html('');
			this.$wrapper.append(this.$el);

			this.controller.startBattle();

			this.squares = this.$el.find('.js-square');

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
			console.log('/////');
			console.log(data);

			data.forEach(function(xy){
				var $square = this.$el.find('[data-xy="' + ['x', xy.x, 'y', xy.y].join('') + '"]');
				$square.css('background-color', 'rgba(0, 0, 0, 0.5)');

			}, this);

			console.log(this.squares);
		}

	});

}(window));