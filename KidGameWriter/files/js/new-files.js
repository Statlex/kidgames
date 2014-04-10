(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	var input = doc.getElementById('jsInput');

	var ru = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"];
	var en = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

	var alp = {
		ru: ru,
		en: en
	};

	var state = ['en', 'small'];

	input.addEventListener('change', createNewFiles, false);

	function createNewFiles(evt) {
		var files = evt.target.files;

		for (var i = 0, f; f = files[i]; i++) {

			var reader = new FileReader();

			reader.onload = function(){
				createNewSVGs(event.target.result);
			}.bind(this);

			// Read in the image file as a data URL.
			reader.readAsText(f);

		}

	}

	function saveToDisk(textSVG, fileName) {
		var save, cEvent;
		save = document.createElement('a');
		save.href = 'data:text/svg;charset=utf-8,' + textSVG;
		save.target = '_blank';
		save.download = fileName + '.svg';

		cEvent = document.createEvent('Event');
		cEvent.initEvent('click', true, true);
		save.dispatchEvent(cEvent);
		(win.URL || win.webkitURL).revokeObjectURL(save.href);
	}

	function createNewSVGs(textSVG) {


		alp[state[0]].forEach(function(letter){

			var svg;
			console.log(state[1]);
			switch (state[1]) {
				case 'big':
					svg = textSVG.replace('letter_is_here', letter.toUpperCase());
					break;

				case 'small':
					svg = textSVG.replace('letter_is_here', letter);
					break;

				default :
					console.log('Error !!!');
					console.log('Error !!!');
					console.log('Error !!!');
					console.log('Error !!!');
			}


			saveToDisk(svg, state.join('-') + '-' + letter);

		});

	}


}(window, document, document.documentElement));