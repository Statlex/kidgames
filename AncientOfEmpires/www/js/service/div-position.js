(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document, setTimeout */
	/*global */

	function blockFixOnResize () {

		var selector = '.js-block-fix-wrapper',
			width = docElem.clientWidth,
			restWidth = width,
			height = docElem.clientHeight,
			restHeight = height,
			screenPosition = width > height ? 'Land' : 'Port',
			nodes = doc.querySelectorAll(selector);

		nodes = Array.prototype.slice.call(nodes);

		nodes = nodes.sort(function (a, b) {
			return parseInt(a.dataset.sizeOrder, 10) -  parseInt(b.dataset.sizeOrder, 10);
		});

		nodes.forEach(function (node) {

			node.style.float = '';
			node.style.width = '';
			node.style.height = '';

			var size = node.dataset['size' + screenPosition];

			if (size === 'min') {
				restHeight -= node.offsetHeight;
			}

		});

		nodes.forEach(function (node) {

			var size = node.dataset['size' + screenPosition];

			if (size === 'min') {
				return;
			}

			size = size.replace(/\s+/g, '').split(';');

			size.forEach(function (pair) {

				pair = pair.split(':');

				var key = pair[0],
					value = pair[1];


				switch (key) {

					case 'float':
						this.style.float = value;
						break;


					case 'width':
						this.style.width = value;
						break;


					case 'height':

						if (height === 'max') {
							this.style.height = restHeight + 'px';
						} else {
							height = value;
						}

						break;

				}


			}, node);


		});


	}

	function blockFix() {

		blockFixOnResize();
		setTimeout(blockFixOnResize, 0);
		setTimeout(blockFixOnResize, 100);
		setTimeout(blockFixOnResize, 200);
		setTimeout(blockFixOnResize, 300);
		setTimeout(blockFixOnResize, 400);

	}

	win.addEventListener('resize', blockFix, false);

	win.blockFix = blockFix;

}(window, document, document.documentElement));