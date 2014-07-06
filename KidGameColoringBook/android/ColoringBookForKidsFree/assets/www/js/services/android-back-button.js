(function (win, doc) {

	"use strict";
	/*global window, document, viewer */

	var $$ = function (selector, context) {
		return Array.prototype.slice.call((context || doc).querySelectorAll(selector));
	};

	win.onBackButton = onBackButton;

	function onBackButton() {

		var node = doc.querySelector('#wrapper .js-draw-page-back');

		if (node) {

			if (!node.clientHeight) {
				return;
			}

			// get all color data
			var allData = {};
			var polygons = $$('.js-main-svg *');
			polygons.forEach(function (polygon) {
				var color = (polygon.getAttribute('fill') || '').match(/\d+/gi);
				if (!color) {
					return;
				}
				var id = parseInt(polygon.getAttribute('history-id'), 10);
				if (id !== 0 && !id) {
					return;
				}
				allData[id] = color;
			});

			// test for all white image
			var isAllFFF = true;
			for (var key in allData) {
				if (allData.hasOwnProperty(key)) {

					if (allData[key] !== 'transparent') {
						isAllFFF = false;
					}

				}
			}
			if (isAllFFF) {
				viewer.back();
				return;
			}

			allData = JSON.stringify(allData);

			// get current saved data and test for equals with current data
			dataBase.getDataByFigureId(info.currentImageId, function (data) {
				if (data === allData) {
					viewer.back();
					return;
				}
				var img = '<img src="img/i/tool-save.png" class="message-image"/>';
				ui.confirm.show(img, function () {
					colorHistory.save(colorHistory);
					viewer.back();
				}, viewer.back.bind(viewer));
			});

			return false;

		}

		// end
		node = doc.querySelector('.js-back');

		if (node) {
			if (!node.clientHeight) {
				return;
			}
			viewer.back();
			return false;
		}

	}

}(window, document));