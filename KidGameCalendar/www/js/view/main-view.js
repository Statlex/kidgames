(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.MainView = Backbone.View.extend({
		el: '.js-main-data-wrapper',
		events: {
			'click .js-fade': 'back'
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

			this.bindHelpButton();
			this.bindArrowButton();
			this.bindFade();
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

		},
		bindHelpButton: function() {
			this.$el.find('.js-show-help').on('click', function(){
				APP.router.navigate('help', {trigger: true});
			});
		},
		bindArrowButton: function() {
			function changePage(direction) {
				APP.slider.changeMonthDate(direction);
				APP.slider.changePage(direction);
				APP.slider.updateDateNode();
			}
			this.$el.find('.js-slider-to-left').on('click', changePage.bind(APP.slider, -1));
			this.$el.find('.js-slider-to-right').on('click', changePage.bind(APP.slider, 1));
		},
		bindFade: function() {
			$('.js-fade').off();

			this.fade = {
				node: $('.js-fade'),
				show: function() {
					$(doc.body).addClass('blur');
					this.node.show();
				},
				hide: function() {
					$(doc.body).removeClass('blur');
					this.node.hide();
				}
			};

			this.fade.node.on('click', function(){
				Backbone.history.history.back();
			});

		}

	});

}(window, document, document.documentElement));
