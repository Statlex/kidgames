(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.CycleDelayedView = Backbone.View.extend({
		el: '.js-main-wrapper',
		events: {
			'click .js-close-delayed-view': 'hide'
		},
		initialize: function() {
			this.template = templateContainer.templates['cycle-delayed'];

			// get end of last cycle
			// get current date
			// detect cycle delayed
			// if cycle > 1 day
			// show notification

			var lastCycle, lastDate, different, now, date;

			lastCycle = (Object.create(info.get('cycles') || [])).pop();

			if (!lastCycle) {
				return;
			}

			lastDate = lastCycle.startCycle;
			date = new Date();
			now = {
				date: date.getDate(),
				month: date.getMonth(),
				year: date.getFullYear()
			};

			different = Calendar.prototype.getDifferent(now, lastDate) - info.get('cycleLength');

			if (different <= 0) {
				return;
			}

			this.show({
				delayed: different
			});

		},
		show: function(data) {
			var view = $('<div />', {
					'class': 'js-delayed-view delayed-view'
				})
				.html(_.template(this.template, data))
				.css('top', '50%')
				.appendTo('.js-main-wrapper');

			this.bindEvents();

		},
		hide: function() {
			$('.js-delayed-view').remove();
		},
		bindEvents: function() {

			var events = this.events,
				key, selector, type, func, arr;

			for (key in events) {
				if (events.hasOwnProperty(key)) {
					func = events[key];
					arr = key.split(' ');
					type = arr.shift();
					selector = arr.join(' ');
					this.$el.find(selector).on(type, this[func].bind(this));
				}
			}

		}

	});

}(window, document, document.documentElement));