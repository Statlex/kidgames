(function () {

	"use strict";
	/*global window, document, console, alert, $, $$, util, app */

	window.$ = function(selector) {
		return document.querySelector(selector);
	};

	window.$$ = function(selector) {
		return document.querySelectorAll(selector);
	};

	window.$A = function(selector) {
		return Array.prototype.slice.call($$(selector));
	};

	window.util = {
		ww: document.documentElement.clientWidth,
		wh: document.documentElement.clientHeight,
		pre: 'webkit',
		fitWrapperSize: function() {
			((window.app && app.wrapper) || $('#wrapper')).style.height = util.wh + 'px';
		},
		firArticleSize: function() {
			var article = $('.simple-page article');
			var header = $('.simple-page h1');

			if (!(article && header)) {
				return;
			}
			article.style.height = util.wh - header.clientHeight - 170 + 'px';
		},
		setRandomBGP:function(node) {
			node.style.backgroundPosition = Math.round(Math.random() * 100) + '% ' + Math.round(Math.random() * 100) + '%';
		}
	};


	util.classWork = {
		// no double running functions
		classFinder: function(className) {
			// /^class$|^class\s+|\s+class\s+|\s+class$/gi
			return new RegExp('^' + className + '$|' + '^' + className + '\\s+|' + '\\s+' + className + '\\s+|' + '\\s+' + className + '$','gi');
		},
		removeClass: function(node, className) {
			node.className = node.className.replace( this.classFinder(className) , ' ').trim();
		},
		addClass: function(node, className) {
			if (!this.hasClass(node, className)) {
				node.className += ' ' + className;
			}
		},
		hasClass: function(node, className) {
			return this.classFinder(className).test(node.className) ;
		}
	};

	function resize() {
		util.ww = document.documentElement.clientWidth;
		util.wh = document.documentElement.clientHeight;
		util.fitWrapperSize();
		util.firArticleSize();
	}

	window.addEventListener('load', util.fitWrapperSize, false);

	window.addEventListener('resize', resize, false);

}());

