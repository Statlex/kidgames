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

			// workaround for color selection
			this.setColorSelectInputs();

		},
		goToBattle: function() {

			var data = this.createBattleControllerData();

			data.map = this.selectedMap;

			if (this.checkBattleControllerData(data)) {
				new APP.BattleView(data);
				APP.router.navigate('battle', { trigger: true });
			}

		},

		checkBattleControllerData: function(data) {
			return !!data.map;
		},

		createBattleControllerData: function() {

			var forms = this.$el.find('.js-player-form');

			var data = {
				players: []
			};

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

				data.players.push(player);

			});

			return data;

		},

		selectMap: function(e) {

			var $node = $(e.currentTarget || e),
				mapName = $node.data('js-name');

			this.selectedMap = APP.maps[mapName];

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

		},

		setColorSelectInputs: function () {

			// find inputs

			var inputs = this.$el.find('[name=p1-color], [name=p2-color]');

			// add event listeners to change inputs state
			inputs.on('change', function () {

				var curName = this.name,
					value = this.value,
					relativeName = curName.replace(/(\d)/, function (match, p1) {
						return parseInt(p1) === 1 ? 2 : 1;
					}),
					relativeInputs = $('[name=' + relativeName + ']');

				relativeInputs.forEach(function (node) {
					node.removeAttribute('checked');
					node.checked = false;
				});

				relativeInputs.forEach(function (node) {
					if (node.value !== value) {
						node.checked = true;
					}
				});

			});


		}


	});

}(window));