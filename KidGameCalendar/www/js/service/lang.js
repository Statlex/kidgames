(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	win.lang = {
		push: function(lang) {
			var obj = langs[lang];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					this[key] = obj[key];
				}
			}
		}
	};

}(window, document, document.documentElement));