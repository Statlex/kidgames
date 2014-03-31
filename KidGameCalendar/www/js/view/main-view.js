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
				calendarWrapper: templateContainer.templates['main-calendar-wrapper'],
				calendarPage: templateContainer.templates['main-calendar-page']
			};

			this.showCalendar();
		},
		showCalendar: function() {

			this.$el.html(_.template(this.templates.calendarWrapper, {}));

			var slider = new Slider(util.find('.js-main-calendar-wrapper'));

			var page0 = this.createCalendarPage();
			var page1 = this.createCalendarPage();
			var page2 = this.createCalendarPage();
			slider.addRightPage(page0);
			slider.addRightPage(page1);
			slider.addRightPage(page2);
			slider.setStartPosition();
			slider.init();

		},
		createCalendarPage: function() {
			var node = doc.createElement('div');
			node.innerHTML = _.template(this.templates.calendarPage, {});
			return node.querySelector(':scope > div');
		}

	});

}(window, document, document.documentElement));
