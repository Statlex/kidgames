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

			var tempNode = document.createElement('div');
			tempNode.innerHTML = svgLine;
			var elements = tempNode.querySelectorAll('*');
			elements = Array.prototype.splice.call(elements);
			elements.forEach(function(elem){



			});








			svgLine = 'svg:"' + svgLine + '",\n';
			this.textArea.value = svgLine;
		}


	};




	function setButton() {

		function createSVGLine() {

			var str = (textArea.value.match(/<svg[\s\S]+<\/svg>/gi))[0];

			str = str.replace(/\n/gi, '').replace(/"/gi, "'").replace(/\s+/gi, ' ').replace(/\s'/gi, "'");

			textArea.value = 'svg:"' + str + '",\n';


		}

		button.addEventListener('click', createSVGLine, false);

	}


	window.addEventListener('load', inLiner, false);

}());
