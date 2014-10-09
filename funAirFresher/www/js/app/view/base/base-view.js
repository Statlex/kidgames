(function (win) {

	"use strict";
	/*global window, Backbone, $, templateMaster, setTimeout, APP, history */

	win.APP = win.APP || {};

	APP.BaseView = Backbone.View.extend({

		events: {
			'click [data-route]': 'routeTo'
		},

		baseInitialize: function() {
			APP.$wrapper.empty();
		},

		navigate: function() { //url, options
			APP.router.navigate.apply(APP.route, arguments);
		},

		routeTo: function(e) {

			var $this = $(e.currentTarget),
				route = $this.data('route');

			this.navigate(route, true);

		}


//
//		tmpl: {},
//		events: {},
//		initialize: function(data) {
//
//			data = data || {};
//
//			var events = this.events,
//				key, event, selector, arr;
//
//			for (key in data) {
//				if (data.hasOwnProperty(key)) {
//					this[key] = data[key];
//				}
//			}
//
//			this.templates.forEach(function(name){
//				this.tmpl[name] = templateMaster.tmplFn[name];
//			}, this);
//
//			if (this.init) {
//				this.init(data);
//			}
//
//			for (key in events) {
//				if (events.hasOwnProperty(key)) {
//					arr = key.replace(/,/gi, ' ').replace(/\s+/gi, ' ').match(/[\S]+/g);
//					event = arr.shift();
//					selector = arr.join(', ');
//					this.$el.find(selector).on(event, this[events[key]].bind(this));
//				}
//			}
//
//			this.bindBackButton();
//
//		},
//
//		bindBackButton: function() {
//			this.$el.find('.js-back').on('click', function(){
//				if (Backbone.history.fragment) {
//					history.back();
//				}
//			});
//		}

	});

}(window));