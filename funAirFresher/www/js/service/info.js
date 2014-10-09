(function (win, doc) {

	"use strict";
	/*global window, document, navigator, localStorage */
	/*global APP */

	win.APP = win.APP || {};

	function getPrefix() {

		var data = {
				js: '',
				css: ''
			},
			tempStyle = doc.createElement('div').style,
			vendors = ['t','webkitT','MozT','msT','OT'];

		// find vendors by css transform property
		vendors.forEach(function(vendor){

			if ( !tempStyle.hasOwnProperty(vendor + 'ransform') ) {
				return;
			}

			vendor = vendor.replace(/t$/i, ''); // remove 't' from vendor

			data = {
				js: vendor,
				css: vendor && ('-' + vendor.toLocaleLowerCase() + '-')
			};

		});

		return data;

	}

	var docElem, ls, isTouch, info, pre, ua;
	ua = navigator.userAgent;
	docElem = doc.documentElement;
	ls = localStorage;
	isTouch = docElem.hasOwnProperty('ontouchstart');
	pre = getPrefix();

	info = {
		lang: null,
		defaultLang: 'en',
		availableLangs: ['ru', 'en'],
		saveItem: 'air-fresher',
		isPhone: false,
		isTouch: isTouch,
		preCSS: pre.css,
		preJS: pre.js,
		isIE: /MSIE/.test(ua),
		isAndroid: /android/i.test(ua),
		isIOS: /iPad|iPhone|iPod/.test(ua),

		isAdsFree: false,
		adsFreeLinks: { // NO - ADs in app
			googlePlay: '',
			appStore: ''
		},

		adsNonFreeLinks: { // YES - ADs in app
			googlePlay: '',
			appStore: ''
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

			this.getIsPhone();

			// set all fields from ls to info
			this.setDataFromLS();

			// try to get current language
			this.setLang();

		},
		setLang: function() {

			var lang = this.get('lang');

			if (lang) {
				return;
			}

			lang = navigator.language || navigator.userLanguage;
			lang = lang.split('-')[0];

			this.lang = (this.availableLangs.indexOf(lang) === -1) ? this.defaultLang : lang;

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
			this.isPhone = Math.max(docElem.clientHeight, docElem.clientWidth) < 700;
			return this.isPhone;
		}

	};

	info.init();

	APP.info = info;

}(window, document));

(function (win) {

	"use strict";
	/*global window */
	/*global APP */

	win.APP = win.APP || {};

	APP.langMaster = {
		push: function(lang) {
			this.name = lang;
			var obj = win.APP.langs[lang],
				key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					this[key] = obj[key];
				}
			}
		}
	};

	// default language
	APP.langMaster.push(APP.info.defaultLang);

}(window));