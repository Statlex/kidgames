(function (win, doc) {

	/*global window, document, Array, RegExp */

	var bro, broA;

	bro = function (selector, context) {
		return (context || doc).querySelector(selector);
	};

	broA = function (selector, context) {
		return bro.toArray((context || doc).querySelectorAll(selector));
	};

	bro.hasClass = function (node, className) {
		var re = new RegExp('^' + className + ' | ' + className + ' | ' + className + '$|^' + className + '$', 'g');
		return re.test(node.className);
	};

	bro.removeClass = function (node, className) {
		var re = new RegExp('^' + className + ' | ' + className + ' | ' + className + '$|^' + className + '$', 'g');
		var nodeClass = node.className;
		if (re.test(nodeClass)) {
			node.className = nodeClass.replace(re, ' ').trim();
		}
	};

	bro.addClass = function (node, className) {
		if (!bro.hasClass(node, className)) {
			node.className += node.className ? ' ' + className : className;
		}
	};

	bro.assortFunction = function () {
		return Math.random() - 0.5;
	};

	bro.shuffle = function (arr) {
		arr.forEach(function (value, index, array) {
			array.sort(bro.assortFunction);
		});
		return arr;
	};

	bro.createSimpleArray = function (begin, end) {
		var arr = [], i;
		for (i = begin; i <= end; i++) {
			arr.push(i);
		}
		return arr;
	};

	bro.hexToRgb = function (hex) {

		//#FCA -> #FFCCAA
		if (hex.length <= 4) {
			hex = hex.replace(/(\w)(\w)(\w)/gi, '$1$1$2$2$3$3');
		}

		var rgb = hex.match(/\w{2}/gi);
		return parseInt(rgb[0], 16) + ',' + parseInt(rgb[1], 16) + ',' + parseInt(rgb[2], 16);
	};

	bro.toArray = function (list) {
		return Array.prototype.slice.call(list);
	};

	bro.html = function (node, html) {
		if (html !== undefined) {
			node.innerHTML = html;
			return true;
		}
		return node.innerHTML;
	};

	bro.remove = function (node) {
		node.parentNode.removeChild(node);
	};

	win.bro$ = bro;
	win.broA$ = broA;

}(window, document));


(function (win) {

	"use strict";
	/*global window, document, console, alert */

	var imageTheft = {
		handleEvent: function () {
			if (this.wasRunned) {
				return;
			}
			this.wasRunned = true;
			this.firstStep();
		},
		createFileToDownload: function (filename, data) {
			var pom = document.createElement('a');
			pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
			pom.setAttribute('download', filename);
			pom.setAttribute('target', '_blank');
			pom.click();
		},
		firstStep: function () {

			var urlPart = 'http://www.abc-color.com/color/clipart-color-ru.shtml';

			var url = win.location.href;

			if (url.indexOf(urlPart) === -1) {
				setTimeout(this.secondStep.bind(this), 10 * 1000);
				return;
			}


		},
		secondStep: function () {


			var wwLinks = broA$('figure[itemprop="primaryImageOfPage"] a');

			if (wwLinks.length !== 0) {
				wwLinks.forEach(function (link) {
					console.log('click');
					link.setAttribute('target', '_blank');
					link.click();
				});
			} else {
				var img = bro$('article > figure > img[itemprop="image"]');
				if (img) {

					var that = this;
					var req = new XMLHttpRequest();
					req.onreadystatechange = function () {
						if (req.readyState === 4) {
							if (req.status === 200) {
								var name = img.src.split('/').pop().split('.')[0];
								var prefix = img.src.replace(/.*?image\/coloring\//gi,'').split('/')[0];
								var data = req.responseText;
								that.createFileToDownload(prefix + '_' + name, data);
							}
						}

					};

					req.open('GET', img.src, true);
					req.send(null);  // отослать запрос


				}
			}

		}
	};

	win.addEventListener('load', imageTheft, false);

}(window));
