(function (win, doc) {

	"use strict";
	/*global window, document, $, navigator */

	var docElem, ls, isTouch, info;
	docElem = doc.documentElement;
	ls = win.localStorage;
	isTouch = docElem.hasOwnProperty('ontouchstart');

	info = {
		lang: 'en', // current language
//		availableLangs: ['en', 'ru', 'de', 'zh', 'es', 'ar', 'it'],
		availableLangs: ['en', 'ru'],
		saveItem: 'red-days-storage',
		isPhone: false,
		isTouch: isTouch,
		preCSS: '-webkit-',
		preJS: 'webkit',
		isAndroid: (/android/i).test(win.navigator.userAgent),
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
				}, false);
				body.addEventListener(this.evt.move, function (e) {
					that.evt.touchMove = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					};
				}, false);

			} else {

				body.addEventListener(this.evt.down, function (e) {
					that.evt.isActive = true;
					that.evt.touchStart = {
						x: e.pageX,
						y: e.pageY
					};
					that.evt.touchMove = that.evt.touchStart;
				}, false);
				body.addEventListener(this.evt.move, function (e) {
					that.evt.touchMove = {
						x: e.pageX,
						y: e.pageY
					};
				}, false);

			}

			body.addEventListener(this.evt.up, function (e) {
				that.evt.isActive = false;
			}, false);

			body.addEventListener(this.evt.out, function (e) {
				that.evt.isActive = false;
			}, false);

		},

		// calendar part
		cycleLength: 28,
		cycleLengthMin: 21,
		cycleLengthMax: 45,
		flowMaxLength: 12,
		weekStart: 1,
		dateMap: {
			flow: 4,
			safe_1: 5,
			unsafe_1: 5,
			fertile: 4,
			unsafe_2: 5,
			safe_2: 5
		},
		flowLength: 4,
		setCalendarSetting: function() {
			var data = this.getData();

			if (data.hasOwnProperty('weekStart')) {
				return;
			}

			if (this.lang === 'ru') {
				this.set('weekStart', 1, true);
			} else {
				this.set('weekStart', 0, true);
			}

		}

	};

	win.addEventListener('load', info.getIsPhone.bind(info), false);
	win.addEventListener('resize', info.getIsPhone.bind(info), false);

	win.addEventListener('load', info.runDetector.bind(info), false);

	info.init();
	info.setCalendarSetting();

	win.info = info;

	//todo: set start week relative from localization

}(window, document));
