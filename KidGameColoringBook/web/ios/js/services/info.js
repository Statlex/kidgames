(function (win, doc) {

	"use strict";
	/*global window, document */

	var docElem = doc.documentElement;
	var ls = localStorage;
	var isTouch = docElem.hasOwnProperty('ontouchstart');

	var info = {
		lang: 'en', // current language
		availableLangs: ['en', 'ru', 'de', 'zh', 'es', 'ar', 'it'],
		saveItem: 'save-item-kid-game-coloring-book',
		isPhone: false,
		isTouch: isTouch,
		preCSS: '-webkit-',
		preJS: 'webkit',
		canScroll: false,
		evt: {
			down: isTouch ? 'touchstart' : 'mousedown',
			move: isTouch ? 'touchmove' : 'mousemove',
			up: isTouch ? 'touchend' : 'mouseup',
			out: isTouch ? 'touchcancel' : 'mouseout'
		},
		debugger:{
			isActive: false,
			position: 'right' // while not use
		},
		screen: {
			getWidth: function() {
				return docElem.clientWidth;
			},
			getHeight: function() {
				return docElem.clientHeight;
			},
			getAspectRatio: function() {
				return docElem.clientWidth / docElem.clientHeight;
			}
		},

		getData: function() {
			var data = ls.getItem(this.saveItem) || '{}';
			return JSON.parse(data);
		},
		get: function(key) {
			return this[key];
		},
		set: function(key, value, toLS) {
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
		change: function(key, delta, toLS) {
			this.set(key, (this.get(key) || 0) + delta, toLS);
		},

		init: function() {

			// set all fields from ls to info
			this.setDataFromLS();

			// try to get current language
			var lang = this.get('lang') || (navigator.language || navigator.userLanguage);
			lang = lang.split('-')[0];
			this.lang = (this.availableLangs.indexOf(lang) === -1) ? this.lang : lang;
		},
		setDataFromLS: function() {
			var data = this.getData();
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					this[key] = data[key];
				}
			}
		},
		getIsPhone: function() {
			var maxSize = (docElem.clientHeight > docElem.clientWidth) ? docElem.clientHeight : docElem.clientWidth;
			this.isPhone = maxSize < 700;
			return this.isPhone;
		},
		runDetector: function() {

			var body = $('body');
			var that = this;

			// detect XY onTouchStart
			if (this.isTouch) {
				body.addEventListener(this.evt.down, function(e){
					that.evt.touchStart = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					};
					that.evt.touchMove = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					};
				}, false);
				body.addEventListener(this.evt.move, function(e){
					that.evt.touchMove = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					};
				}, false);
			} else {
				body.addEventListener(this.evt.down, function(e){
					that.evt.touchStart = {
						x: e.pageX,
						y: e.pageY
					};
					that.evt.touchMove = {
						x: e.pageX,
						y: e.pageY
					};
				}, false);
				body.addEventListener(this.evt.move, function(e){
					that.evt.touchMove = {
						x: e.pageX,
						y: e.pageY
					};
				}, false);
			}

		},
		getPathSize: function (x0, y0, x1, y1) {
			return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
		},
		minMove: 4,
		wasClick: function () {
			var x1, y1, x2, y2;
			x1 = this.evt.touchStart.x;
			y1 = this.evt.touchStart.y;
			x2 = this.evt.touchMove.x;
			y2 = this.evt.touchMove.y;
			return this.getPathSize(x1, y1, x2, y2) < this.minMove;
		}

	};

	win.addEventListener('load', info.getIsPhone.bind(info), false);
	win.addEventListener('resize', info.getIsPhone.bind(info), false);

	win.addEventListener('load', info.runDetector.bind(info), false);

	info.init();

	win.info = info;

}(window, document));
