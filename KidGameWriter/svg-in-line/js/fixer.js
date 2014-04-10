(function (win, doc) {

	"use strict";
	/*global window, document, console, alert, setTimeout, FileReader, event */

	function polygonToPath(polygon) {
		var points = polygon.getAttribute('points').split(/\s+/),
			pathPoints = '',
			path = doc.createElementNS('http://www.w3.org/2000/svg','path');

		points.forEach(function(point, i){
			pathPoints += point.trim() ? ((i && "L") || "M") + point : '';
		});
		path.setAttribute('d', pathPoints);
		return path;
	}


	function lineToPath(line) {
		var path = doc.createElementNS('http://www.w3.org/2000/svg','path'),
			l = line;
		path.setAttribute('d', 'M' + l.getAttribute('x1') + ',' + l.getAttribute('y1') + 'L' + l.getAttribute('x2') + ',' + l.getAttribute('y2'));
		return path;
	}

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

			var item,
				div = document.createElement('div'),
				svg,
				string,
				polygons,
				path,
				removedAttr = ['stroke', 'fill', 'stroke-miterlimit'];
			svgLine = svgLine.replace(/<g\s?[\s\S]*?>|<\/g>|<text\s?[\s\S]*?text>|\n|\s+|<image[\s\S]*?<\/image>/gi, ' ').replace(/>\s+</gi, '><');
			div.innerHTML = svgLine;
			svg = div.getElementsByTagName('svg')[0];
			polygons = svg.querySelectorAll('*');
			polygons = Array.prototype.slice.call(polygons);
			polygons.forEach(function(poly){
				switch (poly.tagName) {
					case 'polyline' :
					case 'polygon' :
						path = polygonToPath(poly);
						svg.replaceChild(path, poly);
						break;
					case 'line' :
						path = lineToPath(poly);
						svg.replaceChild(path, poly);
						break;
					case 'path' :
						console.log('path :)');
						break;
					default :
						alert(file.name + ' contains wrong element.');
				}
			});

			polygons = svg.querySelectorAll('*');
			polygons = Array.prototype.slice.call(polygons);
			polygons.forEach(function(poly){
				removedAttr.forEach(function(attr) {
					poly.removeAttribute(attr);
				});
			});

			string = '<svg>' + svg.innerHTML + '<\/svg>';

			item = file.name.replace('.svg', '').split('-').pop();
			if (file.name.indexOf('big') !== -1) {
				item = item.toUpperCase();
			}

			string = ['\'', item, '\': ', '\'' + string + '\''].join('');
			return string + ',\n';

		}

	};

	window.addEventListener('load', inLiner, false);

}(window, document));

