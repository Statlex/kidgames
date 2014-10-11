(function (win) {

	"use strict";
	/*global window, Backbone, $, templateMaster, setTimeout, APP, history */

	win.APP = win.APP || {};

	APP.BaseView = Backbone.View.extend({

		events: {
			'click [data-route]': 'routeTo',
			'click .js-back': 'routeBack'
		},

		direction: {
			forward: 'forward',
			back: 'back'
		},

		baseConstructor: function() {

			var proto = APP.BaseView.prototype,
				events = _.extend( {}, proto.events, this.events );

			if (APP.info.isTouch) {
				$.each( events, function( key, value ) {

					var newKey = key.replace(/^click(?=\s+)/i, 'tap');

					if (newKey !== key) {
						delete events[key];
						events[newKey] = value;
					}

				});

			}

			this.events = events;

			proto.constructor.apply(this, arguments);

		},

		baseInitialize: function() {
			this.initialize();
		},

		initialize: function() {

			this.$el.addClass('js-page-wrapper page-wrapper');

			APP.$wrapper.append(this.$el);

			this.showDirectionAnimation();

		},

		showDirectionAnimation: function() {

			this.detectDirection();

			var $wrappers = APP.$wrapper.find('.js-page-wrapper'),
				$prev = $wrappers.eq(0),
				$next = $wrappers.eq(1);

			if ($wrappers.length === 1) {
				$wrappers.removeClass('left-position center-position right-position transition hidden').addClass('static');
				return;
			}

			if (APP.router.direction === this.direction.forward) {
				$next.addClass('right-position');
				$wrappers.addClass('transition');

				$prev.on(APP.info.preJS + 'TransitionEnd', function(){
					this.parentNode.removeChild(this);
				});

				$next.on(APP.info.preJS + 'TransitionEnd', function(){
					$(this).removeClass('left-position center-position right-position transition').addClass('static');
				});

				setTimeout(function(){
					$next.addClass('center-position');
					$prev.addClass('left-position');
				}, 100);

			}

			if (APP.router.direction === this.direction.back) {
				$next.addClass('left-position');
				$prev.removeClass('static');
				$wrappers.addClass('transition');

				$prev.on(APP.info.preJS + 'TransitionEnd', function(){
					this.parentNode.removeChild(this);
				});

				$next.on(APP.info.preJS + 'TransitionEnd', function(){
					$(this).removeClass('left-position center-position right-position transition').addClass('static');
				});

				setTimeout(function(){
					$next.removeClass('left-position').addClass('center-position');
					$prev.addClass('right-position');
				}, 100);

			}

		},

		detectDirection: function() {

			var router = APP.router,
				prevUrl = router.prevUrl,
				curUrl = Backbone.history.fragment;

			router.direction = curUrl.indexOf(prevUrl) ? this.direction.back : this.direction.forward;

			router.prevUrl = curUrl;

		},

		navigate: function() { //url, options
			APP.router.navigate.apply(APP.router, arguments);
		},

		routeTo: function(e) {

			var $this = $(e.currentTarget),
				route = $this.data('route');

			this.navigate(route, true);

		},

		routeBack: function() {

			if (Backbone.history.fragment) {
				Backbone.history.history.back();
			}

		}

	});

}(window));