(function (win) {

	"use strict";
	/*global window */
	/*global bingo, $ */

	win.APP = win.APP || {};

	win.APP.SectionView = win.APP.MainView.extend({
		templates: ['list'],
		events: {

			'click .js-question-item': 'showQuestion'

		},
		init: function(data) {

			this.$el = $('<div class="list js-list"/>').html(this.tmpl.list(win.sections[data.id]));

			this.$wrapper = $('.js-wrapper');

			this.$wrapper.html('');

			this.$wrapper.append(this.$el);

			info.set('currentSectionName', data.id);

		},
		showQuestion: function(e) {

			var $this = $(e.currentTarget);

			info.set('currentQuestionNumber', +$this.data('number'));

			APP.router.navigate('question', {trigger: true});


		}





	});


}(window));