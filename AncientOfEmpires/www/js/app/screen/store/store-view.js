(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP, util */

	win.APP = win.APP || {};

	APP.StoreView = APP.BaseView.extend({
		templates: ['store'],
		events: {
			'click .js-unit-card': 'selectUnit'
		},
		init: function (args) {

			var data = {},
				player = args.controller.activePlayer;

			this.player = player;
			this.controller = args.controller;

			data.unitInfo = APP.units.info;
			data.gold = player.gold;

			this.$el = $(this.tmpl.store(data));

			this.$wrapper = $('.js-wrapper');
			this.$wrapper.append(this.$el);

		},
		selectUnit: function(e) {

			var $node = $(e.currentTarget || e),
				unitName = $node.data('name'),
				unitInfo = APP.units.info,
				unitCost = unitInfo[unitName].cost;

			if ( $node.data('can-buy') ) {
				if ($node.data('can-buy') === 'enable') {
					this.buyUnit(unitName);
				} else {
					win.alert('not enough money to buy the ' + unitName);
				}
			} else {
				this.$el.find('.js-unit-card').data('can-buy', '');
				if (unitCost <= this.player.gold) {
					$node.data('can-buy', 'enable');
				} else {
					$node.data('can-buy', 'disable');
				}
			}

		},
		buyUnit: function(unitName) {

			var unitInfo = APP.units.info,
				unitCost = unitInfo[unitName].cost,
				newUnit, unit,
				controller = this.controller,
				castle,
				player = this.player;

			if ( unitCost > this.player.gold ) {
				return;
			}

			player.gold -= unitCost;

			controller.view.showPlayerInfo();
			this.$el.find('.js-unit-card').data('can-buy', '');

			castle = controller.getPlayerCastle();

			unit = {
				type: util.capitalise(unitName),
				x: castle.x,
				y: castle.y,
				playerId: player.id,
				color: player.color

			};

			newUnit = controller.appendUnit(unit); // to controller
			controller.view.appendUnit(newUnit);


		}


	});

}(window));