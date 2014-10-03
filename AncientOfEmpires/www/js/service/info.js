(function (win, doc) {

	"use strict";
	/*global window, document, navigator */

	function getPrefix() {

		var ua = navigator.userAgent,
			data = {
				js: 'webkit',
				css: '-webkit-'
			};

//			var vendors = 't,webkitT,MozT,msT,OT'.split(','),
//				t,
//				i = 0,
//				l = vendors.length;
//
//			for (; i < l; i++) {
//				t = vendors[i] + 'ransform';
//				if (t in dummyStyle) {
//					return vendors[i].substr(0, vendors[i].length - 1);
//				}
//			}
//
//			return false;

		return data;

	}

	var docElem, ls, isTouch, info, pre;
	docElem = doc.documentElement;
	ls = win.localStorage;
	isTouch = docElem.hasOwnProperty('ontouchstart');
	pre = getPrefix();

	info = {
		lang: 'en', // current language
//		availableLangs: ['en', 'ru', 'de', 'zh', 'es', 'ar', 'it'],
		availableLangs: ['en'],
		saveItem: '-----APP-NAME-----',
		isPhone: false,
		isTouch: isTouch,
		preCSS: pre.css,
		preJS: pre.js,
		isAndroid: (/android/i).test(win.navigator.userAgent),
		canScroll: false,

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

			this.getIsPhone();

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
		}

	};

	info.init();

	win.info = info;

}(window, document));
