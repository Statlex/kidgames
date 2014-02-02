(function () {

	"use strict";
	/*global window, document, console, alert */

	var inLiner = {
		handleEvent: function(){
			this.textArea = document.querySelector('.js-text-area');
			this.fileInput = document.querySelector('.js-files');
			this.fileInput.addEventListener('change', this.handleFileSelect.bind(this), false);
			this.imagesWrapper = document.querySelector('.js-images-wrapper');
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
				alert('Rectangle in ' + file.name + '!!!');
				return '';
			}

			if (svgLine.indexOf('<g>') !== -1) {
				console.warn('<g> in ' + file.name + '!!!');
				svgLine = svgLine.replace( /<g>|<\/g>/gi, '');
			}

			svgLine = (svgLine.match(/<svg[\s\S]+<\/svg>/gi))[0];
			svgLine = svgLine.replace(/id=\"\S*?\"/gi , '')
				.replace(/id=\"\S*?\"/gi , '')
				.replace(/baseProfile=\"\S*?\"/gi , '')
				.replace(/\n/gi, '')
				.replace(/"/gi, "'")
				.replace(/\s+/gi, ' ')
				.replace(/\s'/gi, "'")
				.replace(/>\s+</gi, '><')
				.replace(/fill='.*?'/gi, "fill='#0C0'");

			// add svg image to page
			this.addImageToPage(svgLine);

			svgLine = 'svg:"' + svgLine + '",\n';
			var id = Math.random().toString().replace('0.', '').replace(/^0+/gi, '');
			id = 'id: ' + id + '\n';
			svgLine += id;
			svgLine = '{\n' + svgLine + '},\n';
			return svgLine;

		},
		addImageToPage: function(svgLine) {

			var svg = svgLine;

			// get dots
			var dots = svg.match(/points='.*?'/gi).join(' ').replace(/points='|'/gi, '').split(' ');
			dots.forEach(function(dot, index, arr){
				var xy = dot.split(',');
				arr[index] = {
					x: xy[0],
					y: xy[1]
				}
			});

			var circleTemplate = '<circle cx="{{x}}" cy="{{y}}" r="2" fill="#00C" />';
			var circles = '';
			dots.forEach(function(dot){
				circles += circleTemplate.replace('{{x}}', dot.x).replace('{{y}}', dot.y);
			});

			svg = svg.replace('</svg>', circles + '</svg>');

			var div = document.createElement('div');
			div.innerHTML = svg;
			this.imagesWrapper.appendChild(div);

		}

	};

	window.addEventListener('load', inLiner, false);

}());
