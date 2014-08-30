(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP, debug */

	win.APP = win.APP || {};

	APP.BattleView = APP.BaseView.extend({
		templates: ['battle', 'unit'],
		events: {
			'click .js-square': 'onClickSquare'
		},
		squareSize: 20,
		init: function() {

			// set map to this view
			this.setMap(win.testMap);
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

		}

	});

}(window));