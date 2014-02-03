(function (win) {

	"use strict";
	/*global window, document, console, alert */

	var utils = {
		minMove: 4,
		getPathSize: function (x0, y0, x1, y1) {
			return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
		},
		wasClick: function() {
			var x1, y1, x2, y2;
			x1 = info.evt.touchStart.x;
			y1 = info.evt.touchStart.y;
			x2 = info.evt.touchMove.x;
			y2 = info.evt.touchMove.y;
			return utils.getPathSize(x1, y1, x2, y2) < this.minMove;
		},
		generateColors: function() {

			var rArr, gArr, bArr;

			var colors = [];

			rArr = $.createSimpleArray(0, 4);
			gArr = $.createSimpleArray(0, 4);
			bArr = $.createSimpleArray(0, 4);

			rArr.forEach(function(r){
				gArr.forEach(function(g){
					bArr.forEach(function(b) {

						var rValue = (r*4).toString(16);
						var gValue = (g*4).toString(16);
						var bValue = (b*4).toString(16);

						rValue = (rValue.length > 1) ? 'f' : rValue;
						gValue = (gValue.length > 1) ? 'f' : gValue;
						bValue = (bValue.length > 1) ? 'f' : bValue;

						var color = rValue + gValue + bValue;
						if (colors.indexOf(color) === -1) {
							colors.push(color);
						}
					});
				});
			});

			return colors;

		}

	};

	var draw = {
		activeColor: '#0c0',
		usedColors: [],
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
			this.createColorForColorPicker();

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
				this.setAttribute('fill', that.activeColor);
			}

			function setColorTouchStart() {
				that.activePolygon = this;
			}

			function setColorTouchEnd() {
				if (that.activePolygon === this && utils.wasClick()) {
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
				button.addEventListener(info.evt.down, function() {
					that.activePolygon = this;
				}, false);
				button.addEventListener(info.evt.up, function(){
					if (that.activePolygon === this && utils.wasClick()) {
						that.showColorPickerTurn(true);
					}
				}, false);
			} else {
				button.addEventListener('click', function() {
					that.showColorPickerTurn(true);
				}, false);
			}

		},
		createColorForColorPicker: function() {
			var colors = utils.generateColors();
			var colorsHTML = '';
			var template = '<div style="background-color: #{{color}}"><\/div>'

			colors.forEach(function(color){
				colorsHTML += template.replace('{{color}}', color);
			});

			var colorPickerWrapper = $('.js-color-picker', main.wrapper);
			colorPickerWrapper.innerHTML = colorsHTML;
			console.log(colors);
			console.log(colors.length);
		}

	};

	win.draw = draw;

}(window));
