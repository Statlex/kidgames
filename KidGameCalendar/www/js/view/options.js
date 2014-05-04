(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar, event */

	win.GC = win.GC || {};

	win.GC.OptionsView = Backbone.View.extend({
		el: '.js-options-wrapper',
		events: {

			'click [data-show]': 'showItem'




		},
		initialize: function() {
			this.template = templateContainer.templates.options;
		},
		show: function() {
			this.$el.empty();
			this.$el.html(_.template(this.template, {}));
			this.$el.css('left', '25%');
			APP.mainView.fade.show();
			this.bindEvents();
		},
		hide: function(noHistoryBack) {
			//this.$el.hide();
			this.$el.css('left', '');
//			APP.mainView.fade.hide();
			if (!noHistoryBack) {
				Backbone.history.history.back();
			}
			this.$el.empty();
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
					this.$el.find(selector).on(type, this[func].bind(this, null));
				}
			}

		},
		showItem: function() {
			APP.window.show($(event.currentTarget).attr('data-show'));
		}



	});

}(window, document, document.documentElement));