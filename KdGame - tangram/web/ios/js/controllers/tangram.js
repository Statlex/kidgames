(function (win) {

	"use strict";
	/*global window, document, console, alert */

	var tg, mover, rotater, util;

	util = {
		getCoordinatesFromStyle: function(style){
			var coords = (style || 'transform: translate(0px, 0px) rotate(0deg)').match(/-?\d+|-?\d+\.\d+/gi);
			coords.forEach(function(value, index, arr){
				arr[index] = parseFloat(value);
			});

			return coords;
		},
		getAngle: function(centerX, centerY, pointX, pointY) {
			var x = centerX - pointX;
			var y = centerY - pointY;
			var addGrad = (x >= 0) ? 180 : 0;
			var a = Math.round(Math.atan(y/x) * 180 / 3.1415926 + addGrad);
			a += (a < 0) ? 360 : 0;
			return a;
		}
	};

// test for util.getAngle
//	(function () {
//		var x = [10, 10, 0, -10, -10, -10, 0, 10];
//		var y = [0, 10, 10, 10, 0, -10, -10, -10];
//		x.forEach(function(value, i) {
//			console.log( x[i] + ' / ' + y[i] + ' / ' + util.getAngle(0,0,x[i], y[i]) );
//		})
//	}());

	var evt = {
		down: info.isTouch ? 'touchstart' : 'mousedown',
		move: info.isTouch ? 'touchmove' : 'mousemove',
		up: info.isTouch ? 'touchend' : 'mouseup',
		out: info.isTouch ? 'touchcancel' : 'mouseout'
	};

	rotater = {
		isActive: false,
		defaultSize: 150,
		init: function(){
			this.wrapper = $('.js-rotater', main.wrapper);
			var size = this.defaultSize * tg.q;
			this.wrapper.style.width = size + 'px';
			this.wrapper.style.height = size + 'px';
			this.wrapper.style.marginTop = -size / 2 + 'px';
			this.wrapper.style.marginLeft = -size / 2 + 'px';

			var that = this;
			this.wrapper.addEventListener(evt.down, function(e){
				rotater.isActive = true;
				that.startX = info.isTouch ? e.touches[0].pageX : e.pageX;
				that.startY = info.isTouch ? e.touches[0].pageY : e.pageY;
				that.curX = info.isTouch ? e.touches[0].pageX : e.pageX;
				that.curY = info.isTouch ? e.touches[0].pageY : e.pageY;
				var poly = that.activePolygon;
				var coords = util.getCoordinatesFromStyle(poly.node.getAttribute('style'));
				that.activePolygon = {
					node: poly.node,
					x: coords[0] || 0,
					y: coords[1] || 0,
					angle: coords[2] || 0,
					type: poly.node.getAttribute('figure-name')
				};
				that.showRotater();
				that.startAngle = util.getAngle(that.rotateCenterX, that.rotateCenterY, that.startX, that.startY);

			}, false);

			this.wrapper.addEventListener(evt.move, function(e){
				if (that.isActive) {
					that.curX = info.isTouch ? e.touches[0].pageX : e.pageX;
					that.curY = info.isTouch ? e.touches[0].pageY : e.pageY;
					that.rotate(e);
				}
			}, false);

			this.wrapper.addEventListener(evt.up, function(e){
				that.isActive = false;
			}, false);

			var innerPoint = $('.js-rotater-inner-point', this.wrapper);
			innerPoint.addEventListener(evt.down, function(e){
				rotater.hideRotater();
				mover.isActive = true;
				mover.startX = info.isTouch ? e.touches[0].pageX : e.pageX;
				mover.startY = info.isTouch ? e.touches[0].pageY : e.pageY;
				mover.curX = info.isTouch ? e.touches[0].pageX : e.pageX;
				mover.curY = info.isTouch ? e.touches[0].pageY : e.pageY;
				var coords = util.getCoordinatesFromStyle(mover.activePolygon.node.getAttribute('style'));
				mover.activePolygon = {
					node: mover.activePolygon.node,
					x: parseFloat(coords[0]) || 0,
					y: parseFloat(coords[1]) || 0,
					angle: parseFloat(coords[2]) || 0
				};
				e.stopPropagation();
			}, false);

		},
		showRotater: function() {
			var poly = this.activePolygon;
			var dX = figuresCode[poly.type + 'X'] * tg.q;
			var dY = figuresCode[poly.type + 'Y'] * tg.q;
			this.rotateCenterX = (poly.x + dX);
			this.rotateCenterY = (poly.y + dY);
			this.wrapper.style[info.preJS + 'Transform'] = 'translate(' + this.rotateCenterX + 'px, ' + this.rotateCenterY + 'px)';
			this.wrapper.style.display = 'block';
		},
		hideRotater: function(){
			this.isActive = false;
			this.wrapper.style.display = 'none';
		},
		rotate: function(e) {
			var angle = util.getAngle(this.rotateCenterX, this.rotateCenterY, this.curX, this.curY) - this.startAngle;
			var poly = this.activePolygon;
			poly.node.setAttribute('style', info.preCSS + 'transform: translate(' + poly.x + 'px, ' + poly.y + 'px) rotate(' + (poly.angle + angle) + 'deg);');
		}
	};

	mover = {
		isActive: false,
		move: function(e) {
			if (this.isActive) {
				this.curX = info.isTouch ? e.touches[0].pageX : e.pageX;
				this.curY = info.isTouch ? e.touches[0].pageY : e.pageY;
				this.activePolygon.node.setAttribute('style', info.preCSS + 'transform: translate(' + (this.activePolygon.x + this.curX - this.startX) + 'px, ' + (this.activePolygon.y + this.curY - this.startY) + 'px) rotate(' + this.activePolygon.angle + 'deg);');
			}

			if (rotater.isActive) {
				rotater.rotate(e);
				rotater.curX = info.isTouch ? e.touches[0].pageX : e.pageX;
				rotater.curY = info.isTouch ? e.touches[0].pageY : e.pageY;
			}

		}


	};

	tg = {
		figureList: ['B3A', 'B3A', 'M3A', 'S3A', 'S3A', 'SQR', 'TRP'],
		fillColor: '#0C0',
		strokeColor: '#000',
		start: function () {
			/**
			 * flow
			 * - add question figure - done
			 * - get and set scale q - done
			 * - create svg with active polygons, append this one - done
			 * - add event listeners to polygons - not done
			 *
			 * */

			var questionFigureSVG = win.categories.animal_1.svg;

			var wrapper = $('.page', main.wrapper);

			var w = info.screen.getWidth();
			var h = info.screen.getHeight();

			// add question figure begin
			wrapper.setAttribute('style', "background-image: url(\"data:image/svg+xml;utf8," + questionFigureSVG + "\");");
			// -add question figure end

			// get and set scale q begin
			(function () {
				var tempNode = document.createElement('div');
				tempNode.innerHTML = questionFigureSVG;
				var svg = $('svg', tempNode);
				var originalWidth = parseInt(svg.getAttribute('width'), 10);
				var originalHeight = parseInt(svg.getAttribute('height'), 10);
				var svgAspectRatio = originalWidth / originalHeight;
				if (svgAspectRatio > info.screen.getAspectRatio()) {
					tg.q = wrapper.clientWidth / originalWidth;
				} else {
					tg.q = wrapper.clientHeight / originalHeight;
				}
			}());
			// get and set scale q end

			// create svg with active polygons, append this one begin
			(function () {
				var tempNode = document.createElement('div');
				tempNode.innerHTML = '<svg version="1.2" baseProfile="tiny" class="figures-container js-figures-container" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + w + 'px" height="' + h + 'px" viewBox="0 0 ' + w + ' ' + h + '" xml:space="preserve">{{figures}}<\/svg>';
				// create figures
				var figuresStr = '';
				tg.figureList.forEach(function(figureName){
					var points = figuresCode[figureName];

					// scale figure begin
					points = points.split(' ');
					points.forEach(function(xy, index, arr) {
						var x = xy.split(',')[0];
						var y = xy.split(',')[1];
						arr[index] = [x * tg.q + ',' + y * tg.q];
					});
					points = points.join(' ');
					// scale figure end

					figuresStr += figuresCode.template.replace('{{figureName}}', figureName)
						.replace('{{fillColor}}', tg.fillColor)
						.replace('{{strokeColor}}', tg.strokeColor)
						.replace('{{points}}', points);

				});
				tempNode.innerHTML = tempNode.innerHTML.replace('{{figures}}', figuresStr);
				var svg = $('svg', tempNode);
				wrapper.appendChild(svg);
			}());
			// create svg with active polygons, append this one end

			// add event listeners to polygons begin
			(function () {

				//create default element
				mover.activePolygon = {
					node: document.createElement('div')
				};
				mover.activePolygon.node.style[info.preJS + 'Transform'] = 'translate(0px, 0px) rotate(0deg)';

				var polygons = $$('.js-figures-container polygon');
				polygons.forEach(function(polygon){
					polygon.addEventListener(evt.down, function(e) {
						mover.activePolygon.node.setAttribute('class', '');
						rotater.hideRotater();

						this.parentNode.appendChild(this.parentNode.removeChild(this));
						mover.isActive = true;
						mover.startX = info.isTouch ? e.touches[0].pageX : e.pageX;
						mover.startY = info.isTouch ? e.touches[0].pageY : e.pageY;
						mover.curX = info.isTouch ? e.touches[0].pageX : e.pageX;
						mover.curY = info.isTouch ? e.touches[0].pageY : e.pageY;
						var coords = util.getCoordinatesFromStyle(this.getAttribute('style'));
						mover.activePolygon = {
							node: this,
							x: parseFloat(coords[0]) || 0,
							y: parseFloat(coords[1]) || 0,
							angle: parseFloat(coords[2]) || 0
						};

						mover.activePolygon.node.setAttribute('class', 'active');

						e.stopPropagation();
					}, false);
				});

				polygons.forEach(function(polygon){
					polygon.addEventListener(evt.up, function(e){
						mover.isActive = false;

						//rotater.isActive = true;
						var coords = util.getCoordinatesFromStyle(this.getAttribute('style'));
						rotater.activePolygon = {
							node: this,
							x: parseFloat(coords[0]) || 0,
							y: parseFloat(coords[1]) || 0,
							angle: parseFloat(coords[2]) || 0,
							type: this.getAttribute('figure-name')
						};
						rotater.showRotater();

						e.stopPropagation();
					}, false);
				});

				// set event listener to main svg (work field)
				var field = $('.js-figures-container');
				field.addEventListener(evt.down, function(e) {
					mover.isActive = false;
					mover.activePolygon.node.setAttribute('class', '');
					rotater.hideRotater();
				}, false);
				field.addEventListener(evt.move, function(e) {
					mover.move(e);
				}, false);
				field.addEventListener(evt.up, function(e) {
					mover.isActive = false;
					rotater.hideRotater();
				}, false);

			}());
			// add event listeners to polygons end

			rotater.init();



			console.log('tangram init');


		}



	};

	var figuresCode = {
		B3A: '50,100 0,50 50,0',
		B3AWidth: 50,
		B3AHeight: 100,
		B3AX: 25,
		B3AY: 50,

		M3A: '35.355,70.711 35.355,0 0,35.355',
		M3AWidth: 35.355,
		M3AHeight: 70.711,
		M3AX: 17.6775,
		M3AY: 35.3555,

		S3A: '0,25 25,50 25,0',
		S3AWidth: 25,
		S3AHeight: 50,
		S3AX: 12.5,
		S3AY: 25,

		SQR: '0,0 35.355,0 35.355,35.355 0,35.355',
		SQRWidth: 35.355,
		SQRHeight: 35.355,
		SQRX: 17.6775,
		SQRY: 17.6775,

		TRP: '0,50 0,0 25,25 25,75',
		TRPWidth: 25,
		TRPHeight: 75,
		TRPX: 12.5,
		TRPY: 37.5,

		TRPR: '0,25 0,75 25,50 25,0',

		template: '<polygon figure-name="{{figureName}}" fill="{{fillColor}}" stroke="{{strokeColor}}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="{{points}}"/>'

	};


	win.tangram = tg;

}(window));
