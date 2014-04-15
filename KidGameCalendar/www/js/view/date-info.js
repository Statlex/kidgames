(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.DateInfoView = Backbone.View.extend({

		el: '.js-date-info-wrapper',
		events: {
			'click .js-hide-view': 'hide',
			'click .js-tab': 'showDetails'
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
		},
		show: function(id) {
			var date = id.split('-');

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
			this.$el.show();

		},
		hide: function() {
			this.$el.hide();
			APP.router.navigate('', {trigger: true});
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







		}

	});


}(window, document, document.documentElement));