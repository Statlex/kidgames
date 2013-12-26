(function () {

	"use strict";
	/*global window, document, console, alert */

	window.sectionList = window.sectionList || {};

	window.sectionList.section_2 = {
		name_ar: 'ar Select right answer',
		name_de: 'de Select right answer',
		name_en: 'Select right answer',
		name_es: 'es Select right answer',
		name_ru: 'Выбери правильный ответ',
		name_zh: 'Select right answer',
		itemsNumber: 28,
		imgPath: 'img/section/section-2/',
		img: 'find-most-unsuitable-picture-1.svg',

		items: {
			/*--------------*/
			'item-1': {
				'1': 'a1/1.svg',
				'2': 'a1/2.svg',
				'3': 'a1/3.svg',
				'4': 'a1/4.svg',
				type: 2, // vibery variant otveta
				question: 'q1/1.svg',
				text: 'For playing hockey you need a ...',
				answer: 1,
				item: 4
			},
			'item-2': {
				'1': 'a1/1.svg',
				'2': 'a1/2.svg',
				'3': 'a1/3.svg',
				'4': 'a1/4.svg',
				type: 2, // vibery variant otveta
				question: 'q1/2.svg',
				text: 'What does hedgehog need for painting?',
				answer: 2,
				item: 4
			},
			'item-3': {
				'1': 'a1/1.svg',
				'2': 'a1/2.svg',
				'3': 'a1/3.svg',
				'4': 'a1/4.svg',
				type: 2, // vibery variant otveta
				question: 'q1/3.svg',
				text: 'What was baked for Rabbit\'s birthday?',
				answer: 3,
				item: 4
			},
			'item-4': {
				'1': 'a1/1.svg',
				'2': 'a1/2.svg',
				'3': 'a1/3.svg',
				'4': 'a1/4.svg',
				type: 2, // vibery variant otveta
				question: 'q1/4.svg',
				text: 'What should Fox use to measure temperature?',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-5': {
				'1': 'a2/1.svg',
				'2': 'a2/2.svg',
				'3': 'a2/3.svg',
				'4': 'a2/4.svg',
				type: 2, // vibery variant otveta
				question: 'q2/1.svg',
				text: 'What does Rabbit love more?',
				answer: 1,
				item: 4
			},
			'item-6': {
				'1': 'a2/1.svg',
				'2': 'a2/2.svg',
				'3': 'a2/3.svg',
				'4': 'a2/4.svg',
				type: 2, // vibery variant otveta
				question: 'q2/2.svg',
				text: 'What does Mouse love more?',
				answer: 2,
				item: 4
			},
			'item-7': {
				'1': 'a2/1.svg',
				'2': 'a2/2.svg',
				'3': 'a2/3.svg',
				'4': 'a2/4.svg',
				type: 2, // vibery variant otveta
				question: 'q2/3.svg',
				text: 'What does Dog love more?',
				answer: 3,
				item: 4
			},
			'item-8': {
				'1': 'a2/1.svg',
				'2': 'a2/2.svg',
				'3': 'a2/3.svg',
				'4': 'a2/4.svg',
				type: 2, // vibery variant otveta
				question: 'q2/4.svg',
				text: 'What does Bear love more?',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-9': {
				'1': 'a3/1.svg',
				'2': 'a3/2.svg',
				'3': 'a3/3.svg',
				'4': 'a3/4.svg',
				type: 2, // vibery variant otveta
				question: 'q3/1.svg',
				text: 'Find suitable pattern.',
				answer: 1,
				item: 4
			},
			'item-10': {
				'1': 'a3/1.svg',
				'2': 'a3/2.svg',
				'3': 'a3/3.svg',
				'4': 'a3/4.svg',
				type: 2, // vibery variant otveta
				question: 'q3/2.svg',
				text: 'Find suitable pattern.',
				answer: 2,
				item: 4
			},
			'item-11': {
				'1': 'a3/1.svg',
				'2': 'a3/2.svg',
				'3': 'a3/3.svg',
				'4': 'a3/4.svg',
				type: 2, // vibery variant otveta
				question: 'q3/3.svg',
				text: 'Find suitable pattern.',
				answer: 3,
				item: 4
			},
			'item-12': {
				'1': 'a3/1.svg',
				'2': 'a3/2.svg',
				'3': 'a3/3.svg',
				'4': 'a3/4.svg',
				type: 2, // vibery variant otveta
				question: 'q3/4.svg',
				text: 'Find suitable pattern.',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-13': {
				'1': 'a4/1.svg',
				'2': 'a4/2.svg',
				'3': 'a4/3.svg',
				'4': 'a4/4.svg',
				type: 2, // vibery variant otveta
				question: 'q4/1.svg',
				text: 'Find pair.',
				answer: 1,
				item: 4
			},
			'item-14': {
				'1': 'a4/1.svg',
				'2': 'a4/2.svg',
				'3': 'a4/3.svg',
				'4': 'a4/4.svg',
				type: 2, // vibery variant otveta
				question: 'q4/2.svg',
				text: 'Find pair.',
				answer: 2,
				item: 4
			},
			'item-15': {
				'1': 'a4/1.svg',
				'2': 'a4/2.svg',
				'3': 'a4/3.svg',
				'4': 'a4/4.svg',
				type: 2, // vibery variant otveta
				question: 'q4/3.svg',
				text: 'Find pair.',
				answer: 3,
				item: 4
			},
			'item-16': {
				'1': 'a4/1.svg',
				'2': 'a4/2.svg',
				'3': 'a4/3.svg',
				'4': 'a4/4.svg',
				type: 2, // vibery variant otveta
				question: 'q4/4.svg',
				text: 'Find pair.',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-17': {
				'1': 'a5/1.svg',
				'2': 'a5/2.svg',
				'3': 'a5/3.svg',
				'4': 'a5/4.svg',
				type: 2, // vibery variant otveta
				question: 'q5/1.svg',
				text: 'Find equal building.',
				answer: 1,
				item: 4
			},
			'item-18': {
				'1': 'a5/1.svg',
				'2': 'a5/2.svg',
				'3': 'a5/3.svg',
				'4': 'a5/4.svg',
				type: 2, // vibery variant otveta
				question: 'q5/2.svg',
				text: 'Find equal building.',
				answer: 2,
				item: 4
			},
			'item-19': {
				'1': 'a5/1.svg',
				'2': 'a5/2.svg',
				'3': 'a5/3.svg',
				'4': 'a5/4.svg',
				type: 2, // vibery variant otveta
				question: 'q5/3.svg',
				text: 'Find equal building.',
				answer: 3,
				item: 4
			},
			'item-20': {
				'1': 'a5/1.svg',
				'2': 'a5/2.svg',
				'3': 'a5/3.svg',
				'4': 'a5/4.svg',
				type: 2, // vibery variant otveta
				question: 'q5/4.svg',
				text: 'Find equal building.',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-21': {
				'1': 'a6/1.svg',
				'2': 'a6/2.svg',
				'3': 'a6/3.svg',
				'4': 'a6/4.svg',
				type: 2, // vibery variant otveta
				question: 'q6/1.svg',
				text: 'Find a similar one.',
				answer: 1,
				item: 4
			},
			'item-22': {
				'1': 'a6/1.svg',
				'2': 'a6/2.svg',
				'3': 'a6/3.svg',
				'4': 'a6/4.svg',
				type: 2, // vibery variant otveta
				question: 'q6/2.svg',
				text: 'Find a similar one.',
				answer: 2,
				item: 4
			},
			'item-23': {
				'1': 'a6/1.svg',
				'2': 'a6/2.svg',
				'3': 'a6/3.svg',
				'4': 'a6/4.svg',
				type: 2, // vibery variant otveta
				question: 'q6/3.svg',
				text: 'Find a similar one.',
				answer: 3,
				item: 4
			},
			'item-24': {
				'1': 'a6/1.svg',
				'2': 'a6/2.svg',
				'3': 'a6/3.svg',
				'4': 'a6/4.svg',
				type: 2, // vibery variant otveta
				question: 'q6/4.svg',
				text: 'Find a similar one.',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-25': {
				'1': 'a7/1.svg',
				'2': 'a7/2.svg',
				'3': 'a7/3.svg',
				'4': 'a7/4.svg',
				type: 2, // vibery variant otveta
				question: 'q7/1.svg',
				text: 'What does Mouse love more?',
				answer: 1,
				item: 4
			},
			'item-26': {
				'1': 'a7/1.svg',
				'2': 'a7/2.svg',
				'3': 'a7/3.svg',
				'4': 'a7/4.svg',
				type: 2, // vibery variant otveta
				question: 'q7/2.svg',
				text: 'What does Squirrel love more?',
				answer: 2,
				item: 4
			},
			'item-27': {
				'1': 'a7/1.svg',
				'2': 'a7/2.svg',
				'3': 'a7/3.svg',
				'4': 'a7/4.svg',
				type: 2, // vibery variant otveta
				question: 'q7/3.svg',
				text: 'What does Rabbit love more?',
				answer: 3,
				item: 4
			},
			'item-28': {
				'1': 'a7/1.svg',
				'2': 'a7/2.svg',
				'3': 'a7/3.svg',
				'4': 'a7/4.svg',
				type: 2, // vibery variant otveta
				question: 'q7/4.svg',
				text: 'What does Dog love more?',
				answer: 4,
				item: 4
			}

		}

	};

}());
