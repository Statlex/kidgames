(function () {

	"use strict";
	/*global window, document, console, alert */

	var utils = {
		getCurrentPosition: function(style) {
			if (style.indexOf('translate') !== -1) {
				var arr = style.match(/-?\d+/gi);
				return {
					x: parseInt(arr[0], 10),
					y: parseInt(arr[1], 10)
				};
			} else {
				return {
					x: 0,
					y: 0
				};
			}
		}
	};

	function BlockMover(node) {
		this.node = node;
		this.isActive = false;
		this.init();
	}

	BlockMover.prototype.init = function() {
		var that = this;

		// touch start
		this.node.addEventListener(info.evt.down, function(e) {
			that.isActive = true;
			that.nodeStyle = this.style[info.preJS + 'Transform'];
			that.styleStart = utils.getCurrentPosition(that.nodeStyle);
			that.eventStart = {
				x: info.isTouch ? e.touches[0].pageX : e.pageX,
				y: info.isTouch ? e.touches[0].pageY : e.pageY
			};
			that.eventCurrent = {
				x: info.isTouch ? e.touches[0].pageX : e.pageX,
				y: info.isTouch ? e.touches[0].pageY : e.pageY
			};

			// get max min xy
			var imageWidth = parseInt(that.node.style.width, 10);
			var imageHeight = parseInt(that.node.style.height, 10);
			var screenWidth = info.screen.getWidth();
			var screenHeight = info.screen.getHeight();

			that.coordinates = {
				min: {
					x: (imageWidth < screenWidth) ? -Math.round(imageWidth / 2) : -Math.round(imageWidth - screenWidth / 2),
					y: (imageHeight < screenHeight) ? -Math.round(imageHeight / 2) : -Math.round(imageHeight - screenHeight / 2)
				},
				max: {
					x: (imageWidth < screenWidth) ? Math.round(screenWidth - imageWidth / 2) : Math.round(screenWidth / 2),
					y: (imageHeight < screenHeight) ? Math.round(screenHeight - imageHeight / 2) : Math.round(screenHeight / 2)
				}
			};

			e.preventDefault();

		}, false);

		this.node.addEventListener(info.evt.move, function(e) {
			if (!that.isActive) {
				return;
			}
			that.eventCurrent = {
				x: info.isTouch ? e.touches[0].pageX : e.pageX,
				y: info.isTouch ? e.touches[0].pageY : e.pageY
			};
			var dX = that.eventCurrent.x - that.eventStart.x;
			var dY = that.eventCurrent.y - that.eventStart.y;
			var x = that.styleStart.x + dX;
			var y = that.styleStart.y + dY;

			if (x > that.coordinates.max.x) {
				x = that.coordinates.max.x;
			}
			if (y > that.coordinates.max.y) {
				y = that.coordinates.max.y;
			}
			if (x < that.coordinates.min.x) {
				x = that.coordinates.min.x;
			}
			if (y < that.coordinates.min.y) {
				y = that.coordinates.min.y;
			}

			that.node.style[info.preJS + 'Transform'] = 'translate(' + x + 'px, ' + y + 'px)';

			e.preventDefault();
		}, false);

		this.node.addEventListener(info.evt.up, function(e) {
			that.isActive = false;
			e.preventDefault();
		}, false);

		this.node.addEventListener(info.evt.out, function(e) {
			that.isActive = false;
			e.preventDefault();
		}, false);

		window.addEventListener('resize', this.restorePosition.bind(this), false);

	};

	BlockMover.prototype.restorePosition = function() {
		this.node.style[info.preJS + 'Transform'] = 'translate(0px, 0px)';
	};

	window.BlockMover = BlockMover;

}());
