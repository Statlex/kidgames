(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, langs, window, document */

	win.lang = {
		re: {
			getMonth: /[\s\S]*?\d+\-(\d)+\-\d+[\s\S]*?/,
			findMonth: /(\d+)\-(\d)+\-(\d+)/
		},
		push: function(lang) {
			var obj = langs[lang],
				key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					this[key] = obj[key];
				}
			}
		},
		replaceMonth: function(text) {
			var month = this.month[parseInt(text.replace(this.re.getMonth, '$1'), 10)];
			return text.replace(this.re.findMonth, '$1-' + month + '-$3');

		}
	};

}(window, document, document.documentElement));