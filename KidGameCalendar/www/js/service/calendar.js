(function (win, doc, docElem) {

	"use strict";
	/*global window, document, console, util */

	var log = console.log.bind(console);

	function MonthsDate(data) {
		this.year = data.year;
		this.month = data.month;
		this.date = data.date;
		this.day = data.day;
	}

	function Month() {
		this.cssIsActive = false;
		this.dates = [];
	}

	function Calendar() {

	}

	Calendar.prototype = {
		monthLength: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		weekStart: 1, // 1 - monday, 0 - sunday
		datesOnPage: 42,
		getYear: function() {
			var date = new Date();
			return date.getFullYear();
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
		getMonthPage: function(data) {

			var date = new Date();

			if (!data) {
				data = {
					year: date.getFullYear(),
					month: date.getMonth()
				}
			}

			if (data.dMonth) { // only 1 or -1
				if (data.dMonth > 0) {
					if (data.month === 11) {
						data.year += 1;
						data.month = 0;
					} else {
						data.month += 1;
					}
				} else {
					if (data.month === 0) {
						data.year -= 1;
						data.month = 11;
					} else {
						data.month -= 1;
					}
				}
			}

			var year = data.year,
				month = data.month,
				monthLength = this.getMonthLength(data.year, data.month),
				startDay,
				leftDatesOnPage = this.datesOnPage - monthLength,
				preMonthLength,
				monthStart, monthEnd, i,
				months = {
					pre: new Month(),
					cur: new Month(),
					next: new Month(),
					year: data.year,
					month: data.month,
					weekDays: this.getDaysOfWeek()
				};

				months.cur.cssIsActive = true;

			date.setDate(1);
			date.setMonth(month);
			date.setFullYear(year);
			startDay = date.getDay();

			// create current month
			for (i = 1; i <= monthLength; i += 1) {
				data.date = i;
				date.setDate(i);
				data.day = date.getDay();
				months.cur.dates.push(new MonthsDate(data));
			}

			// create previous month
			if (startDay !== this.weekStart) {

				preMonthLength = startDay - this.weekStart;
				preMonthLength += preMonthLength < 0 ? 7 : 0;
				leftDatesOnPage -= preMonthLength;

				if (month === 0) {
					date.setFullYear(year - 1);
					data.year = year - 1;
					date.setMonth(11);
					data.month = 11;
				} else {
					date.setMonth(month - 1);
					data.month = month - 1;
				}

				monthEnd = this.getMonthLength(year, month - 1);
				monthStart = monthEnd - preMonthLength + 1;

				for (i = monthStart; i <= monthEnd; i += 1) {
					data.date = i;
					date.setDate(i);
					data.day = date.getDay();
					months.pre.dates.push(new MonthsDate(data));
				}

			}

			// create next month
			if (month === 11) {
				date.setFullYear(year + 1);
				data.year = year + 1;
				date.setMonth(0);
				data.month = 0;
			} else {
				date.setFullYear(year);
				data.year = year;
				date.setMonth(month + 1);
				data.month = month + 1;
			}

			monthStart = 1;
			monthEnd = leftDatesOnPage;
			for (i = monthStart; i <= monthEnd; i += 1) {
				data.date = i;
				date.setDate(i);
				data.day = date.getDay();
				months.next.dates.push(new MonthsDate(data));
			}

			return months;

		},
		getMonthLength: function(year, month) {
			month = (month === -1) ? 11 : month;
			month = (month === 12) ? 0 : month;
			var monthLength = this.monthLength[month];
			if (monthLength === 28 && this.isLeapYear(year)) {
				monthLength += 1;
			}
			return monthLength;
		},
		getDaysOfWeek: function() {
			var days = [0,1,2,3,4,5,6],
				removedDays;
			if (this.weekStart === 0) {
				return days;
			}
			removedDays = days.splice(0, this.weekStart);
			return days.concat(removedDays);
		},
		getDifferent: function(date1, date2) {

			date1 = (new Date(date1.year, date1.month, date1.date)).getTime();
			date2 = (new Date(date2.year, date2.month, date2.date)).getTime();
			return (date1 - date2) / 86400; // 60 * 60 * 24

		}

	};

	win.Calendar = Calendar;

}(window, document, document.documentElement));