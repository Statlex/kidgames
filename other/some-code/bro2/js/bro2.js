(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */

	var fn;

	fn = {
		on: {
			value: function (eventName, func) {
				this.forEach(function (node) {
					node.addEventListener(eventName, func, false);
				});
				return this;
			}
		},
		init: {
			value: function (arr) {
				this.toArray(arr).forEach(function (value) {
					this.push(value);
				}, this);
				return this;
			}
		},
		toArray: {
			value: function (obj) {
				return Array.prototype.slice.call(obj || []);
			}
		},
		addClass: {
			value: function (className) {
				this.forEach(function (node) {
					node.classList.add(className);
				});
				return this;
			}
		},
		hasClass: {
			value: function (className) {
				return this[0].classList.contains(className);
			}
		},
		removeClass: {
			value: function (className) {
				this.forEach(function (node) {
					node.classList.remove(className);
				});
				return this;
			}
		},
		html: {
			value: function (html) {
				if (html !== undefined) {
					return this[0].innerHTML;
				}
				this[0].innerHTML = html;
				return this;
			}
		},
		remove: {
			value: function () {
				var node;
				while (this.length) {
					node = this.pop();
					node.parentNode.removeChild(node);
				}
				return this;
			}
		},
		isEmpty: {
			value: function () {
				var isEmpty = true;
				this.forEach(function (value) {
					isEmpty = isEmpty ? !value : false;
				});
				return isEmpty;
			}
		}

	};

	function Bro(nodeList) {
		this.init(nodeList);
	}

	Bro.prototype = Object.create(Array.prototype, fn);

	function finder(selector, context) {

		var nodeList;

		if (typeof selector === 'string') {
			if (context) {
				context = context.nodeList || context;
			}
			nodeList = (context || doc).querySelectorAll(selector);
			return new Bro(nodeList);
		}

		if (selector === win || selector === doc) {
			return new Bro([selector]);
		}

		return null;

	}

	finder.updateFn = function (name, func) {
		fn[name] = {
			value: func
		};
		Bro.prototype = Object.create(Array.prototype, fn);
	};

	win.$ = finder;

}(window, document, document.documentElement));