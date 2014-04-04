(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */

	win.APP = win.APP || {};

	win.APP.MainView = Backbone.View.extend({
		el: '.js-main-data-wrapper',
		events: {
		},
		initialize: function() {
			this.templates = {
				calendarWrapper: templateContainer.templates['main-calendar-wrapper']
			};

			this.showCalendar();
		},
		showCalendar: function() {

			this.$el.html(_.template(this.templates.calendarWrapper, {}));

			var slider = new Slider(util.find('.js-main-calendar-wrapper'), {year: 2014, month: 3});

			var calendar = new Calendar();

			slider.setStartPosition();
			slider.init();

			slider.setCreatePages();

/*
			var page0 = calendar.getMonthPage({year: 2014, month: 3, dMonth: -1});
			var page1 = calendar.getMonthPage({year: 2014, month: 3, dMonth: 0});
			var page2 = calendar.getMonthPage({year: 2014, month: 3, dMonth: 1});

			page0 = this.createCalendarPage(page0);
			page1 = this.createCalendarPage(page1);
			page2 = this.createCalendarPage(page2);

			slider.addRightPage(page0);
			slider.addRightPage(page1);
			slider.addRightPage(page2);
*/


		}

	});

}(window, document, document.documentElement));
