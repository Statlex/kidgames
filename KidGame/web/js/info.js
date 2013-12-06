(function (win, doc) {

	"use strict";
	/*global window, document */

	win.info = {
		lang: dataStorage.getItem('lang') || 'en', // current language
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
		}





	}


}(window, document));
