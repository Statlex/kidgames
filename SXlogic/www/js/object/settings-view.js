(function (win) {

	"use strict";
	/*global window */
	/*global bingo, $, info, Backbone, APP */

	win.APP = win.APP || {};

	win.APP.SettingsView = win.APP.MainView.extend({
		templates: ['settings'],
		events: {

		},
		init: function() {

			this.$el = $('<div class="settings js-settings"/>').html(this.tmpl.settings(this.tmplData));

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

		},
		tmplData: {
			imagePathPrefix: 'pathToImageFolder',
			themes: [
				{
					name: 'классик',
					img: 'classic.jpg'
				},
				{
					name: 'классик2',
					img: 'classic.jpg'
				},
				{
					name: 'классик3',
					img: 'classic.jpg'
				}

			]
		}





	});


}(window));