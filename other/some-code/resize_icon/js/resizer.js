(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	var resizer = {
		sizes: {
			icon: [29, 40, 50, 57, 58, 60, 72, 76, 80, 100, 114, 120, 144, 152, 256, 512, 1024],
			splashScreen: [
				{x: 480, y: 320},
				{x: 320, y: 480},
				{x: 640, y: 960},
				{x: 960, y: 640},
				{x: 640, y: 1136},
				{x: 1136, y: 640},
				{x: 768, y: 1004},
				{x: 768, y: 1024},
				{x: 1496, y: 2048},
				{x: 1536, y: 2008},
				{x: 1536, y: 2048},
				{x: 2048, y: 1496},
				{x: 2048, y: 1536},
				{x: 2008, y: 1536},
				{x: 1024, y: 748},
				{x: 1024, y: 768}
			]
		},
		init: function (initData) {
			this.inputFile = initData.inputFile;
			this.addEventListeners();
		},
		addEventListeners: function () {
			this.inputFile.addEventListener('change', this.getFiles.bind(this), false);
		},
		getFiles: function (evt) {

			var that = this;
			var files = evt.target.files; // FileList object

			for (var i = 0, f; f = files[i]; i++) {

				var reader = new FileReader();

				reader.onload = function (file) {
					that.createImageFromDataURL(event.target.result, file);
				}.bind(this, f);

				// Read in the image file as a data URL.
				reader.readAsDataURL(f);

			}

		},
		createImageFromDataURL: function (dataURL, file) {

			var fileName = file.name.replace(/\..*?$/gi, ''); // reduce .*

			this.sizes.icon.forEach(function (size) {
				var img = new Image();
				img.src = dataURL;
				if (img.width !== img.height) {
					return;
				}
				var canvas = doc.createElement('canvas');
				canvas.width = size;
				canvas.height = size;
				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, size, size);
				saveToDisk(dataURItoBlob(canvas.toDataURL()), fileName + '-' + size + 'x' + size + '.png');

			});

			this.sizes.splashScreen.forEach(function (sizes) {

				var img = new Image();
				img.src = dataURL;

				if (img.width === img.height) {
					return;
				}

				if ((img.width > img.height) !== (sizes.x > sizes.y)) {
					return;
				}

				var width = sizes.x;
				var height = sizes.y;

				var canvas = doc.createElement('canvas');
				canvas.width = width;
				canvas.height = height;

				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, width, height);

				saveToDisk(dataURItoBlob(canvas.toDataURL()), fileName + '-' + width + 'x' + height + '.png');

			});

		}

	};

	function saveToDisk(blobURL, fileName) {
		var reader = new FileReader();
		reader.readAsDataURL(blobURL);
		reader.onload = function (event) {
			var save = document.createElement('a');
			save.href = event.target.result;
			save.target = '_blank';
			save.download = fileName || 'unknown file';

			var event = document.createEvent('Event');
			event.initEvent('click', true, true);
			save.dispatchEvent(event);
			(window.URL || window.webkitURL).revokeObjectURL(save.href);
		};
	}

	function dataURItoBlob(dataURI) {
		var binary = atob(dataURI.split(',')[1]);
		var array = [];
		for (var i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], {type: 'image/png'});
	}

	win.resizer = resizer;

}(window, document, document.documentElement));