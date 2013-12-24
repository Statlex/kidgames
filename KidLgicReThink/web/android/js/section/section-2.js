(function () {

	"use strict";
	/*global window, document, console, alert */

	window.sectionList = window.sectionList || {};

	window.sectionList.section_2 = {
		name: 'Select right answer',
		items_number: 28,
		img: 'img/section/section-2/find-most-unsuitable-picture-1.svg',

		items: {
			/*--------------*/
			'item-1': {
				'1': 'img/section/section-2/a1/1.svg',
				'2': 'img/section/section-2/a1/2.svg',
				'3': 'img/section/section-2/a1/3.svg',
				'4': 'img/section/section-2/a1/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q1/1.svg',
				text: 'For playing hockey you need a ...',
				answer: 1,
				item: 4
			},
			'item-2': {
				'1': 'img/section/section-2/a1/1.svg',
				'2': 'img/section/section-2/a1/2.svg',
				'3': 'img/section/section-2/a1/3.svg',
				'4': 'img/section/section-2/a1/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q1/2.svg',
				text: 'What does hedgehog need for painting?',
				answer: 2,
				item: 4
			},
			'item-3': {
				'1': 'img/section/section-2/a1/1.svg',
				'2': 'img/section/section-2/a1/2.svg',
				'3': 'img/section/section-2/a1/3.svg',
				'4': 'img/section/section-2/a1/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q1/3.svg',
				text: 'What was baked for Rabbit\'s birthday?',
				answer: 3,
				item: 4
			},
			'item-4': {
				'1': 'img/section/section-2/a1/1.svg',
				'2': 'img/section/section-2/a1/2.svg',
				'3': 'img/section/section-2/a1/3.svg',
				'4': 'img/section/section-2/a1/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q1/4.svg',
				text: 'What should Fox use to measure temperature?',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-5': {
				'1': 'img/section/section-2/a2/1.svg',
				'2': 'img/section/section-2/a2/2.svg',
				'3': 'img/section/section-2/a2/3.svg',
				'4': 'img/section/section-2/a2/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q2/1.svg',
				text: 'What does Rabbit love more?',
				answer: 1,
				item: 4
			},
			'item-6': {
				'1': 'img/section/section-2/a2/1.svg',
				'2': 'img/section/section-2/a2/2.svg',
				'3': 'img/section/section-2/a2/3.svg',
				'4': 'img/section/section-2/a2/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q2/2.svg',
				text: 'What does Mouse love more?',
				answer: 2,
				item: 4
			},
			'item-7': {
				'1': 'img/section/section-2/a2/1.svg',
				'2': 'img/section/section-2/a2/2.svg',
				'3': 'img/section/section-2/a2/3.svg',
				'4': 'img/section/section-2/a2/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q2/3.svg',
				text: 'What does Dog love more?',
				answer: 3,
				item: 4
			},
			'item-8': {
				'1': 'img/section/section-2/a2/1.svg',
				'2': 'img/section/section-2/a2/2.svg',
				'3': 'img/section/section-2/a2/3.svg',
				'4': 'img/section/section-2/a2/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q2/4.svg',
				text: 'What does Bear love more?',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-9': {
				'1': 'img/section/section-2/a3/1.svg',
				'2': 'img/section/section-2/a3/2.svg',
				'3': 'img/section/section-2/a3/3.svg',
				'4': 'img/section/section-2/a3/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q3/1.svg',
				text: 'Find suitable pattern.',
				answer: 1,
				item: 4
			},
			'item-10': {
				'1': 'img/section/section-2/a3/1.svg',
				'2': 'img/section/section-2/a3/2.svg',
				'3': 'img/section/section-2/a3/3.svg',
				'4': 'img/section/section-2/a3/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q3/2.svg',
				text: 'Find suitable pattern.',
				answer: 2,
				item: 4
			},
			'item-11': {
				'1': 'img/section/section-2/a3/1.svg',
				'2': 'img/section/section-2/a3/2.svg',
				'3': 'img/section/section-2/a3/3.svg',
				'4': 'img/section/section-2/a3/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q3/3.svg',
				text: 'Find suitable pattern.',
				answer: 3,
				item: 4
			},
			'item-12': {
				'1': 'img/section/section-2/a3/1.svg',
				'2': 'img/section/section-2/a3/2.svg',
				'3': 'img/section/section-2/a3/3.svg',
				'4': 'img/section/section-2/a3/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q3/4.svg',
				text: 'Find suitable pattern.',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-13': {
				'1': 'img/section/section-2/a4/1.svg',
				'2': 'img/section/section-2/a4/2.svg',
				'3': 'img/section/section-2/a4/3.svg',
				'4': 'img/section/section-2/a4/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q4/1.svg',
				text: 'Find pair.',
				answer: 1,
				item: 4
			},
			'item-14': {
				'1': 'img/section/section-2/a4/1.svg',
				'2': 'img/section/section-2/a4/2.svg',
				'3': 'img/section/section-2/a4/3.svg',
				'4': 'img/section/section-2/a4/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q4/2.svg',
				text: 'Find pair.',
				answer: 2,
				item: 4
			},
			'item-15': {
				'1': 'img/section/section-2/a4/1.svg',
				'2': 'img/section/section-2/a4/2.svg',
				'3': 'img/section/section-2/a4/3.svg',
				'4': 'img/section/section-2/a4/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q4/3.svg',
				text: 'Find pair.',
				answer: 3,
				item: 4
			},
			'item-16': {
				'1': 'img/section/section-2/a4/1.svg',
				'2': 'img/section/section-2/a4/2.svg',
				'3': 'img/section/section-2/a4/3.svg',
				'4': 'img/section/section-2/a4/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q4/4.svg',
				text: 'Find pair.',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-17': {
				'1': 'img/section/section-2/a5/1.svg',
				'2': 'img/section/section-2/a5/2.svg',
				'3': 'img/section/section-2/a5/3.svg',
				'4': 'img/section/section-2/a5/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q5/1.svg',
				text: 'Find equal building.',
				answer: 1,
				item: 4
			},
			'item-18': {
				'1': 'img/section/section-2/a5/1.svg',
				'2': 'img/section/section-2/a5/2.svg',
				'3': 'img/section/section-2/a5/3.svg',
				'4': 'img/section/section-2/a5/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q5/2.svg',
				text: 'Find equal building.',
				answer: 2,
				item: 4
			},
			'item-19': {
				'1': 'img/section/section-2/a5/1.svg',
				'2': 'img/section/section-2/a5/2.svg',
				'3': 'img/section/section-2/a5/3.svg',
				'4': 'img/section/section-2/a5/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q5/3.svg',
				text: 'Find equal building.',
				answer: 3,
				item: 4
			},
			'item-20': {
				'1': 'img/section/section-2/a5/1.svg',
				'2': 'img/section/section-2/a5/2.svg',
				'3': 'img/section/section-2/a5/3.svg',
				'4': 'img/section/section-2/a5/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q5/4.svg',
				text: 'Find equal building.',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-21': {
				'1': 'img/section/section-2/a6/1.svg',
				'2': 'img/section/section-2/a6/2.svg',
				'3': 'img/section/section-2/a6/3.svg',
				'4': 'img/section/section-2/a6/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q6/1.svg',
				text: 'Find a similar one.',
				answer: 1,
				item: 4
			},
			'item-22': {
				'1': 'img/section/section-2/a6/1.svg',
				'2': 'img/section/section-2/a6/2.svg',
				'3': 'img/section/section-2/a6/3.svg',
				'4': 'img/section/section-2/a6/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q6/2.svg',
				text: 'Find a similar one.',
				answer: 2,
				item: 4
			},
			'item-23': {
				'1': 'img/section/section-2/a6/1.svg',
				'2': 'img/section/section-2/a6/2.svg',
				'3': 'img/section/section-2/a6/3.svg',
				'4': 'img/section/section-2/a6/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q6/3.svg',
				text: 'Find a similar one.',
				answer: 3,
				item: 4
			},
			'item-24': {
				'1': 'img/section/section-2/a6/1.svg',
				'2': 'img/section/section-2/a6/2.svg',
				'3': 'img/section/section-2/a6/3.svg',
				'4': 'img/section/section-2/a6/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q6/4.svg',
				text: 'Find a similar one.',
				answer: 4,
				item: 4
			},
			/*--------------*/
			'item-25': {
				'1': 'img/section/section-2/a7/1.svg',
				'2': 'img/section/section-2/a7/2.svg',
				'3': 'img/section/section-2/a7/3.svg',
				'4': 'img/section/section-2/a7/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q7/1.svg',
				text: 'What does Mouse love more?',
				answer: 1,
				item: 4
			},
			'item-26': {
				'1': 'img/section/section-2/a7/1.svg',
				'2': 'img/section/section-2/a7/2.svg',
				'3': 'img/section/section-2/a7/3.svg',
				'4': 'img/section/section-2/a7/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q7/2.svg',
				text: 'What does Squirrel love more?',
				answer: 2,
				item: 4
			},
			'item-27': {
				'1': 'img/section/section-2/a7/1.svg',
				'2': 'img/section/section-2/a7/2.svg',
				'3': 'img/section/section-2/a7/3.svg',
				'4': 'img/section/section-2/a7/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q7/3.svg',
				text: 'What does Rabbit love more?',
				answer: 3,
				item: 4
			},
			'item-28': {
				'1': 'img/section/section-2/a7/1.svg',
				'2': 'img/section/section-2/a7/2.svg',
				'3': 'img/section/section-2/a7/3.svg',
				'4': 'img/section/section-2/a7/4.svg',
				type: 2, // vibery variant otveta
				question: 'img/section/section-2/q7/4.svg',
				text: 'What does Dog love more?',
				answer: 4,
				item: 4
			}

		}

	};

}());
