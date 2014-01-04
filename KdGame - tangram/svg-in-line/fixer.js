(function () {

	"use strict";
	/*global window, document, console, alert */



	function setButton() {
		var button = document.querySelector('.js-button');
		var textArea = document.querySelector('.js-text-area');

		function createSVGLine() {
			var str = (textArea.value.match(/<svg[\s\S]+<\/svg>/gi))[0];
			str = str.replace(/\n/gi, '').replace(/"/gi, "'").replace(/\s+/gi, ' ').replace(/\s'/gi, "'");
			textArea.value = 'svg:"' + str + '",\n';
		}

		button.addEventListener('click', createSVGLine, false);

	}


	function run() {
		setButton();
	}

	window.addEventListener('load', run, false);

}());
