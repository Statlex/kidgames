(function () {

	"use strict";
	/*global window, document, console, alert */

	window.lang = window.lang || {};

	window.lang.de = {
		language: 'de Language',
		languageName: 'Deutsch',
		score: 'de score',
		digits: 'de digits',
		learn: 'de learn',
		test: 'de test',
		addition: 'de addition',
		subtraction: 'de subtraction',
		doPreviousLevel: 'de This level is not open yet. Please, learn previous level ;)',
		levelIsDone: 'de Congratulation! This level is done. Please, go to next level :)',
		sectionIsDone: 'de Congratulation! This section is done. Please, go to next section :)',
		settings: 'de Settings',
		level: '!!! do NOT USE or REPLACE this field !!!',
		beginner: 'de beginner',
		expert: 'de expert',
		ball_many: 'de balls',
		book_many: 'de books',
		chicken_many: 'de chickens',
		cup_many: 'de cups',
		dog_many: 'de dogs',
		leaf_many: 'de leafs',
		mouse_many: 'de mouses',
		rabbit_many: 'de rabbits',
		snail_many: 'de snails',
		squirrel_many: 'de squirrels',
		testBasicsQuestion: 'de How many %thing% in a place?',
		youHaveDoneThisSection: 'de Congratulation, you have done this section. Try to learn other sections ;)',
		youDontHaveEnoughPoints: 'de DON\'T ENOUGH POINTS to open next section. Please, try to learn more :)'
	};

	for (var i = 0; i <= 9; i++) {
		lang.de['number-' + i] = '/android_asset/www/sound/numbers/de/' + i + '.mp3';
	}

}());
