(function () {

	"use strict";
	/*global window, document, console, alert, setTimeout, FileReader, event */

	var inLiner = {
		filesDone: 0,
		handleEvent: function(){
			this.textArea = document.querySelector('.js-text-area');
			this.fileInput = document.querySelector('.js-files');
			this.fileInput.addEventListener('change', this.handleFileSelect.bind(this), false);
			this.imagesWrapper = document.querySelector('.js-images-wrapper');
		},
		handleFileSelect: function(evt) {

			var that = this,
				files = evt.target.files,
				i, len,
				reader; // FileList object

			this.filesDone = 0;
			this.string = '';

			console.log('-- GOT files is ' + evt.target.files.length + ' --');
			setTimeout(function(){
				console.log('-- DONE files is ' + that.filesDone + ' --');
			}, 5000);

			// Loop through the FileList
			for (i = 0, len = files.length; i < len; i += 1) {

				reader = new FileReader();

				reader.onload = function(file){
					this.string += this.createSVGLine(event.target.result, file);
					this.textArea.value = this.string;
				}.bind(this, files[i]);

				// Read in the image file as a data URL.
				reader.readAsText(files[i]);

			}

		},
		createSVGLine: function(svgLine, file) {

			console.log(svgLine);

			var obj = {},
				div = document.createElement('div'),
				svg, polylines,
				string = '';
			div.innerHTML = svgLine;
			svg = div.getElementsByTagName('svg')[0];
			obj.width = parseInt(svg.getAttribute('width'), 10);
			obj.height = parseInt(svg.getAttribute('height'), 10);
			obj.points = [];

			polylines = svg.getElementsByTagName('polyline');
			polylines = Array.prototype.slice.call(polylines);
			polylines.reverse();
			polylines.forEach(function(poly){
				console.log(poly);
				var group = [],
					points = poly.getAttribute('points').trim().split(' ');
				points.forEach(function(xy){
					xy = xy.trim();

					if (!xy) {
						return;
					}
					var arr = xy.split(',');
					group.push({
						x: parseFloat(arr[0]),
						y: parseFloat(arr[1])
					});
				});
				obj.points.push(group);
			}, this);

			string = ['\'', file.name.replace('.svg', ''), '\': \n', JSON.stringify(obj), '\n,'].join('');
			this.filesDone += 1;

			return string;

/*
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
*/

		}

	};

	window.addEventListener('load', inLiner, false);

}());
