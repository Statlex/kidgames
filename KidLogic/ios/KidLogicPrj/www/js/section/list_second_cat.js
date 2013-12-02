(function () {

	"use strict";
	/*global window, document, console, alert */

	window.categoryList = window.categoryList || {};

	window.categoryList.secondCategory = {
		name: 'Second Category',
		items_number: 2,
		img: 'temp/temp2.png',

		items: {
			'item-1' : {
				'1': 'temp/apple.jpg',
				'2': 'temp/pear.jpg',
				'3': 'temp/apple2.jpg',
				'4': 'temp/apple3.jpg',
				'5': 'temp/apple.jpg',
				type: 2, // vibery variant otveta
				question: 'temp/temp2.png',
				answer: 2,
				item: 5
			},
			'item-2' : {
				'1': 'temp/apple.jpg',
				'2': 'temp/apple3.jpg',
				'3': 'temp/apple2.jpg',
				'4': 'temp/pear.jpg',
				type: 2,
				question: 'temp/temp1.png',
				answer: 4,
				item: 4
			}
		}

	};

}());
