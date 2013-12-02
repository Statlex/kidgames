(function () {

	"use strict";
	/*global window, document, console, alert */

	window.categoryList = window.categoryList || {};

	window.categoryList.someCategory = {
		name: 'Some Category',
		items_number: 2,
		img: 'temp/temp1.png',

		items: {
			'item-1' : {
				'1': 'temp/apple.jpg',
				'2': 'temp/pear.jpg',
				'3': 'temp/apple2.jpg',
				'4': 'temp/apple3.jpg',
				'5': 'temp/apple.jpg',
				'6': 'temp/apple2.jpg',
				type: 1, // 4to lishnee
				question: '4to lishee?',
				answer: 2,
				item: 6
			},
			'item-2' : {
				'1': 'temp/apple.jpg',
				'2': 'temp/apple3.jpg',
				'3': 'temp/apple2.jpg',
				'4': 'temp/pear.jpg',
				type: 1,
				question: 'what is extra?',
				answer: 4,
				item: 4
			}
		}

	};

}());
