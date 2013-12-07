(function () {

	"use strict";
	/*global window, document, console, alert */

	window.lang = window.lang || {};

	window.lang.es = {
		language: 'es Language',
		languageName: 'Español',
		score: 'es score',
		digits: 'es digits',
		learn: 'es learn',
		test: 'es test',
		addition: 'es addition',
		subtraction: 'es subtraction',
		doPreviousLevel: 'es This level is not open yet. Please, learn previous level ;)',
		levelIsDone: 'es Congratulation! This level is done. Please, go to next level :)',
		sectionIsDone: 'es Congratulation! This section is done. Please, go to next section :)',
		settings: 'es Settings',
		level: '!!! do NOT USE or REPLACE this field !!!',
		beginner: 'es beginner',
		expert: 'es expert',
		ball_many: 'es balls',
		book_many: 'es books',
		chicken_many: 'es chickens',
		cup_many: 'es cups',
		dog_many: 'es dogs',
		leaf_many: 'es leafs',
		mouse_many: 'es mouses',
		rabbit_many: 'es rabbits',
		snail_many: 'es snails',
		squirrel_many: 'es squirrels',
		testBasicsQuestion: 'es How many %thing% in a place?',
		youHaveDoneThisSection: 'es Congratulation, you have done this section. Try to learn other sections ;)',
		youDontHaveEnoughPoints: 'es DON\'T ENOUGH POINTS to open next section. Please, try to learn more :)'
	};

	for (var i = 0; i <= 9; i++) {
		lang.es['number-' + i] = '/android_asset/www/sound/numbers/es/' + i + '.mp3';
	}

}());
