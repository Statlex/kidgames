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

			var item,
				div = document.createElement('div'),
				svg,
				string,
				text;
			div.innerHTML = svgLine;
			svg = div.getElementsByTagName('svg')[0];
			text = svg.querySelector('text');
			if (text) {
				text.parentNode.removeChild(text);
			}

			string = '<svg>' + svg.innerHTML + '<\/svg>';
			string = string.replace(/\s+/gi, ' ').replace(/>\s+</gi, '><');

			if (svg.querySelectorAll('*').length !== svg.querySelectorAll('path').length || svg.querySelectorAll('path').length === 0) {
				alert(file.name + ' is wrong!!!');
			}

			item = file.name.replace('.svg', '').split('-').pop();
			if (file.name.indexOf('big') !== -1) {
				item = item.toUpperCase();
			}

			string = ['\'', item, '\': ', '\'' + string + '\''].join('');
			return string + ',\n';

		}

	};

	window.addEventListener('load', inLiner, false);

}());
