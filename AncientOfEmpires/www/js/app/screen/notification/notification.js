(function (win) {

	"use strict";
	/*global window, document */
	/*global bingo, $, info, APP */

	/*
	 * setting
	 * 1 - music off/on
	 * 2 - ask for switch turn
	 * 3 - animation speed -                 slow - 1 2 [3] 4 5 - fast
	 *
	 *
	 * */

	/*

	 [*] music
	 [*] end turn confirm

	 animation speed
	 slow - 1 2 [3] 4 5 - fast

	 */


	win.APP = win.APP || {};

	APP.NotificationView = APP.BaseView.extend({

		templates: ['notification-wrapper', 'notification-banner'],


		events: {

		},

		init: function() {

//debugger;
			this.$el = $(this.tmpl['notification-wrapper']());

			this.$wrapper = $('.js-wrapper');

			this.$notificationWrapper = this.$el.find('.js-notification-wrapper');

			//debugger;

			//this.$wrapper.html('');
			//
			//this.setSettingsState();
			//
			this.$wrapper.append(this.$el);

		},

		show: function (data) { // template name, data for template, onClose function
			console.log('from notification');
			console.log(data);
		}

	});

}(window));