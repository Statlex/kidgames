(function () {

	"use strict";
	/*global window, document, console, alert */

	window.lang = window.lang || {};

	window.lang.zh = {
		language: 'zh Language',
		languageName: '中国的',
		score: 'zh score',
		digits: 'zh digits',
		learn: 'zh learn',
		test: 'zh test',
		addition: 'zh addition',
		subtraction: 'zh subtraction',
		doPreviousLevel: 'zh This level is not open yet. Please, learn previous level ;)',
		levelIsDone: 'zh Congratulation! This level is done. Please, go to next level :)',
		sectionIsDone: 'zh Congratulation! This section is done. Please, go to next section :)',
		settings: 'zh Settings',
		level: '!!! do NOT USE or REPLACE this field !!!',
		beginner: 'zh beginner',
		expert: 'zh expert',
		ball_many: 'zh balls',
		book_many: 'zh books',
		chicken_many: 'zh chickens',
		cup_many: 'zh cups',
		dog_many: 'zh dogs',
		leaf_many: 'zh leafs',
		mouse_many: 'zh mouses',
		rabbit_many: 'zh rabbits',
		snail_many: 'zh snails',
		squirrel_many: 'zh squirrels',
		testBasicsQuestion: 'zh How many %thing% in a place?',
		youHaveDoneThisSection: 'zh Congratulation, you have done this section. Try to learn other sections ;)',
		youDontHaveEnoughPoints: 'zh DON\'T ENOUGH POINTS to open next section. Please, try to learn more :)',
		thanks: 'Thanks',
		thanksForDe: 'Svetlana Dubinetskaya',
		thanksForEs: 'Viktoriya Kostyuk',
		shareUs: 'zh Share'
	};

	for (var i = 0; i <= 9; i++) {
		lang.zh['number-' + i] = 'sound/numbers/zh/' + i + '.mp3';
	}

}());
