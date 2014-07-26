(function (win) {

	"use strict";
	/*global window, Backbone, $, templateMaster */

	win.APP = win.APP || {};

	win.APP.MainView = Backbone.View.extend({

		templates: [],
		tmpl: {},
		events: {},
		initialize: function(data) {

			var events = this.events,
				key, event, selector, arr;

			for (key in data) {
				if (data.hasOwnProperty(key)) {
					this[key] = data[key];
				}
			}

			this.templates.forEach(function(name){
				this.tmpl[name] = templateMaster.tmplFn[name];
			}, this);

			if (this.init) {
				this.init(data);
			}

			for (key in events) {
				if (events.hasOwnProperty(key)) {
					arr = key.replace(/,/gi, ' ').replace(/\s+/gi, ' ').match(/[\S]+/g);
					event = arr.shift();
					selector = arr.join(', ');
					this.$el.find(selector).on(event, this[events[key]].bind(this));
				}
			}

			this.bindBackButton();

			this.setStyles();

		},

		bindBackButton: function() {
			this.$el.find('.js-back').on('click', function(){
				if (Backbone.history.fragment) {
					Backbone.history.history.back();
				}
			});
		},

		setStyles: function() {

			function topPadding() {
				var header = $('.header'),
					wrapper = $('.list-wrapper');
				wrapper.css('padding-top', header.prop('clientHeight') + 'px');
			}

			topPadding();
			setTimeout(topPadding, 200);

		}




	});

}(window));