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

			var obj = {},
				div = document.createElement('div'),
				svg, polylines,
				string,
				stringParsed;
			div.innerHTML = svgLine;
			svg = div.getElementsByTagName('svg')[0];
			obj.width = parseInt(svg.getAttribute('width'), 10);
			obj.height = parseInt(svg.getAttribute('height'), 10);
			obj.points = [];

			// test for path

			polylines = svg.querySelectorAll('polyline, path');
			polylines = Array.prototype.slice.call(polylines);
//			polylines.reverse();
			polylines.forEach(function(poly){
				var group, points, pointXY, i, len, segType;
				group = [];
				pointXY = {
					x: 0,
					y: 0
				};

				if (poly.tagName === 'polyline') {
					points = poly.getAttribute('points').trim().split(' ');
				}

				if (poly.tagName === 'path') {
					points = [];
					for (i = 0, len = poly.pathSegList.numberOfItems; i < len; i += 1) {
						segType = poly.pathSegList.getItem(i).pathSegTypeAsLetter;
						if (segType.toUpperCase() === segType) { // detect upper case -> abs point
							pointXY = {
								x: poly.pathSegList.getItem(i).x || pointXY.x,
								y: poly.pathSegList.getItem(i).y || pointXY.y
							};
						} else { // if rel point
							pointXY.x += poly.pathSegList.getItem(i).x || 0;
							pointXY.y += poly.pathSegList.getItem(i).y || 0;
						}
						points.push([pointXY.x, pointXY.y].join(','));
					}
				}

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

			string = ['\'', file.name.replace('.svg', ''), '\': \n', JSON.stringify(obj)].join('');
			this.filesDone += 1;

			// adjust points

			var sizes = {
				max: {
					x: 0,
					y: 0
				},
				min: {
					x: 1000000000,
					y: 1000000000
				}
			};
			stringParsed = JSON.parse(string.replace(/^'[\s\S]*?':/, ''));
			stringParsed.points.forEach(function(points){
				points.forEach(function(point){
					sizes.max.x = (point.x > sizes.max.x) ? point.x : sizes.max.x;
					sizes.min.x = (point.x < sizes.min.x) ? point.x : sizes.min.x;
					sizes.max.y = (point.y > sizes.max.y) ? point.y : sizes.max.y;
					sizes.min.y = (point.y < sizes.min.y) ? point.y : sizes.min.y;
				});
			});

			stringParsed.points.forEach(function(points, indexB, pointsArr) {
				points.forEach(function(point, indexS, pointArr){
					pointsArr[indexB][indexS].x -= sizes.min.x;
					pointsArr[indexB][indexS].y -= sizes.min.y;
				});
			});
			stringParsed.width = sizes.max.x - sizes.min.x;
			stringParsed.height = sizes.max.y - sizes.min.y;

			var padding = stringParsed.width * 0.25;
			stringParsed.width += padding * 2;
			stringParsed.height += padding * 2;

			stringParsed.points.forEach(function(points, indexB, pointsArr) {
				points.forEach(function(point, indexS, pointArr){
					pointsArr[indexB][indexS].x += padding;
					pointsArr[indexB][indexS].y += padding;
				});
			});


			var item = file.name.replace('.svg', '').split('-').pop();
			if (file.name.indexOf('big') !== -1) {
				item = item.toUpperCase();
			}

			string = ['\'', item, '\': \n', JSON.stringify(stringParsed)].join('');
			return string + ',\n';

		}

	};

	window.addEventListener('load', inLiner, false);

}());
