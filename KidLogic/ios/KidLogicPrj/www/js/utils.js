(function () {

	"use strict";
	/*global window, document, console, alert */

	var aArgs, fToBind, FNOP, fBound;

	if (!Function.prototype.bind) {

		Function.prototype.bind = function (oThis) {

			aArgs = Array.prototype.slice.call(arguments, 1);
			fToBind = this;
			FNOP = function () {};
			fBound = function () {
				return fToBind.apply(this instanceof FNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
			};

			FNOP.prototype = this.prototype;
			fBound.prototype = new FNOP();

			return fBound;
		};
	}

}());

(function () {

	"use strict";
	/*global window, document, console, alert, utils, localStorage, setTimeout */

	window.utils = {};

    window.utils.venPre = (function browserDetect(userAgent) {
        if (userAgent.indexOf('MSIE') !== -1) {
            return 'ms';
        }
        if (userAgent.indexOf('Gecko') !== -1) {
            return 'webkit';
        }
        if (userAgent.indexOf('Mozilla') !== -1) {
            return 'moz';
        }
        if (userAgent.indexOf('Opera') !== -1) {
            return 'o';
        }
        return 'webkit';
    }(window.navigator.userAgent));

	window.utils.score = {};

	utils.score = {
		getScore: function () {
			if (!this.node) {
				this.node = document.querySelector('.score .count');
			}
			this.node.innerHTML = localStorage.getItem('score') || 0;
			return this.node.innerHTML;
		},
		addToScore: function (number) {
			var curScore;
			curScore = parseInt(this.getScore(), 10);
			curScore += number;
			if (number > 0) {
				this.setColor('#0C0');
			} else {
				this.setColor('#C00');
			}

			localStorage.setItem('score', curScore);

			setTimeout(this.setColor.bind(this, ''), 2000);

		},
		show: function () {
			if (!this.node) {
				this.node = document.querySelector('.score .count');
			}
			this.node.innerHTML = this.getScore();
		},
		setColor: function (color) {
			this.node.previousSibling.style.color = color;
			this.node.style.color = color;
		}

	};

	window.utils.info = {
		curCategory: '',
		curLevel: 1,
		maxLevel: 15
	};

	utils.getRandomInt = function (min, max) {
		return Math.round(Math.random() * (max - min) + min);
	};

	utils.setBodySize = function () {
		var body;
		body = document.getElementsByTagName('body')[0];
		body.style.height = document.documentElement.clientHeight + 'px';
	};

	utils.setWrapperSize = function () {
		var wrapper;
		wrapper = document.getElementsByClassName('wrapper')[0];
		wrapper.style.height = document.documentElement.clientHeight - 32 + 'px';
	};

	utils.setCatType2 = function () {
		var divs, width, height,i, len, q;
		divs = document.querySelectorAll('.answer-div-type-2');
		len = divs.length;

		if (!len) {
			return;
		}

		q = +(document.documentElement.clientHeight > document.documentElement.clientWidth) + 1;
		width = 100 / (Math.round(len / q)) + '%';
		height = 100 / q + '%';

		for (i = 0; i < len; i += 1) {
			divs[i].style.width = width;
			divs[i].style.height = height;
		}

	};

	utils.curOrderList = [];

	utils.fitNGetItem = function(list) {
		var wrapper = document.querySelector('.wrapper');

		var catName = wrapper.getAttribute('cat-name');

		if (!catName || utils.curOrderList.length === 0) {
			wrapper.setAttribute('cat-name', true);
			// create array
			utils.curOrderList = [];
			for (var i = 0, len = list.items_number; i < len; i += 1) {
				utils.curOrderList.push(i+1);
			}

			// assort array
			utils.curOrderList.sort(function(){
				return Math.random() > 0.5;
			});
			utils.curOrderList.sort(function(){
				return Math.random() < 0.5;
			});
			utils.curOrderList.sort(function(){
				return Math.random() > 0.5;
			});

		}

		//var item = list.items['item-' + utils.getRandomInt(1, parseInt(list.items_number, 10))]; // get random item
		var item = list.items['item-' + utils.curOrderList.pop()]; // get item from random array

		item.imgPath = list.imgPath || '';
		return item;

	}

}());

