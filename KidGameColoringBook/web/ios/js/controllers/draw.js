(function (win) {

	"use strict";
	/*global window, document, console, alert */

	var utils = {
		minMove: 4,
		getPathSize: function (x0, y0, x1, y1) {
			return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
		},
		wasClick: function () {
			var x1, y1, x2, y2;
			x1 = info.evt.touchStart.x;
			y1 = info.evt.touchStart.y;
			x2 = info.evt.touchMove.x;
			y2 = info.evt.touchMove.y;
			return utils.getPathSize(x1, y1, x2, y2) < this.minMove;
		},
		arrayToColor: function (arr) {
			return 'rgb(' + arr.join(',') + ')';
		}

	};

	var colorPicker = {
		newColor: [255, 255, 255],
		oldColor: [255, 255, 255],
		currentColor: [255, 255, 255],
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

			this.createColorMap();
			this.setButtonsColor();
			this.setMainColorPicker();
		},
		setButtonsColor: function () {
			this.newColorButton.style.backgroundColor = utils.arrayToColor(this.newColor);
			this.oldColorButton.style.backgroundColor = utils.arrayToColor(this.oldColor);
		},
		createColorMap: function () {
			this.colorMap = [];
			var that = this;
			this.mainColors.forEach(function (color, index, arr) {
				var percent = index / (arr.length - 1);
				that.colorMap.push({percent: percent, color: color});
			});
			this.colorMap = this.colorMap.sort(function(a, b) {
				return a.percent - b.percent;
			});

		},
		setMainColorPicker: function () {

			// set bgi
			var bgi = 'left';
			this.colorMap.forEach(function(color){
				bgi += ', ' + utils.arrayToColor(color.color) + ' ' + (color.percent * 100) + '%'
			});
			bgi = info.preCSS + 'linear-gradient(' + bgi + ')';
			this.mainColorNode.style.backgroundImage = bgi;

			// add event listener
			function getColorValue(e) {
				// get left offset
				var fillWidth = info.screen.getWidth();
				var leftOffset = fillWidth * 0.05 + 5;
				var fieldSize = fillWidth - leftOffset * 2;
				var x = info.isTouch ? e.touches[0].pageX : e.pageX;
				x -= leftOffset;
				var percent = x / fieldSize;
				percent = percent < 0 ? 0 : percent;
				percent = percent > 1 ? 1 : percent;
				console.log(percent);
			}

			this.mainColorNode.addEventListener(info.evt.down, getColorValue, false);
			this.mainColorNode.addEventListener(info.evt.up, getColorValue, false);

			if (info.isTouch) {
				this.mainColorNode.addEventListener(info.evt.move, getColorValue, false);
			}
			
		}

	};

	var draw = {
		activeColor: '#0c0',
		usedColors: [],
		activeTool: 'brush',  // brush or picker
		start: function () {

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

		},
		setScaleButtons: function () {

			var buttonPlus = $('.js-scale-button-plus', main.wrapper);
			var buttonMinus = $('.js-scale-button-minus', main.wrapper);

			buttonPlus.addEventListener(info.evt.up, this.scaleImageBy.bind(this, 1.1), false);
			buttonMinus.addEventListener(info.evt.up, this.scaleImageBy.bind(this, 0.9), false);

		},
		setSVGColoring: function () {

			var that = this;

			function setColorClick() {
				if (that.activeTool === 'brush') {
					this.setAttribute('fill', that.activeColor);
				}
			}

			function setColorTouchStart() {
				that.activePolygon = this;
			}

			function setColorTouchEnd() {
				if (that.activePolygon === this && utils.wasClick() && that.activeTool === 'brush') {
					this.setAttribute('fill', that.activeColor);
				}
			}

			var parts = $$('*', this.svgNode);
			if (info.isTouch) {
				parts.forEach(function (node) {
					node.addEventListener(info.evt.down, setColorTouchStart, false);
					node.addEventListener(info.evt.up, setColorTouchEnd, false);
				});
			} else {
				parts.forEach(function (node) {
					node.addEventListener('click', setColorClick, false);
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
				statusBar.hideStatusBar();
				$.addClass(main.wrapper, 'show-color-picker');
			} else {
				statusBar.showStatusBar();
				$.removeClass(main.wrapper, 'show-color-picker');
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
