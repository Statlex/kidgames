(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	win.addEventListener('load', function(){

		var sections = win.sections,
			key;

		return;

		for (key in sections) {
			if (sections.hasOwnProperty(key)) {

				sections[key].questions.forEach(function(question){

					var image, key, body;

					body = doc.body;

					for (key in question) {
						if (question.hasOwnProperty(key) && question[key].indexOf('http') !== -1) {
							image = new Image();
							image.src = question.image;
							body.appendChild(image);
						}
					}

				});

			}
		}

	}, false);

}(window, document, document.documentElement));