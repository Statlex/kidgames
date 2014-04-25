(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */


	var isTouch, info, util;
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
			this.runDetector();
		},
		getIsPhone: function () {
			var h, w, maxSize;
			w = docElem.clientWidth;
			h = docElem.clientHeight;
			maxSize = (h > w) ? h : w;
			return this.isPhone = (maxSize < 700);
		},
		runDetector: function () {

			var body = document.body,
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

	var bro = function(selector, context) {
		return new Bro(selector, context);
	};

	bro.ajax = function() {

	};

	function Bro(selector, context) {
		this.init(selector, context || doc);
	};

	Bro.prototype = Array.prototype;

	Bro.prototype.html = function(html) {
		var elem = this[0] || {};
		if (html === undefined) {
			return elem.innerHTML || '';
		}
		elem.innerHTML = html;
		return this;
	};

	Bro.prototype.init = function(selector, context) {
		this.selector = selector;
		this.context = context;
		var nodes = context.querySelectorAll(selector);
		util.arr.forEach.call(nodes, function(node) {
			this.push(node);
		}, this);
	};

	win.bro = bro;

}(window, document, document.documentElement));