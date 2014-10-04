(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global $ */

	function MoveArea (data) {

		this.$el = {
			wrapper:{
				$el: data.$wrapper,
				coordinates: {}
			},
			container: {
				$el: data.$container,
				coordinates: {}
			}
		};

		var bro = $();
		this.bro = bro;
		this.vendor = bro.getVendorPrefix();
		this.info = bro.info();
		this.evt = this.info.evt;

		this.setDefaultCoordinates();
		this.bindEventListeners();

	}

	MoveArea.prototype = {

		setDefaultCoordinates: function() {

			var $container = this.$el.container.$el,
				containerNode = $container[0];

			$container[0].style[this.vendor.js + 'Transform'] = 'translate(10px, 10px)';

		},

		getCoordinates: function($node) {

			var style = $node[0].style[this.vendor.js + 'Transform'],
				coordinates = style.match(/-?\d+/gi);

			coordinates = {
				x: +coordinates[0],
				y: +coordinates[1]
			};

			return coordinates;

		},
		bindEventListeners: function() {

			var wrapper = this.$el.wrapper.$el;

			wrapper.on('mousedown', this.detectStartPosition.bind(this));
			wrapper.on('mousemove', this.moveTo.bind(this));

		},
		detectStartPosition: function() {

			var container = this.$el.container,
				$container = container.$el,
				coordinates = this.getCoordinates($container);

			container.coordinates.start = coordinates;

		},
		moveTo: function() {

			if (!this.evt.isActive) {
				return;
			}

			var evt = this.evt,
				start = evt.touchStart,
				move = evt.touchMove,
				delta = {
					x: start.x - move.x,
					y: start.y - move.y
				},
				container = this.$el.container,
				$container = container.$el;

			if ( Math.abs(delta.x) + Math.abs(delta.y) < 5 ) {
				return;
			}

			$container[0].style[this.vendor.js + 'Transform'] = 'translate(' + (container.coordinates.start.x - delta.x) + 'px, ' + (container.coordinates.start.y - delta.y) + 'px)';


		}
	};

	win.MoveArea = MoveArea;

}(window, document, document.documentElement));















