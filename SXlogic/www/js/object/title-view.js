(function (win) {

	"use strict";
	/*global window */
	/*global bingo, $, info, APP */

	win.APP = win.APP || {};

	win.APP.TitleView = win.APP.MainView.extend({
		templates: ['title'],
		events: {
			'click .js-go-to-section': 'showSection'
		},
		init: function() {

			this.$el = $('<div class="title js-title"/>').html(this.tmpl.title({}));

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.setTheme();

			this.$wrapper.append(this.$el);

		},
		showSection: function(e) {

			var $node = $(e.currentTarget),
				sectionName = $node.data('section-name');

			APP.router.navigate('section/' + sectionName, {trigger: true});

		},

		setTheme: function() {
			var themeName = info.get('theme-name');
			return themeName &&	this.$wrapper.addClass(themeName);
		}




	});


}(window));