(function (win) {

	"use strict";
	/*global window, Backbone, $, templateMaster, setTimeout, APP, history */

	win.APP = win.APP || {};

	APP.BaseView = Backbone.View.extend({

		templates: [],
		tmpl: {},
		events: {},
		initialize: function(data) {

			data = data || {};

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

			this.disableScrollNodes();

			win.blockFix();

			win.blockFixWithScroll();


		},

		bindBackButton: function() {
			this.$el.find('.js-back').on('click', function(){
				if (Backbone.history.fragment) {
					history.back();
				}
			});
		},

		disableScroll: function (el) {

			el = el || this.$el;

			el.on('touchmove', function (e) {
				e.preventDefault();
				e.stopPropagation();
			});

		},

		disableScrollNodes: function () {

			function noScroll(e) {
				e.preventDefault();
				e.stopPropagation();
			}

			this.$el.find('.js-no-scroll').each(function () {
				this.addEventListener('touchmove', noScroll, false);
			});

		}

	});

}(window));