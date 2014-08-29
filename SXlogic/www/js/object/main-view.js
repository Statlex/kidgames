(function (win) {

	"use strict";
	/*global window, Backbone, $, templateMaster, setTimeout, APP */

	win.APP = win.APP || {};

	win.APP.MainView = Backbone.View.extend({

		templates: [],
		tmpl: {},
		events: {},
		initialize: function(data) {

			data = data || {};

			// detect current state
			data.forceDraw = data.forceDraw || this.forceDraw;
			if (!data.forceDraw) {
				if  (win.APP.viewState === this.templates) {
					return data.currentView;
				}
			}

			win.APP.viewState = this.templates;

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

			this.bindSettingsButton();

			this.bindExternalLinks();

			this.setStyles();

		},

		bindBackButton: function() {
			this.$el.find('.js-back').on('click', function(){
				if (Backbone.history.fragment) {
					Backbone.history.history.back();
				}
			});
		},

		bindExternalLinks: function() {

			this.$el.find('[data-external-link]').on('click', function(e){
				win.open(this.dataset.externalLink);
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

		},
		bindSettingsButton: function() {
			var btn = this.$el.find('.js-settings-button');
			btn.on('click', function(){
				APP.router.navigate('settings', {trigger: true});
			});
		}




	});

}(window));