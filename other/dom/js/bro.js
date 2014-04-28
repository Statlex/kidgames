(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */


	var isTouch, info, util, bro;
	isTouch = docElem.hasOwnProperty('ontouchstart');

	//=== info start ===//
	info = {
		isPhone: false,
		isTouch: isTouch,
		preCSS: '-webkit-',
		preJS: 'webkit',
		evt: {
			down: isTouch ? 'touchstart' : 'mousedown',
			move: isTouch ? 'touchmove' : 'mousemove',
			up: isTouch ? 'touchend' : 'mouseup',
			out: isTouch ? 'touchcancel' : 'mouseout',
			touchStart: {
				x: 0,
				y: 0
			},
			touchMove: {
				x: 0,
				y: 0
			},
			isActive: false,
			isClick: function() {
				return Math.abs(this.touchMove.x - this.touchStart.x) < 5 && Math.abs(this.touchMove.y - this.touchStart.y) < 5;
			}
		},
		screen: {
			getWidth: function () {
				return docElem.clientWidth;
			},
			getHeight: function () {
				return docElem.clientHeight;
			},
			getAspectRatio: function () {
				return docElem.clientWidth / docElem.clientHeight;
			}
		},
		init: function() {
			this.getIsPhone();
			this.runDetector();
		},
		getIsPhone: function () {
			var h, w, maxSize;
			w = docElem.clientWidth;
			h = docElem.clientHeight;
			maxSize = (h > w) ? h : w;
			this.isPhone = maxSize < 700;
			return this.isPhone;
		},
		runDetector: function () {

			var body = doc.body,
				that = this;

			// detect XY onTouchStart
			if (this.isTouch) {

				body.addEventListener(this.evt.down, function (e) {
					that.evt.isActive = true;
					that.evt.touchStart = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					};
					that.evt.touchMove = that.evt.touchStart;
				}, true);
				body.addEventListener(this.evt.move, function (e) {
					that.evt.touchMove = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					};
				}, true);

			} else {

				body.addEventListener(this.evt.down, function (e) {
					that.evt.isActive = true;
					that.evt.touchStart = {
						x: e.pageX,
						y: e.pageY
					};
					that.evt.touchMove = that.evt.touchStart;
				}, true);
				body.addEventListener(this.evt.move, function (e) {
					that.evt.touchMove = {
						x: e.pageX,
						y: e.pageY
					};
				}, true);

			}

			body.addEventListener(this.evt.up, function () {
				that.evt.isActive = false;
			}, true);

			body.addEventListener(this.evt.out, function () {
				that.evt.isActive = false;
			}, true);

		}

	};

	win.addEventListener('load', info.init.bind(info), false);
	//=== info end ===//

	//=== util start ===//
	util = {
		arr: Array.prototype,
		toArray: function(list) {
			return this.arr.slice.call(list);
		}
	};
	//=== util end ===//

	function Bro(selector, context) {
		if (!this) {
			return new Bro(selector, context);
		}
		this.init(selector, context || doc);
	}

	bro = function(selector, context) {
		return new Bro(selector, context);
	};

	Bro.prototype = Object.create(Array.prototype);

	Bro.prototype.html = function(html) {
		var elem = this[0] || {};
		if (html === undefined) {
			return elem.innerHTML || '';
		}
		elem.innerHTML = html;
		return this;
	};

	Bro.prototype.attr = function(attribute, value) {
		var elem = this[0];
		if (!elem) {
			return this;
		}
		if (value === undefined) {
			return elem.getAttribute(attribute);
		}
		// TODO: detect list of attributes in {}
		elem.setAttribute(attribute, value);
		return this;
	};

	Bro.prototype.init = function(selector, context) {
		if (!selector) {
			return;
		}
		this.selector = selector;
		this.context = context;
		var nodes = context.querySelectorAll(selector);
		util.arr.forEach.call(nodes, function(node) {
			this.push(node);
		}, this);
	};

	Bro.prototype.isEmpty = function() {
		return !!this.length;
	};


	win.$ = bro;

	//win.Bro = Bro;

}(window, document, document.documentElement));