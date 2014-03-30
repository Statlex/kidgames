(function (win, doc, docElem) {

	"use strict";
	/*global window, document, console, Calendar */

	var log = console.log.bind(console);

	var calendar = new Calendar();
	console.log(calendar.isLeapYear(2000));

	calendar.getMonthLine({year: 2004, month: 2});


}(window, document, document.documentElement));