(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar, event, dataBase */

	win.GC = win.GC || {};

	win.GC.DateInfoView = Backbone.View.extend({

		el: '.js-date-info-wrapper',
		events: {
		},
		selectors: {
			details: '.js-date-details-wrapper'
		},
		initialize: function() {
			this.templates = {
				main: templateContainer.templates['date-info'],
				details: templateContainer.templates['date-info-details'],
				date: templateContainer.templates['date-info-day-header']
			};
			this.$el.html(_.template(this.templates.main, {}));

			// set listeners
			$('.js-hide-view', this.$el).on('click' , this.hide.bind(this, false));
			$('.js-tab', this.$el).on('click', this.showDetails.bind(this));
			$('.js-save-date-info', this.$el).on('click', this.saveDateInfo.bind(this));

		},
		show: function(id) {

			this.date = id;

			this.restoreDate();

			var date = id.split('-'),
				tabs;

			// set default state for tabs
			tabs = this.$el.find('.js-tab');
			tabs.removeClass('active-tab');
			tabs.eq(0).addClass('active-tab');

			date = date.map(function(value) {
				return parseInt(value, 10);
			});

			date = {
				date: date[0],
				month: date[1],
				year: date[2]
			};

			this.$el.find('.js-date-info-date').html(_.template(this.templates.date, date));

			// get template and add to wrapper
			this.$el.find(this.selectors.details).html(_.template(this.templates.details, {}));
			this.$el.css('top', '0');

		},
		hide: function(noHistoryBack) {
			//this.$el.hide();
			this.$el.css('top', '');
			if (!noHistoryBack) {
				Backbone.history.history.back();
			}
		},
		showDetails: function() {
			var $this = $(event.target),
				index = $this.attr('data-tab-index'),
				pages = this.$el.find('.js-tab-page'),
				tabs = this.$el.find('.js-tab');

			pages.hide();

			tabs.removeClass('active-tab');
			$this.addClass('active-tab');
			pages.eq(index).show();

		},
		saveDateInfo: function() {
			var callback = function(){
					APP.slider.addColoringToAllPage();
					$('.month-date[data-date="' + this.date + '"]').on('click');
				},
				json = JSON.stringify( util.nodeToJson(this.$el[0]));

			if (json.replace(/\s+/gi, '') === '{}') {
				dataBase.removeDateInfo(this.date, callback.bind(this));
			} else {
				dataBase.saveDateInfo(this.date, JSON.stringify(json), callback.bind(this));
			}
			this.hide();
		},
		restoreDate: function(date) {
			var that = this;
			date = date || this.date;

			dataBase.getDateInfo(date, function(date){
				date = JSON.parse(date);
				if (date.toString() === date) {
					date = JSON.parse(date);
				}
				util.restoreNode(that.$el[0], date);
			});

		},
		showBottomDateInfo: function(date) {
			var that = this,
				data = date;
			dataBase.getDateInfo(date, function(date){
				date = JSON.parse(date);
				if (date.toString() === date) {
					date = JSON.parse(date);
				}

				that.createBottomNote(date, data);

			});

		},
		createBottomNote: function(data, date) {
			var $el = $('.js-notes-bottom-block'),
				template = templateContainer.templates['main-calendar-bottom-notes'],
				arr = date.split('-'),
				that = this;

			data.isEmpty = $el.isEmptyObject(data);

			data.date = {
				date: arr[0],
				month: arr[1],
				year: arr[2],
				str: date
			};

			$el.html(_.template(template, data));

			// show note window
			$('.js-bottom-notes-container').on('click', function() {
				APP.router.navigate('date-info', {trigger: true});
				that.show(this.dataset.notesDate);
			});

		}

	});

}(window, document, document.documentElement));