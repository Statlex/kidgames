(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	function footerToBottom() {

		function fixFooter() {
			var footer = doc.getElementsByClassName('footer')[0],
				bodyH = doc.body.clientHeight,
				wholeH = docElem.clientHeight,
				re = /(\s|^)fix-footer(\s|$)/gi,
				className = footer.className;

			if (bodyH < wholeH) {
				className +=' fix-footer';
			} else {
				className = className.replace(re, '');
			}

			footer.className = className;


		}

		fixFooter();
		win.addEventListener('resize', fixFooter, false);

	}

	function ui() {

		footerToBottom();

	}

	win.addEventListener('load', ui, false);



}(window, document, document.documentElement));
