(function (win, doc) {

	"use strict";
	/*global window, document */

	win.info = {
		lang: dataStorage.getItem('lang') || 'en', // current language
		availableLangs: ['en', 'ru', 'de', 'zh', 'es'],
		section: 'no-section', // current active section
		difficult: 1,
		score: dataStorage.getItem('score') || 0,
		screen: {
			width: function() {
				return doc.documentElement.clientWidth;
			},
			height: function() {
				return doc.documentElement.clientHeight;
			}
		},
		set: function(key, value) {
			this[key] = value;
		},
		get: function(key) {
			return this[key];
		},
		init: function() {
			// try to get current language
			var lang = dataStorage.getItem('lang') || (navigator.language || navigator.userLanguage);
			lang = lang.split('-')[0];
			this.lang = (this.availableLangs.indexOf(lang) === -1) ? this.lang : lang;
		}
	};

	//>>>>>>>>>>>>>>>>>>>>>>>>
	// win.info.init(); uncomment when all lang will be able

}(window, document));
