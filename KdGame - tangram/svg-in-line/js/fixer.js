(function () {

	"use strict";
	/*global window, document, console, alert */

	var inLiner = {
		handleEvent: function(){
			this.textArea = document.querySelector('.js-text-area');
			this.fileInput = document.querySelector('.js-files');
			this.fileInput.addEventListener('change', this.handleFileSelect.bind(this), false);
		},
		handleFileSelect: function(evt) {

			this.string = '';
			var files = evt.target.files; // FileList object

			// Loop through the FileList
			for (var i = 0, f; f = files[i]; i++) {

				var reader = new FileReader();

				reader.onload = function(file){
					this.string += this.createSVGLine(event.target.result, file);
					this.textArea.value = this.string;
				}.bind(this, f);

				// Read in the image file as a data URL.
				reader.readAsText(f);

			}

		},
		createSVGLine: function(svgLine, file) {
			if (svgLine.indexOf('rect') !== -1) {
				console.warn('Rectangle in ' + file.name + '!!!');
				return '';
			}
			svgLine = (svgLine.match(/<svg[\s\S]+<\/svg>/gi))[0];
			svgLine = svgLine.replace(/\n/gi, '').replace(/"/gi, "'").replace(/\s+/gi, ' ').replace(/\s'/gi, "'");
			svgLine = 'svg:"' + svgLine + '",\n';
			var id = Math.random().toString().replace('0.', '').replace(/^0+/gi, '');
			id = 'id: ' + id + '\n';
			svgLine += id;
			svgLine = '{\n' + svgLine + '},\n'
			return svgLine;
		}

	};

	window.addEventListener('load', inLiner, false);

}());
