(function () {

	"use strict";
	/*global window, document, console, alert */

	var inLiner = {
		handleEvent: function(){
			this.textArea = document.querySelector('.js-text-area');
			this.button = document.querySelector('.js-button');
			this.button.addEventListener('click', this.createSVGLine.bind(this), false);
		},
		createSVGLine: function() {
			var svgLine = this.textArea.value;
			svgLine = (svgLine.match(/<svg[\s\S]+<\/svg>/gi))[0];
			svgLine = svgLine.replace(/\n/gi, '').replace(/"/gi, "'").replace(/\s+/gi, ' ').replace(/\s'/gi, "'");
			svgLine = 'svg:"' + svgLine + '",\n';
			this.textArea.value = svgLine;
		}

	};

	window.addEventListener('load', inLiner, false);

}());
