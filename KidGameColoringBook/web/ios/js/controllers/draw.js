(function (win) {

	"use strict";
	/*global window, document, console, alert */

	var utils = {
		minMove: 4,
		getPathSize: function (x0, y0, x1, y1) {
			return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
		},
		wasClick: function () {

			if (!info.isTouch) {
				return true;
			}

			var x1, y1, x2, y2;
			x1 = info.evt.touchStart.x;
			y1 = info.evt.touchStart.y;
			x2 = info.evt.touchMove.x;
			y2 = info.evt.touchMove.y;
			return utils.getPathSize(x1, y1, x2, y2) < this.minMove;
		},
		arrayToColor: function (arr) {
			return 'rgb(' + arr.join(',') + ')';
		},
		getPercent: function (e) {
			var fillWidth = info.screen.getWidth();
			var leftOffset = fillWidth * 0.05 + 5;
			var fieldSize = fillWidth - leftOffset * 2;
			var x = info.isTouch ? e.touches[0].pageX : e.pageX;
			x -= leftOffset;
			var percent = x / fieldSize;
			percent = percent < 0 ? 0 : percent;
			percent = percent > 1 ? 1 : percent;
			return percent;
		}

	};

	var colorHistory = {
		init: function () {
			this.createIds();
			this.arrChanges = [];
			this.backButton = $('.js-color-history-back', main.wrapper);
			this.saveButton = $('.js-color-history-save', main.wrapper);
			this.setBackButton();
			this.setSaveButton();
		},
		createIds: function () {
			this.svgNode = draw.svgNode;
			var polygons = $$('*', this.svgNode);
			polygons.forEach(function (polygon, index) {
				polygon.setAttribute('history-id', index);
			});
		},
		addChanges: function (id, fromColor, toColor) {
			fromColor.forEach(function (item, index) {
				fromColor[index] = parseInt(fromColor[index], 10);
				toColor[index] = parseInt(toColor[index], 10);
			});
			var savedItem = {
				id: parseInt(id, 10),
				from: fromColor,
				to: toColor
			};
			var lastItem = this.arrChanges[this.arrChanges.length - 1] || {id: -1, to: []};
			if ((savedItem.id === lastItem.id) && (savedItem.to.join() === lastItem.to.join())) {
				console.log('equals items');
				return;
			}
			this.arrChanges.push(savedItem);

		},
		setBackButton: function () {
			var that = this;

			function back() {
				if (utils.wasClick()) {
					that.back();
				}
			}

			if (info.isTouch) {
				this.backButton.addEventListener(info.evt.up, back, false);
			} else {
				this.backButton.addEventListener('click', back, false);
			}
		},
		setSaveButton: function () {
			var that = this;

			function save() {
				if (utils.wasClick()) {
					that.save();
				}
			}

			if (info.isTouch) {
				this.saveButton.addEventListener(info.evt.up, save, false);
			} else {
				this.saveButton.addEventListener('click', save, false);
			}
		},
		back: function () {
			var lastItem = this.arrChanges.pop();
			if (!lastItem) {
				return;
			}
			var polygon = $('[history-id="' + lastItem.id + '"]');
			polygon.setAttribute('fill', utils.arrayToColor(lastItem.from));
		},
		save: function () {

			var allData = {};
			var polygons = $$('*', this.svgNode);
			polygons.forEach(function (polygon) {
				var color = (polygon.getAttribute('fill') || '').match(/\d+/gi);
				if (!color) {
					return;
				}
				var id = polygon.getAttribute('history-id');
				allData[id] = color;
			});
			allData = JSON.stringify(allData);
			dataBase.saveProgress({imageId: info.currentImageId, polygonsData: allData});
		},
		restoreImage: function (imageId) {
			imageId = imageId || info.currentImageId;
			var polygons = $$('*', this.svgNode);
			dataBase.getDataByFigureId(imageId, function (data) {
				data = JSON.parse(data);
				polygons.forEach(function (polygon) {
					var id = parseInt(polygon.getAttribute('history-id'), 10);
					if (!data[id]) {
						return;
					}
					polygon.setAttribute('fill', utils.arrayToColor(data[id]));
				});

			});
		}

	};

	var colorPicker = {
		newColor: [0, 255, 255],
		oldColor: [255, 0, 255],
		mainColors: [
			[0, 0, 0], // black
			[255, 0, 0], // red
			[255, 255, 0], // yellow
			[0, 255, 0], // green
			[0, 255, 255], // light blue
			[0, 0, 255], // blue
			[255, 0, 255], // magenta
			[255, 0, 0], // red
			[255, 255, 255] // white
		],
		init: function () {
			this.mainColorNode = $('.js-color-picker-main-color', main.wrapper);
			this.secondaryColorNode = $('.js-color-picker-secondary-color', main.wrapper);
			this.fadeNode = $('.js-color-picker-fade', main.wrapper);
			this.newColorButton = $('.js-color-picker-new-color', main.wrapper);
			this.oldColorButton = $('.js-color-picker-old-color', main.wrapper);
			this.showColorPickerButton = $('.js-show-color-picker-button', main.wrapper);
			this.simplePickerButton = $('.js-simple-color-picker', main.wrapper);

			this.createColorMap();
			this.setButtonsColor();
			this.setMainColorPicker();
			this.setSecondaryColorPicker();
			this.setFade();
			this.setColorButtons();
			this.setActiveButtons();

		},
		setActiveButtons: function () {

			// set color picker button
			function colorPickerOnClick() {
				if (!utils.wasClick()) {
					return;
				}
				draw.activeTool = 'brush';
			}

			if (info.isTouch) {
				this.showColorPickerButton.addEventListener(info.evt.up, colorPickerOnClick, false);
			} else {
				this.showColorPickerButton.addEventListener('click', colorPickerOnClick, false);
			}

			// set simple picker button
			function simplePickerOnClick() {
				if (!utils.wasClick()) {
					return;
				}
				draw.activeTool = 'picker';
			}

			if (info.isTouch) {
				this.simplePickerButton.addEventListener(info.evt.up, simplePickerOnClick, false);
			} else {
				this.simplePickerButton.addEventListener('click', simplePickerOnClick, false);
			}


		},
		setButtonsColor: function () {
			this.newColorButton.style.backgroundColor = utils.arrayToColor(this.newColor);
			this.oldColorButton.style.backgroundColor = utils.arrayToColor(this.oldColor);
			this.setColorOfShowColorPicker(colorPicker.mainColorIs);
		},
		setColorOfShowColorPicker: function (color) {
			this.showColorPickerButton.style.backgroundColor = utils.arrayToColor(color);
		},
		createColorMap: function () {
			this.colorMap = [];
			var that = this;
			this.mainColors.forEach(function (color, index, arr) {
				var percent = index / (arr.length - 1);
				that.colorMap.push({percent: percent, color: color});
			});
			this.colorMap = this.colorMap.sort(function (a, b) {
				return a.percent - b.percent;
			});
		},
		setMainColorPicker: function () {

			var that = this;

			// set bgi
			var bgi = 'left';
			this.colorMap.forEach(function (color) {
				bgi += ', ' + utils.arrayToColor(color.color) + ' ' + (color.percent * 100) + '%'
			});
			bgi = info.preCSS + 'linear-gradient(' + bgi + ')';
			this.mainColorNode.style.backgroundImage = bgi;

			// add event listener
			function getMainColorValue(e) {
				// get left offset
				var percent = utils.getPercent(e);

				// get color
				var c1, c2;
				that.colorMap.forEach(function (color, index, arr) {
					var tempC1 = arr[index];
					var tempC2 = arr[index + 1] ? arr[index + 1] : arr[index];
					if (percent >= tempC1.percent && percent <= tempC2.percent) {
						c1 = tempC1;
						c2 = tempC2;
					}
				});

				var deltaPercent = (percent - c1.percent) / (c2.percent - c1.percent);
				var r, g, b;
				r = (c2.color[0] - c1.color[0]) * deltaPercent + c1.color[0];
				g = (c2.color[1] - c1.color[1]) * deltaPercent + c1.color[1];
				b = (c2.color[2] - c1.color[2]) * deltaPercent + c1.color[2];

				var color = [Math.round(r), Math.round(g), Math.round(b)];
				that.mainColorIs = color;
				that.secondatyColorIs = color;
				that.newColor = color;

				// set color to nodes
				bgi = 'left';
				bgi += ', rgb(0, 0, 0) 0%';
				bgi += ', ' + utils.arrayToColor(color) + ' 50%';
				bgi += ', rgb(255, 255, 255) 100%';
				that.secondaryColorNode.style.backgroundImage = info.preCSS + 'linear-gradient(' + bgi + ')';
				that.newColorButton.style.backgroundColor = utils.arrayToColor(color);

			}

			this.mainColorNode.addEventListener(info.evt.down, getMainColorValue, false);
			this.mainColorNode.addEventListener(info.evt.up, getMainColorValue, false);

			if (info.isTouch) {
				this.mainColorNode.addEventListener(info.evt.move, getMainColorValue, false);
			}

		},
		setSecondaryColorPicker: function () {

			var that = this;

			function getSecondaryColorValue(e) {
				var percent = utils.getPercent(e);
				var c1, c2;
				if (percent < 0.5) {
					c1 = {percent: 0, color: [0, 0, 0]};
					c2 = {percent: 0.5, color: that.mainColorIs};
				} else {
					c1 = {percent: 0.5, color: that.mainColorIs};
					c2 = {percent: 1, color: [255, 255, 255]};
				}

				var deltaPercent = (percent - c1.percent) / (c2.percent - c1.percent);
				var r, g, b;
				r = (c2.color[0] - c1.color[0]) * deltaPercent + c1.color[0];
				g = (c2.color[1] - c1.color[1]) * deltaPercent + c1.color[1];
				b = (c2.color[2] - c1.color[2]) * deltaPercent + c1.color[2];

				var color = [Math.round(r), Math.round(g), Math.round(b)];
				that.secondatyColorIs = color;
				that.newColor = color;
				that.newColorButton.style.backgroundColor = utils.arrayToColor(color);

			}

			this.secondaryColorNode.addEventListener(info.evt.down, getSecondaryColorValue, false);
			this.secondaryColorNode.addEventListener(info.evt.up, getSecondaryColorValue, false);

			if (info.isTouch) {
				this.secondaryColorNode.addEventListener(info.evt.move, getSecondaryColorValue, false);
			}

		},
		setFade: function () {

			if (info.isTouch) {
				this.fadeNode.addEventListener(info.evt.up, function () {
					if (utils.wasClick()) {
						draw.showColorPickerTurn(false);
					}
				}, false);
			} else {
				this.fadeNode.addEventListener('click', draw.showColorPickerTurn.bind(draw, false), false);
			}
		},
		setColorButtons: function () {

			var that = this;

			function setActiveColor() {
				var color = this.getAttribute('style').match(/\d+/gi);
				that.oldColor = color;
				that.newColor = color;
				draw.activeColor = color;

				if ($.hasClass(this, 'color-picker-old-color')) {
					that.mainColorIs = that.mainColorOldIs;
				}

				that.setColorOfShowColorPicker(color);

				draw.showColorPickerTurn(false);
			}

			if (info.isTouch) {
				this.newColorButton.addEventListener(info.evt.down, function () {
					if (utils.wasClick()) {
						setActiveColor.call(this);
					}

				}, false);
				this.oldColorButton.addEventListener(info.evt.down, function () {
					if (utils.wasClick()) {
						setActiveColor.call(this);
					}
				}, false);
			} else {
				this.newColorButton.addEventListener('click', setActiveColor, false);
				this.oldColorButton.addEventListener('click', setActiveColor, false);
			}

		},
		coloringColorButtons: function () {
			this.newColorButton.style.backgroundColor = utils.arrayToColor(this.newColor);
			this.oldColorButton.style.backgroundColor = utils.arrayToColor(this.oldColor);

			var bgi = 'left';
			bgi += ', rgb(0, 0, 0) 0%';
			bgi += ', ' + utils.arrayToColor(this.mainColorIs) + ' 50%';
			bgi += ', rgb(255, 255, 255) 100%';
			this.secondaryColorNode.style.backgroundImage = info.preCSS + 'linear-gradient(' + bgi + ')';

			this.mainColorOldIs = this.mainColorIs;

		},
		saveImageScrolls: function () {
			var doc = document.documentElement,
				body = document.body;
			var left = (doc && doc.scrollLeft || body && body.scrollLeft || 0);
			var top = (doc && doc.scrollTop || body && body.scrollTop || 0);
			this.imagePosiiton = {
				top: top,
				left: left
			}
		},
		restoreImageScrolls: function () {
			var doc = document.documentElement,
				body = document.body;

			if (doc.hasOwnProperty('scrollTop')) {
				doc.scrollTop = this.imagePosiiton.top;
				doc.scrollLeft = this.imagePosiiton.left;
				return;
			}

			if (body.hasOwnProperty('scrollTop')) {
				body.scrollTop = this.imagePosiiton.top;
				body.scrollLeft = this.imagePosiiton.left;
				return;
			}

			return false;

		}
	};

	var draw = {
		activeColor: [255, 255, 0],
		usedColors: [],
		activeTool: 'brush',  // brush || picker
		start: function () {

			colorPicker.oldColor = this.activeColor;
			colorPicker.newColor = this.activeColor;
			colorPicker.mainColorIs = this.activeColor;
			colorPicker.mainColorOldIs = this.activeColor;
			colorPicker.secondatyColorIs = this.activeColor;

			ui.fn.setBodyScroll(true);
			main.wrapper.removeAttribute('style');

			var that = this;

			// get figure SVG
			var section = win.allFigures[info.currentSectionName];
			section.forEach(function (obj) {
				if (obj.id === info.currentImageId) {
					that.svg = obj.svg;
				}
			});

			// add svg to page
			var tempNode = document.createElement('div');
			tempNode.innerHTML = this.svg;
			var svgNode = $('svg', tempNode);
			svgNode.setAttribute('class', 'js-main-svg main-svg');
			var page = $('.page', main.wrapper);
			page.appendChild(svgNode);
			this.svgNode = svgNode;

			// get image property
			this.image = {};
			this.image.width = parseInt(svgNode.getAttribute('width'), 10);
			this.image.height = parseInt(svgNode.getAttribute('height'), 10);

			this.image.scale = 1;
			this.image.currentWidth = this.image.width;
			this.image.currentHeight = this.image.height;

			this.svgNode.style.width = this.image.width + 'px';
			this.svgNode.style.height = this.image.height + 'px';

			this.setScaleButtons();
			this.setSVGColoring();
			this.setShowColorPickerButton();
			colorPicker.init();

			statusBar.hideStatusBar();

			colorHistory.init();

			colorHistory.restoreImage(); // only for test

		},
		setScaleButtons: function () {

			var buttonPlus = $('.js-scale-button-plus', main.wrapper);
			var buttonMinus = $('.js-scale-button-minus', main.wrapper);

			buttonPlus.addEventListener(info.evt.up, this.scaleImageBy.bind(this, 1.1), false);
			buttonMinus.addEventListener(info.evt.up, this.scaleImageBy.bind(this, 0.9), false);

		},
		setSVGColoring: function () {

			var that = this;

			function setColorTouchEnd() {

				if (!utils.wasClick()) {
					return;
				}

				if (that.activeTool === 'brush') {
					var id = parseInt(this.getAttribute('history-id'), 10);
					var fromColor = this.getAttribute('fill').match(/\d+/gi) || [255, 255, 255];
					var toColor = that.activeColor;
					colorHistory.addChanges(id, fromColor, toColor);
					this.setAttribute('fill', utils.arrayToColor(that.activeColor));
				}

				if (that.activeTool === 'picker') {
					var color = this.getAttribute('fill').match(/\d+/gi) || [255, 255, 255];
					colorPicker.setColorOfShowColorPicker(color);
					that.activeColor = color;
					that.activeTool = 'brush'
				}

			}

			var parts = $$('*', this.svgNode);
			if (info.isTouch) {
				parts.forEach(function (node) {
					node.addEventListener(info.evt.up, setColorTouchEnd, false);
				});
			} else {
				parts.forEach(function (node) {
					node.addEventListener('click', setColorTouchEnd, false);
				});
			}

		},
		scaleImageBy: function (q) {

			if (((this.image.currentWidth < 150) || (this.image.currentHeight < 150)) && (q < 1)) {
				return false;
			}

			this.image.scale *= q;
			this.image.currentWidth *= q;
			this.image.currentHeight *= q;

			this.svgNode.style.width = this.image.currentWidth + 'px';
			this.svgNode.style.height = this.image.currentHeight + 'px';

			return true;

		},
		showColorPickerTurn: function (isEnable) {
			if (isEnable) {
				colorPicker.coloringColorButtons();
				colorPicker.saveImageScrolls();
				$.addClass(main.wrapper, 'show-color-picker');
			} else {
				$.removeClass(main.wrapper, 'show-color-picker');
				colorPicker.restoreImageScrolls();
			}
		},
		setShowColorPickerButton: function () {

			var button = $('.js-show-color-picker-button', main.wrapper);
			var that = this;

			if (info.isTouch) {
				button.addEventListener(info.evt.down, function () {
					that.activePolygon = this;
				}, false);
				button.addEventListener(info.evt.up, function () {
					if (that.activePolygon === this && utils.wasClick()) {
						that.showColorPickerTurn(true);
					}
				}, false);
			} else {
				button.addEventListener('click', function () {
					that.showColorPickerTurn(true);
				}, false);
			}

		}

	};

	win.draw = draw;

}(window));
