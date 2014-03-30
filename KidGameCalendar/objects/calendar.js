(function (win, doc, docElem) {

	"use strict";
	/*global window, document, console */

	var log = console.log.bind(console);

	function Calendar() {

	}

	Calendar.prototype = {
		monthLength: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		getYear: function() {
			var date = new Date();
			return date.getYear() + 1900;
		},
		getMonth: function() {
			var date = new Date();
			return date.getMonth();
		},
		getDate: function() {
			var date = new Date();
			return date.getDate();
		},
		isLeapYear: function(year) {
			if (year % 400 === 0) {
				return true;
			}
			return (year % 4 === 0) && (year % 100 !== 0);
		},
		getMonthLine: function(data) {
			var year = data.year,
				month = data.month,
				monthLength = this.monthLength[month],
				date = new Date(),
				startDay;

			date.setDate(1);
			date.setMonth(month);
			startDay = date.getDay();

			if (monthLength === 28 && this.isLeapYear(year)) {
				monthLength += 1;
			}









		}




	};

	win.Calendar = Calendar;

}(window, document, document.documentElement));