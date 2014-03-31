(function (win, doc) {

	"use strict";
	/*global window, document, Array, RegExp */

	var bro = {
		find: function(selector, context) {
			return (context || doc).querySelector(selector);
		},
		findAll: function(selector, context) {
			return this.toArray((context || doc).querySelectorAll(selector));
		},
		toArray: function(list) {
			return Array.prototype.slice.call(list);
		},
		html: function (node, html) {
			if (html !== undefined) {
				node.innerHTML = html;
				return node;
			}
			return node.innerHTML;
		},
		attr: function (node, attribute, value) {
			if (value !== undefined) {
				node.setAttribute(attribute, value);
				return node;
			}
			return node.getAttribute(attribute);
		},
		remove: function (node) {
			node.parentNode.removeChild(node);
			return true;
		},
		hasClass:function (node, className) {
			return node.classList.contains(className);
		},
		removeClass: function (node, className) {
			node.classList.remove(className);
			return node;
		},
		addClass: function (node, className) {
			node.classList.add(className);
			return node;
		},
		shuffle: function (arr) {
			return arr.sort(function () {
				return Math.random() - 0.5;
			});
		},
		createSimpleArray: function (begin, end) {
			var arr = [], i;
			for (i = begin; i <= end; i += 1) {
				arr.push(i);
			}
			return arr;
		},
		hexToRgb: function (hex) {
			//#FCA -> #FFCCAA
			if (hex.length <= 4) {
				hex = hex.replace(/(\w)(\w)(\w)/gi, '$1$1$2$2$3$3');
			}

			var rgb = hex.match(/\w{2}/gi);
			return parseInt(rgb[0], 16) + ',' + parseInt(rgb[1], 16) + ',' + parseInt(rgb[2], 16);
		}
	};

	// support old browser - classList
	(function () {

		// detect support Node.classList API
		if (doc.documentElement.hasOwnProperty('classList')) {
			return;
		}

		bro.hasClass = function (node, className) {
			return node.className.split(' ').indexOf(className) !== -1;
		};

		bro.removeClass = function (node, className) {
			var classArr, classIndex;
			classArr = node.className.split(' ');
			classIndex = classArr.indexOf(className);
			if (classIndex === -1) {
				return;
			}
			classArr.splice(classIndex, 1);
			node.className = classArr.join(' ');
			return node;
		};

		bro.addClass = function (node, className) {
			if (bro.hasClass(node, className)) {
				return;
			}
			node.className += node.className ? ' ' + className : className;
			return node;
		};

	}());

	win.util = bro;

}(window, document));
