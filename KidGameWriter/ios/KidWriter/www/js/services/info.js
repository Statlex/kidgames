(function (win, doc) {

	"use strict";
	/*global window, document, $, navigator */

	var docElem, ls, isTouch, info;
	docElem = doc.documentElement;
	ls = win.localStorage;
	isTouch = docElem.hasOwnProperty('ontouchstart');

	info = {
		lang: 'en', // current language
		availableLangs: ['en', 'ru'],
		saveItem: 'save-item-kid-game-logic-re-think',
		isPhone: false,
		isTouch: isTouch,
		preCSS: '-webkit-',
		preJS: 'webkit',
		canScroll: false,
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
		debuggerConsole: {
			isActive: false,
			position: 'right' // while not use
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

		getData: function () {
			var data = ls.getItem(this.saveItem) || '{}';
			return JSON.parse(data);
		},
		get: function (key) {
			return this[key];
		},
		set: function (key, value, toLS) {
			this[key] = value;

			if (!toLS) {
				return;
			}

			// save data to ls
			var data = this.getData();
			data[key] = value;
			data = JSON.stringify(data);
			ls.setItem(this.saveItem, data);
		},
		change: function (key, delta, toLS) {
			this.set(key, (this.get(key) || 0) + delta, toLS);
		},

		init: function () {

			// set all fields from ls to info
			this.setDataFromLS();

			// try to get current language
			var lang = this.get('lang') || (navigator.language || navigator.userLanguage);
			lang = lang.split('-')[0];
			this.lang = (this.availableLangs.indexOf(lang) === -1) ? this.lang : lang;
		},
		setDataFromLS: function () {
			var data = this.getData(),
				key;
			for (key in data) {
				if (data.hasOwnProperty(key)) {
					this[key] = data[key];
				}
			}
		},
		getIsPhone: function () {
			var maxSize = (docElem.clientHeight > docElem.clientWidth) ? docElem.clientHeight : docElem.clientWidth;
			this.isPhone = maxSize < 700;
			return this.isPhone;
		},
		runDetector: function () {

			var body = $('body'),
				that = this;

			// detect XY onTouchStart
			if (this.isTouch) {
				body.addEventListener(this.evt.down, function (e) {
					that.evt.touchStart = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					};
					that.evt.touchMove = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					};
					that.evt.isActive = true;
				}, true);
				body.addEventListener(this.evt.move, function (e) {
					that.evt.touchMove = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					};
				}, true);
			} else {
				body.addEventListener(this.evt.down, function (e) {
					that.evt.touchStart = {
						x: e.pageX,
						y: e.pageY
					};
					that.evt.touchMove = {
						x: e.pageX,
						y: e.pageY
					};
					that.evt.isActive = true;
				}, true);
				body.addEventListener(this.evt.move, function (e) {
					that.evt.touchMove = {
						x: e.pageX,
						y: e.pageY
					};
				}, true);
			}

			body.addEventListener(this.evt.up, function (e) {
				that.evt.isActive = false;
			}, true);

			body.addEventListener(this.evt.out, function (e) {
				that.evt.isActive = false;
			}, true);

		}
	};

	win.addEventListener('load', info.getIsPhone.bind(info), false);
	win.addEventListener('resize', info.getIsPhone.bind(info), false);

	win.addEventListener('load', info.runDetector.bind(info), false);

	info.init();

	win.info = info;

}(window, document));
