(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.MainView = Backbone.View.extend({
		el: '.js-main-data-wrapper',
		events: {
		},
		selectors: {
			calendar: '.js-calendar-wrapper',
			notes: '.js-notes-wrapper',
			time: '.js-time-wrapper'
		},
		initialize: function() {
			this.templates = {
				calendarWrapper: templateContainer.templates['main-calendar-wrapper']
			};

			// create calendar
			this.createCalendar();

		},
		createCalendar: function() {

			this.$el.find(this.selectors.calendar).html(_.template(this.templates.calendarWrapper, {}));

			var date = new Date(),
				slider = new Slider(this.$el.find('.js-main-calendar-wrapper')[0], {year: date.getFullYear(), month: date.getMonth()});

			slider.setStartPosition();
			slider.init();

			slider.setCreatePages();

			APP.slider = slider;

		},
		show: function(item) {
			var key;
			for (key in this.selectors) {
				if (this.selectors.hasOwnProperty(key)) {
					if (item === key) {
						this.$el.find(this.selectors[key]).show();
					} else {
						this.$el.find(this.selectors[key]).hide();
					}
				}
			}



		}

	});

}(window, document, document.documentElement));
