(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global */

	win.util = {
		extend: function(main, plused) {
			var key;
			for (key in plused) {
				if (plused.hasOwnProperty(key)) {
					main[key] = plused[key];
				}
			}

			return main;
		}
	};

}(window, document, document.documentElement));