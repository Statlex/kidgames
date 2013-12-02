(function () {

	"use strict";
	/*global window, document, console, alert, swipe, KG, setTimeout, title, Audio, swipeVars, parseInt */

	window.addEventListener('load', function () {
		swipe('#container', '{vertical : false, pagination : true}');
		swipe('.vertical-container', '{vertical : true, pagination : true}');
	}, false);

	window.lb = window.lb || {}; // learn_basics object
	var self = window.lb;

	self.sound = {
		list: {
//			0: 'sound/lb/1.' + KG.volume.format,
//			1: 'sound/lb/2.' + KG.volume.format,
//			2: 'sound/lb/3.' + KG.volume.format,
//			3: 'sound/lb/0.' + KG.volume.format,
//			4: 'sound/lb/3.' + KG.volume.format,
//			5: 'sound/lb/3.' + KG.volume.format,
//			6: 'sound/lb/3.' + KG.volume.format
		},
		sounds: {},
		init: function () {
			var key;
			for (key in self.sound.list) {
				if (self.sound.list.hasOwnProperty(key)) {
//					self.sound.sounds[key] = new Audio(self.sound.list[key]);
				}
			}

/*
self.sound.sounds[0].volume = KG.volume.getPercent(); // see list
self.sound.sounds[0].play();
*/
		}
/*
		breakSound: function () {
			var key;
			for (key in self.sound.sounds) {
				if (self.sound.sounds.hasOwnProperty(key) && swipeVars.curPageX !== key) {
					try {
						self.sound.sounds[key].pause();
						self.sound.sounds[key].currentTime = 0;
					} catch (e) {
					}
				}
			}
		}
*/
	};

	function initSwipe() {
		var container, prefix, verticalContainer, halfWidth, halfHeight, i, len;
		halfWidth = -(document.documentElement.clientWidth / 2);
		halfHeight = -(document.documentElement.clientHeight / 2);
		container = document.getElementById('container');
		verticalContainer = document.querySelectorAll('.vertical-container');
		prefix = title.vendorPrefix;

		container.style[swipeVars.vendorPrefix + 'Transition'] = 'all 0.1s linear';

		setTimeout(function () {
			container.style[prefix + 'Transform'] = 'translate(' + halfWidth + 'px,0px)';
			for (i = 0, len = verticalContainer.length; i < len; i += 1) {
				verticalContainer[i].style[prefix + 'Transform'] = 'translate(0px,' + halfHeight + 'px)';
			}
		}, 50);

		setTimeout(function () {
			container.style[prefix + 'Transform'] = 'translate(0px,0px)';
			for (i = 0, len = verticalContainer.length; i < len; i += 1) {
				verticalContainer[i].style[prefix + 'Transform'] = 'translate(0px,0px)';
			}
		}, 100);
	}


	function setArrowButtons() {
		var up, down, left, right;

		function horizontalSwipe(direction) {
			var page, style, re, currentPage, maxPage, nextPage, xPosition, container;
			re = /-?\d+px/i;
			container = document.getElementById('container');
			page = container.querySelector('.page');
			maxPage = Math.round(container.clientWidth / page.clientWidth) - 1;
//			console.log(maxPage);
			style = container.style[swipeVars.vendorPrefix + 'Transform'] || false;
			currentPage = -Math.round(parseInt(re.exec(style), 10) / page.clientWidth);
			nextPage = currentPage + (direction || 0);
			nextPage = (nextPage < 0) ? 0 : nextPage;
			nextPage = (nextPage > maxPage) ? maxPage : nextPage;
			xPosition = -nextPage * page.clientWidth;
//			container.style.transition = '';

			container.style[swipeVars.vendorPrefix + 'Transition'] = 'all 0.25s ease-out';
			setTimeout(function(){
				container.style[swipeVars.vendorPrefix + 'Transform'] = 'translate(' + xPosition + 'px, 0px)';
			}, 50);

//			console.log(nextPage);
			return currentPage;
		}

		up = document.querySelector('.slide-up');
		down = document.querySelector('.slide-down');
		left = document.querySelector('.slide-left');
		right = document.querySelector('.slide-right');

		function verticalSwipe(curColumn ,direction) {
			var page, style, re, currentPage, maxPage, nextPage, xPosition, container;
			re = /-?\d+px\)/gi;
			container = document.querySelectorAll('.vertical-container')[curColumn];

			page = container.querySelector('.image-wrapper');
			maxPage = Math.round(container.clientHeight / page.clientHeight) - 1;
//			console.log(maxPage);
			style = container.style[swipeVars.vendorPrefix + 'Transform'] || false;

			currentPage = -Math.round(parseInt(re.exec(style), 10) / page.clientHeight);
			nextPage = currentPage + (direction || 0);
			nextPage = (nextPage < 0) ? 0 : nextPage;
			nextPage = (nextPage > maxPage) ? maxPage : nextPage;
			xPosition = -nextPage * page.clientHeight;

			container.style[swipeVars.vendorPrefix + 'Transition'] = 'all 0.25s ease-out';
			setTimeout(function(){
				container.style[swipeVars.vendorPrefix + 'Transform'] = 'translate(0px,' + xPosition + 'px)';
			}, 50);

//			console.log(nextPage);
			return currentPage;

		}

		function slideUp() {
			verticalSwipe(horizontalSwipe(), -1);
		}

		function slideDown() {
			verticalSwipe(horizontalSwipe(), 1);
		}

		function slideLeft() {
			horizontalSwipe(-1);
		}


		function slideRight() {
			horizontalSwipe(+1);
		}

		up.addEventListener('click', slideUp, false);
		down.addEventListener('click', slideDown, false);
		left.addEventListener('click', slideLeft, false);
		right.addEventListener('click', slideRight, false);

	}

	self.init = function () {
//		self.sound.init();
		initSwipe();
		setArrowButtons();
	};

	window.addEventListener('load', self.init, false);

}());


