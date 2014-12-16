(function (win) {

	"use strict";
	/*global window, document, setTimeout */
	/*global bingo, $, info, APP, util */

	win.APP = win.APP || {};

	APP.BattleMenuView = APP.BaseView.extend({
		templates: ['battle-menu'],

		events: {
			'click .js-restart-mission': 'restartMission',
			'click .js-quit-mission': 'quitMission'
		},

		init: function () {

			this.$el = $(this.tmpl['battle-menu']());

			this.$wrapper = $('.js-wrapper');
			this.$wrapper.find('.js-battle-menu-wrapper').remove();
			this.$wrapper.append(this.$el);

		},

		restartMission: function () {

			this.$el.addClass('hidden');

			win.history.back();

			if ( confirm('are you sure to restart mission?') ) {
				APP.battleView = new APP.BattleView(util.createCopy(APP.battleView.startingData));
			}

		},

		quitMission: function () {

			(function checkUrl() {

				var location = win.location,
					history = win.history;

				if (location.hash.replace('#', '') === 'battle') {
					setTimeout(history.back.bind(history), 200);
				} else {
					history.back();
					setTimeout(checkUrl, 200);
				}

			}());



		}


	});

}(window));