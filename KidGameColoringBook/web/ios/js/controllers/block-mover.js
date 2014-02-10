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
				x: info.isTouch ? e.touches[0].pageX : e.x,
				y: info.isTouch ? e.touches[0].pageY : e.y
			};
			that.eventCurrent = {
				x: info.isTouch ? e.touches[0].pageX : e.x,
				y: info.isTouch ? e.touches[0].pageY : e.y
			};
			e.preventDefault();
			e.stopPropagation();
		}, false);

		this.node.addEventListener(info.evt.move, function(e) {
			if (!that.isActive) {
				return;
			}
			that.eventCurrent = {
				x: info.isTouch ? e.touches[0].pageX : e.x,
				y: info.isTouch ? e.touches[0].pageY : e.y
			};
			var dX = that.eventCurrent.x - that.eventStart.x;
			var dY = that.eventCurrent.y - that.eventStart.y;
			that.node.style[info.preJS + 'Transform'] = 'translate(' + (that.styleStart.x + dX) + 'px, ' + (that.styleStart.y + dY) + 'px)';
			e.preventDefault();
			e.stopPropagation();
		}, false);

		this.node.addEventListener(info.evt.up, function(e) {
			that.isActive = false;
			e.preventDefault();
			e.stopPropagation();
		}, false);

	};

	window.BlockMover = BlockMover;

}());
