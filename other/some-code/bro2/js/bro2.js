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
				this.forEach(function(node){
					node.parentNode.removeChild(node);
				});
				this.clear();
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
		},
		clear: {
			value: function() {
				this.splice(0, this.length);
				return this;
			}
		},
		attr: {
			value: function(attr, value) {
				if (value === undefined) {
					return this[0].getAttribute(attr);
				}
				this[0].setAttribute(attr, value);
				return this;
			}
		},
		data: {
			value: function(attr, value) {
				if (value === undefined) {
					return this[0].getAttribute('data-' + attr);
				}
				this[0].setAttribute('data-' + attr, value);
				return this;
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