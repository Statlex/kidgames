(function () {

	"use strict";
	/*global window, document, console, alert */

	var inLiner = {
		filesDone: 0,
		handleEvent: function(){
			this.textArea = document.querySelector('.js-text-area');
			this.fileInput = document.querySelector('.js-files');
			this.fileInput.addEventListener('change', this.handleFileSelect.bind(this), false);
			this.imagesWrapper = document.querySelector('.js-images-wrapper');
		},
		handleFileSelect: function(evt) {

			var that = this;

			this.filesDone = 0;

			this.string = '';
			var files = evt.target.files; // FileList object

			console.log('-- GOT files is ' + evt.target.files.length + ' --');
			setTimeout(function(){
				console.log('-- DONE files is ' + that.filesDone + ' --');
			}, 5000);

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

			svgLine = (svgLine.match(/<svg[\s\S]+<\/svg>/gi))[0];
			svgLine = svgLine.replace(/id=\"\S*?\"/gi , '')
				.replace(/baseProfile=\"\S*?\"/gi , '')
				.replace(/<g.*?>|<\/g>/gi, '')
				.replace(/\n/gi, '')
				.replace(/"/gi, "'")
				.replace(/\s+/gi, ' ')
				.replace(/\s'/gi, "'")
				.replace(/>\s+</gi, '><')
				.replace(/fill='.*?'/gi, "fill='rgb(255,255,255)'");

			if (svgLine.indexOf('text') !== -1) {
				alert('text in ' + file.name);
			}

			// add white rectangle
			var div = document.createElement('div');
			var width = svgLine.match(/width='\d+px'/gi)[0].match(/\d+/gi)[0];
			var height = svgLine.match(/height='\d+px'/gi)[0].match(/\d+/gi)[0];
			var rect = "<rect x='0' y='0' width='" + width + "' height='" + height + "' fill='rgb(255,255,255)' />";
			svgLine = svgLine.replace('><', '>' + rect + '<');

			div.innerHTML = svgLine + file.name;

			this.imagesWrapper.appendChild(div);

			svgLine = 'svg:"' + svgLine + '",\n';
			var id = Math.random().toString().replace('0.', '').replace(/^0+/gi, '');
			id = 'id: ' + id + '\n';
			svgLine += id;
			svgLine = '{\n' + svgLine + '},\n';

			this.filesDone += 1;
			return svgLine;

		}

	};

	window.addEventListener('load', inLiner, false);

}());
