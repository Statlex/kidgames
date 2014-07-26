(function (win) {

	"use strict";
	/*global window */
	/*global bingo, $ */

	win.APP = win.APP || {};

	win.APP.QuestionView = win.APP.MainView.extend({
		templates: ['question'],
		events: {
			'click .js-set-question': 'setQuestion',
			'click .js-hint-button': 'showHint',
			'click .js-answer-button': 'showAnswer'
		},
		init: function() {

			if (info.hasOwnProperty('currentSectionName')  && info.hasOwnProperty('currentQuestionNumber')) {

				var question = win.sections[info.currentSectionName].questions[info.currentQuestionNumber];

				this.$el = $('<div class="question js-question"/>').html(this.tmpl.question(question));

				this.$wrapper = $('.js-wrapper');

				this.$wrapper.html('');

				this.$wrapper.append(this.$el);

			} else {

				Backbone.history.history.back();

			}

			win.scrollTo(0, 0);

		},

		setQuestion: function(e) {

			var $this = $(e.currentTarget),
				direction = +$this.data('direction'),
				length = win.sections[info.currentSectionName].questions.length,
				currentQuestion = +info.currentQuestionNumber + direction;

			if (currentQuestion < 0) {
				currentQuestion = length - 1;
			}

			if (currentQuestion >= length) {
				currentQuestion = 0;
			}

			info.set('currentQuestionNumber', currentQuestion);

			APP.questionView = new win.APP.QuestionView();

		},
		showHint: function() {
			$('.js-hint-text').removeClass('hidden');
		},
		showAnswer: function() {

			$('.js-answer-text').removeClass('hidden');

			var sections = info.get('sections') || {},
				sectionName = info.currentSectionName,
				questionNumber = info.currentQuestionNumber;

			sections[sectionName] = sections[sectionName] || {};

			sections[sectionName][questionNumber] = 1;

			info.set('sections', sections, true);

		}






	});


}(window));