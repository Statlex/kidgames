(function (win) {

	"use strict";
	/*global window */

	win.lang = {
		push: function(lang) {
			var obj = win.langs[lang],
				key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					this[key] = obj[key];
				}
			}
		}
	};

}(window));