(function (win) {

	"use strict";
	/*global window, document */

	win.asker = {
		beginSection: function(sectionName) {

			this.sectionName = sectionName;
			this.section = Object.create(win.sectionList[sectionName]);

			this.createQuestionsList();


			this.showQuestion();
			viewer.show('ask-section');
		},
		showQuestion: function() {

		},
		createQuestionsList: function() {

			var questions = this.section.items;

			this.questions = [];

			for (var key in questions) {
				if (questions.hasOwnProperty(key)) {
					this.questions.push(questions[key])
				}
			}

			console.log(this.questions);

		}


	}


}(window));
