(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */


	var isTouch, info, bro, re, events;
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
			isClick: function () {
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
		init: function () {
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

	re = {
		htmlNode: /^<[\s\S]+>$/
	};

	events = {
		type: ['blur', 'focus', 'focusin', 'focusout', 'load', 'resize', 'scroll', 'unload',
			'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout',
			'mouseenter', 'mouseleave', 'change', 'select', 'submit', 'keydown',
			'keypress', 'keyup', 'error', 'contextmenu']
	};

	function Bro(selector, context) {
		if (!this) {
			return new Bro(selector, context);
		}
		this.init(selector, context);
	}

	bro = function (selector, context) {
		return new Bro(selector, context);
	};

	Bro.prototype = Object.create(Array.prototype);

	Bro.prototype.html = function (html) {
		var elem = this[0] || {};
		if (html === undefined) {
			return elem.innerHTML || '';
		}
		elem.innerHTML = html;
		return this;
	};

	Bro.prototype.attr = function (attribute, value) {

		var elem = this[0];

		if (!elem) {
			return this;
		}

		// try to get attribute
		if (value === undefined && typeof attribute === 'string') {
			return elem.getAttribute(attribute);
		}

		this.setAttribute(attribute, value);

		return this;

	};

	Bro.prototype.init = function (selector, context) {

		// detect empty selector
		if (!selector) {
			return this;
		}

		if (typeof selector === 'function') {
			win.addEventListener('load', selector, false);
			return this;
		}

		// detect Bro
		if (selector instanceof Bro) {
			return selector;
		}

		if (typeof selector === "string") {

			var nodes, isHTML, tempNode;
			if (re.htmlNode.test(selector)) {
				// create new node
				tempNode = doc.createElement('div');
				tempNode.innerHTML = selector;
				nodes = tempNode.childNodes;
				isHTML = true;
			} else {
				// find nodes
				if (context && context.querySelectorAll) {
					// detect DOMNode or doc
					nodes = context.querySelectorAll(selector);
				} else if (context && context.find) {
					// detect bro
					nodes = context.find(selector);
				} else {
					// find in doc
					nodes = doc.querySelectorAll(selector);
				}
			}

			this.forEach.call(nodes, function (node) {
				this.push(node);
			}, this);

			if (isHTML && context) {
				if (context.append) {
					context.append(this);
				} else if (context.appendChild) {
					this.forEach(function (node) {
						context.appendChild(node);
					});
				}
			}

			// detect single node
		} else if (selector.nodeType || selector === win || selector === doc) {
			this.selector = selector;
			this.push(selector);
			// detect nodeList and Array
		} else if (typeof selector.length === 'number') {
			this.forEach.call(selector, function (node) {
				this.push(node);
			}, this);
			this.selector = selector;
			// detect function
		}

		if (this.isPlainObject(context)) {
			this.setAttribute(context);
		}

		this.context = context;

		return this;

	};

	Bro.prototype.isEmpty = function () {
		return !!this.length;
	};

	Bro.prototype.isPlainObject = function (obj) {
		return obj && obj.constructor === Object;
	};

	Bro.prototype.setAttribute = function (attribute, value) {

		// try to set attribute
		if (typeof attribute === 'string') {
			this.forEach(function (node) {
				node.setAttribute(attribute, value);
			});
		} else {
			this.forEach(function (node) {
				var key;
				for (key in attribute) {
					if (attribute.hasOwnProperty(key)) {
						node.setAttribute(key, attribute[key]);
					}
				}
			});
		}

		return this;

	};

	Bro.prototype.find = function (selecotor) {
		var nodes = [];
		this.forEach(function (node) {
			var childes = node.querySelectorAll(selecotor);
			this.forEach.call(childes, function (node) {
				nodes.push(node);
			});
		}, this);
		return new Bro(nodes);
	};

	Bro.prototype.append = function (nodes) {
		var elem = this[0];

		if (!elem) {
			return this;
		}

		this.forEach.call(nodes, function (node) {
			elem.appendChild(node);
		});

		return this;

	};

	Bro.prototype.appendTo = function (elem) {

		if (!elem) {
			return this;
		}

		if (typeof elem === 'string') {
			elem = new Bro(elem);
		}

		if (elem.append) {
			elem.append(this);
			return this;
		}

		elem = elem[0] || elem;
		if (elem.appendChild) {
			this.forEach(function (node) {
				elem.appendChild(node);
			});
		}

		return this;

	};

	Bro.prototype.hasClass = function (className) {
		var has = false;
		this.forEach(function (node) {
			if (has) {
				return;
			}
			has = node.classList.contains(className);
		});
		return has;
	};

	Bro.prototype.addClass = function (className) {
		this.forEach(function (node) {
			node.classList.add(className);
		});
		return this;
	};

	Bro.prototype.removeClass = function (className) {
		this.forEach(function (node) {
			node.classList.remove(className);
		});
		return this;
	};

	Bro.prototype.toggleClass = function (className, addOrRemove) {

		if (addOrRemove !== undefined) {
			if (addOrRemove) {
				this.addClass(className);
			} else {
				this.removeClass(className);
			}
			return this;
		}

		this.forEach(function (node) {
			node.classList.toggle(className);
		});

		return this;

	};

	Bro.prototype.each = function(func) {
		this.forEach(function(node, index) {
			func.call(node, index, node);
		}, this);

		return this;

	};

	Bro.prototype.on = function(type, selector, data, func) {

		if (!selector) { // click
			this.forEach(function(node){
				var evObj = document.createEvent('Events');
				evObj.initEvent(type, true, false);
				node.dispatchEvent(evObj);
			});
			return this;
		}

		var nodes = this;

		if (typeof selector === 'function') { // click, func
			func = selector;
		} else if (typeof func === 'function') { // click, 'span', {rr:55}, func
			nodes = this.find(selector);
		} else if (this.isPlainObject(selector)) { // click, {rr:55}, func
			func = data;
			data = selector;
		} else {                                    // click, 'span', func
			nodes = this.find(selector);
			func = data;
			data = undefined;
		}

		if (data) {
			nodes.forEach(function(node){
				node.addEventListener(type, function(e){
					e.data = data;
					func.call(node, e);
				}, false);
			});
		} else {
			nodes.forEach(function(node){
				node.addEventListener(type, func, false);
			});
		}

		return this;

	};

	Bro.prototype.off = function(type, selector, func) {

		var nodes = this;

		if (typeof selector === 'string') { // click, selector, func
			nodes = this.find(selector);
		} else {
			func = selector;
		}

		if (type) {
			nodes.forEach(function(node){
				node.removeEventListener(type, func);
			});
		} else {
			nodes.forEach(function(node){
				node.parentNode.replaceChild(node.cloneNode(true), node);
			});
		}

		return this;

	};

	Bro.prototype.remove = function() {
		this.forEach(function(node){
			node.parentNode.removeChild(node);
		}, this);
		this.splice(0, this.length);
		return this;
	};

	Bro.prototype.show = function() {
		this.forEach(function(node){
			node.style.display = 'block';
		});
	};

	Bro.prototype.hide = function() {
		this.forEach(function(node){
			node.style.display = 'none';
		});
	};

	Bro.prototype.css = function(css, value) {

		if (typeof value === "string") { /// display , block
			this.forEach(function(node){
				node.style[css] = value;
			});
		} else if (typeof css === "string") { // display
			if (this.length) {
				return win.getComputedStyle(this[0], null)[css];
			}
		} else { // {}
			this.forEach(function(node){
				var key;
				for (key in css) {
					if (css.hasOwnProperty(key)) {
						node.style[key] = css[key];
					}
				}
			});
		}

		return this;

	};

	Bro.prototype.eq = function(number) {
		return new Bro(this[number]);
	};

	Bro.prototype.empty = function() {
		this.forEach(function(node){
			while (node.firstChild) {
				node.removeChild(node.firstChild);
			}
		});
	};

	win.$ = bro;

	//win.Bro = Bro;

}(window, document, document.documentElement));