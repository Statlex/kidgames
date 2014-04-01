(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document, info */

	var log = console.log.bind(console);

	function Slider(wrapper) {

		this.wrapper = wrapper;

		this.innerContainer = wrapper.querySelector(':scope > div');
		this.trigger = undefined; // update calendar nodes
		this.defaultCoordinates();
		this.page = {
			width: wrapper.clientWidth
		};
	}

	Slider.prototype.init = function() {
		var that = this,
			ev = info.evt;
		this.wrapper.addEventListener(ev.down, function() {
			that.isActive = true;
			that.innerContainer.style[info.preJS + 'Transition'] = 'none';
		}, false);
		this.wrapper.addEventListener(ev.move, function() {
			if (!ev.isActive || !that.isActive) {
				return;
			}
			var dX = ev.touchStart.x - ev.touchMove.x;
			that.innerContainer.style[info.preJS + 'Transform'] = 'translate(-' + (that.page.width + dX) + 'px, 0)';
		}, false);
		this.wrapper.addEventListener(ev.up, function() {
			that.isActive = false;
			var dX = ev.touchStart.x - ev.touchMove.x,
				x = that.page.width;
			if (Math.abs(dX) < that.page.width / 2 ) {
				that.innerContainer.style[info.preJS + 'Transition'] = '0.2s all ease-out';
				that.innerContainer.style[info.preJS + 'Transform'] = 'translate(-' + x + 'px, 0)';
				return;
			}

			if (dX > 0) {
				x *= -2;
				log('to LEFT');
			} else {
				x = 0;
				log('to RIGHT');
			}

			that.innerContainer.style[info.preJS + 'Transition'] = '0.2s all ease-out';
			that.innerContainer.style[info.preJS + 'Transform'] = 'translate(' + x + 'px, 0)';

		}, false);
	};

	Slider.prototype.defaultCoordinates = function() {
		this.coordinates = {
			start: {
				x: 0,
				y: 0
			},
			move: {
				x: 0,
				y: 0
			}
		};
	};

	Slider.prototype.addRightPage = function(node) {
		var pages = this.innerContainer.querySelectorAll(':scope > div');
		if (pages.length === 3) {
			this.innerContainer.removeChild(pages[0]);
		}
		this.innerContainer.appendChild(node);
	};

	Slider.prototype.addLeftPage = function(node) {
		var pages = this.innerContainer.querySelectorAll(':scope > div');
		if (pages.length === 3) {
			this.innerContainer.removeChild(pages[2]);
		}
		this.innerContainer.insertBefore(node, pages[0]);
	};

	Slider.prototype.setStartPosition = function() {
		this.innerContainer.style[info.preJS + 'Transform'] = 'translate(-' + this.page.width + 'px, 0)';
	};



	win.Slider = Slider;

}(window, document, document.documentElement));