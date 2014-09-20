(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP, util */

	win.APP = win.APP || {};

	APP.MapsView = APP.BaseView.extend({
		templates: ['select-map'],
		events: {
			'click .js-go-to-battle': 'goToBattle',
			'click .js-map-to-create-game': 'selectMap'

		},
		init: function () {

			this.$el = $(this.tmpl['select-map']({
				maps: this.getMapsArray()
			}));
			this.$wrapper = $('.js-wrapper');
			this.$wrapper.html('');
			this.$wrapper.append(this.$el);

			$('.js-wrapper .js-status-bar').data('state', 'store');

			APP.battleControllerData = {};

		},
		goToBattle: function() {

			this.createBattleControllerData();

			if (this.checkBattleControllerData()) {
				APP.router.navigate('battle', { trigger: true });
			}

		},

		checkBattleControllerData: function() {

			if (!APP.battleControllerData.map) {
				return false;
			}

			return true;

		},

		createBattleControllerData: function() {

			var forms = this.$el.find('.js-player-form');

			APP.battleControllerData.players = [];

			forms.forEach(function(form, index){
				var $form = $(form),
					player = {
						id: index,
						gold: APP.map.default.gold
					},
					selects = $form.find('select');
				selects.forEach(function(select){
					var type = select.dataset.type;
					player[type] = select.value;
				});

				APP.battleControllerData.players.push(player);

			});

		},

		selectMap: function(e) {

			var $node = $(e.currentTarget || e),
				mapName = $node.data('js-name');

			APP.battleControllerData.map = APP.maps[mapName];

		},
		getMapsArray: function() {

			var maps = APP.maps,
				key,
				mapsArray = [];

			for (key in maps) {
				if (maps.hasOwnProperty(key)) {
					mapsArray.push(maps[key]);
				}
			}

			return mapsArray;

		}


	});

}(window));