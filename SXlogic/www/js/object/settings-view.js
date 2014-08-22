(function (win) {

	"use strict";
	/*global window */
	/*global bingo, $, info, Backbone, APP */

	win.APP = win.APP || {};

	win.APP.SettingsView = win.APP.MainView.extend({
		templates: ['settings'],
		events: {
			'click .js-theme-item-wrapper': 'setTheme'
		},
		init: function() {

			this.$el = $('<div class="settings js-settings"/>').html(this.tmpl.settings(this.tmplData));

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

		},

		setTheme: function(e) {

			this.removeAllThemes();

			var $this = $(e.currentTarget),
				themeName = $this.data('theme-name');

			$this.addClass('active');

			this.$wrapper.addClass(themeName);

			info.set('theme-name', themeName, true);

		},

		removeAllThemes: function() {
			this.$wrapper.find('.js-theme-item-wrapper.active').removeClass('active');

			this.tmplData.themes.forEach(function(obj){
				this.$wrapper.removeClass(obj.title);
			}, this);

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