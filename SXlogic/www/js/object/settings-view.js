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
			themes: [
				{
					title: 'standard',
					name: 'стандартная'
				},
				{
					title: 'white',
					name: 'классик2'
				},
				{
					title: 'black',
					name: 'классик3'
				},
				{
					title: 'white-simple',
					name: 'классик4'
				},
				{
					title: 'black-simple',
					name: 'классик5'
				}
			]
		}





	});


}(window));