(function (win) {

	"use strict";
	/*global window, document, console, alert */

	var draw = {

		start: function() {

			var that = this;

			// get figure SVG
			var section = win.allFigures[info.currentSectionName];
			section.forEach(function(obj){
				if (obj.id === info.currentImageId) {
					that.svg = obj.svg;
				}
			});

			// add svg to page
			var tempNode = document.createElement('div');
			tempNode.innerHTML = this.svg;
			var svgNode = $('svg', tempNode);
			var page = $('.page', main.wrapper);
			page.appendChild(svgNode);

		}

	};

	win.draw = draw;

}(window));
