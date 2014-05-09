(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

	win.GC = win.GC || {};

	win.GC.HelpView = Backbone.View.extend({
		el: '.js-confirm-wrapper',
		events: {
			'click .js-help-back': 'hide'
		},
		initialize: function() {
			this.template = templateContainer.templates.help;
		},
		show: function() {
			this.$el.html(_.template(this.template, {}));
			this.$el.css('top', '0');
			this.bindEvents();
			this.addNativeSwipe();
		},
		hide: function(noHistoryBack) {
			this.$el.css('top', '');
			if (!noHistoryBack) {
				Backbone.history.history.back();
			}
		},
		addNativeSwipe: function(){
			var div = this.$el.find('.js-help-text-container');
			div.addClass('scroll');
			div.on('mousemove', function(e){
				e.stopPropagation();
			});
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

		}

	});

}(window, document, document.documentElement));