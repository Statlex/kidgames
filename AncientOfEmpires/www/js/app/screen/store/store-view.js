(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP, util */

	win.APP = win.APP || {};

	APP.StoreView = APP.BaseView.extend({
		templates: ['store'],
		events: {
			'click .js-buy-unit': 'buyUnit'
		},
		init: function (args) {



			var data = {},
				player = args.controller.activePlayer;

			this.player = player;
			this.controller = args.controller;

			data.unitInfo = APP.units.info;
			data.gold = player.gold;

			this.$el = $(this.tmpl.store(data));

			this.$buyButtons = this.$el.find('.js-buy-unit');

			this.$wrapper = $('.js-wrapper');
			this.$wrapper.find('.js-store-wrapper').remove();
			this.$wrapper.append(this.$el);

		},
		setBuyButtonState: function() {

			var unitInfo = APP.units.info,
				gold = this.player.gold;

			this.$buyButtons.forEach(function(button){

				var unitName = button.dataset.name,
					cost = unitInfo[unitName].cost;

				if ( gold >= cost ) {
					button.classList.add('active');
				} else {
					button.classList.remove('active');
				}


			});

		},

		buyUnit: function(e) {

			var $button = $(e.currentTarget || e),
				unitName = $button.data('name'),
				unitInfo = APP.units.info,
				unitCost = unitInfo[unitName].cost,
				newUnit, unit,
				controller = this.controller,
				castle,
				player = this.player;

			if ( unitCost > this.player.gold ) {
				alert('not enough money');
				return;
			}

			player.gold -= unitCost;

			controller.view.showPlayerInfo();

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

			this.setBuyButtonState();

			alert('you did buy the ' + unitName);

		}


	});

}(window));