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

		},
		goToBattle: function() {

			APP.router.navigate('battle', { trigger: true });
		},
		selectMap: function(e) {

			var $node = $(e.currentTarget || e),
				mapName = $node.data('js-name');

			APP.battleMap = APP.maps[mapName];

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