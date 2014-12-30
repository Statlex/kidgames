(function (win) {

	"use strict";
	/*global window, document, setTimeout, clearTimeout */
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

		templates: ['notification-wrapper', 'n-banner'],

		timeout: 1000e3,

		events: {

		},

		init: function() {


			this.$wrapper = $('.js-wrapper');

			//this.$wrapper.html('');
			//
			//this.setSettingsState();
			//

		},

		show: function (data) { // template name, data for template, onClose function

			if (data instanceof String) {
				data = {
					text: data
				};
			}

			clearTimeout(this.timeoutId);

			this.timeoutId = setTimeout(this.removeExtraWindows, this.timeout);

			this.removeExtraWindows();

			this.$el = $(this.tmpl['notification-wrapper']());

			data.tmpl = data.tmpl || 'n-banner';

			var newNode = $(this.tmpl[data.tmpl](data));

			newNode.on('click', this.removeExtraWindows);

			this.$el.find('.js-notification-container').append(newNode);

			this.$wrapper.append(this.$el);

			console.log('from notification');
			console.log(data);

		},
		removeExtraWindows: function () {

			$('.js-wrapper').find('.js-notification-wrapper').remove();

		}

	});

}(window));