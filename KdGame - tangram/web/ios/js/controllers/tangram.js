(function (win) {

	"use strict";
	/*global window, document, console, alert */

	var tg, mover, rotater, util;

	util = {
		getCoordinatesFromStyle: function(style){
			var coords = (style || 'transform: translate(0px, 0px) rotate(0deg)').match(/-?\d+[pd]|-?\d+\.\d+[pd]/gi);
			coords.forEach(function(value, index, arr){
				arr[index] = parseFloat(value);
			});
			return coords;

		},
		getAngle: function(centerX, centerY, pointX, pointY) {
			var x = centerX - pointX;
			var y = centerY - pointY;
			var addGrad = (x >= 0) ? 180 : 0;
			var a = Math.atan(y/x) * 180 / Math.PI + addGrad;
			a += (a < 0) ? 360 : 0;
			return a;
		},
		toNormalAngle: function(angle) {
			while (angle < 0) {
				angle += 360;
			}
			while (angle >= 360) {
				angle -= 360;
			}
			return angle;
		},
		getPathSize: function(x0, y0, x1, y1){
			return Math.sqrt(Math.pow(x0-x1, 2) + Math.pow(y0-y1, 2));
		},
		sin: function(angle) {
			return Math.sin(angle / 180 * Math.PI);
		},
		cos: function(angle) {
			return Math.cos(angle / 180 * Math.PI);
		},
		getFigureCoordinates: function(polygon) {
			var figureName = polygon.getAttribute('figure-name');
			var coords = util.getCoordinatesFromStyle(polygon.getAttribute('style'));
			var points = figuresCode[figureName + 'Info'].allPoints;
			var coordinates = {
				points: [],
				center: {
					x: 0,
					y: 0
				},
				angle: 0,
				style: {
					x: 0,
					y: 0
				}
			};

			points.forEach(function(xy){

				var cx, cy, x0, y0, x1, y1, angle0, angle1, lineSize;

				cx = figuresCode[figureName + 'X'] * tg.q;
				cy = figuresCode[figureName + 'Y'] * tg.q;
				x0 = xy.x - cx;
				y0 = xy.y - cy;
				angle0 = util.getAngle(0, 0, x0, y0);

				angle1 = util.toNormalAngle(angle0 + coords[2]);
				lineSize = util.getPathSize(0, 0, x0, y0);

				// coords relative center of figure
				x1 = util.cos(angle1) * lineSize;
				y1 = util.sin(angle1) * lineSize;

				// real coordinates
				x1 += cx + coords[0];
				y1 += cy + coords[1];

				coordinates.points.push({x: x1, y: y1});
				coordinates.center = {x: cx + coords[0], y: cy + coords[1]};
				coordinates.angle = coords[2];
				coordinates.style = {
					x: coords[0],
					y: coords[1]
				}
			});

			var angle = coordinates.angle;
			angle = Math.round(util.toNormalAngle(angle) / 45) * 45;
			coordinates.angle = angle;

			return coordinates;

		},
		createFigureInfo: function(q) {

			var allFigures = ['B3A', 'M3A', 'S3A', 'SQR', 'TRP', 'TRPR'];
			allFigures.forEach(function(figureName){
				figuresCode[figureName + 'Info'] = {};
				var points = figuresCode[figureName];
				var pointsCoordinates = [];
				points = points.split(' ');
				points.forEach(function(xy){
					var x = parseFloat(xy.split(',')[0] * q);
					var y = parseFloat(xy.split(',')[1] * q);
					pointsCoordinates.push({x: x, y:y});
				});

				figuresCode[figureName + 'Info'].points = pointsCoordinates;
				figuresCode[figureName + 'Info'].width = figuresCode[figureName + 'Width'] * q;
				figuresCode[figureName + 'Info'].height = figuresCode[figureName + 'Height'] * q;
				figuresCode[figureName + 'Info'].centerX = figuresCode[figureName + 'X'] * q;
				figuresCode[figureName + 'Info'].centerY = figuresCode[figureName + 'Y'] * q;
				figuresCode[figureName + 'Info'].allPoints = [];

				points = figuresCode[figureName + 'Info'].points;

				var x0, x1, x2, x3, x4, x5, x6, x7, x8, y0, y1, y2, y3, y4, y5, y6, y7, y8, i, len;

				// add extra points
				switch (figureName) {
					case 'B3A':

						for (i = 0, len = points.length; i < len; i++ ) {
							x0 = points[i].x;
							y0 = points[i].y;
							x4 = points[i+1] ? points[i+1].x : points[0].x;
							y4 = points[i+1] ? points[i+1].y : points[0].y;

							figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y0});

							if (x0 === x4) {
								y8 = y4;
								y4 = (y8 + y0) / 2;
								y2 = (y4 + y0) / 2;
								y1 = (y2 + y0) / 2;
								y3 = (y2 + y4) / 2;
								y6 = (y8 + y4) / 2;
								y7 = (y8 + y6) / 2;
								y5 = (y4 + y6) / 2;
//								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y1});
								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y2});
//								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y3});
								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y4});
//								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y5});
								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y6});
//								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y7});
							} else {
								x2 = (x0 + x4)/2;
								y2 = (y0 + y4)/2;
								x1 = (x0 + x2)/2;
								y1 = (y0 + y2)/2;
								x3 = (x2 + x4)/2;
								y3 = (y2 + y4)/2;
//								figuresCode[figureName + 'Info'].allPoints.push({x:x1, y:y1});
								figuresCode[figureName + 'Info'].allPoints.push({x:x2, y:y2});
//								figuresCode[figureName + 'Info'].allPoints.push({x:x3, y:y3});
							}

						}

						break;
					case 'M3A':

						for (i = 0, len = points.length; i < len; i++ ) {
							x0 = points[i].x;
							y0 = points[i].y;
							x4 = points[i+1] ? points[i+1].x : points[0].x;
							y4 = points[i+1] ? points[i+1].y : points[0].y;

							figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y0});

							x2 = (x0 + x4)/2;
							y2 = (y0 + y4)/2;
							x1 = (x0 + x2)/2;
							y1 = (y0 + y2)/2;
							x3 = (x2 + x4)/2;
							y3 = (y2 + y4)/2;
//							figuresCode[figureName + 'Info'].allPoints.push({x:x1, y:y1});
							figuresCode[figureName + 'Info'].allPoints.push({x:x2, y:y2});
//							figuresCode[figureName + 'Info'].allPoints.push({x:x3, y:y3});
						}
						break;
					case 'SQR':

						for (i = 0, len = points.length; i < len; i++ ) {
							x0 = points[i].x;
							y0 = points[i].y;
							x2 = points[i+1] ? points[i+1].x : points[0].x;
							y2 = points[i+1] ? points[i+1].y : points[0].y;
							figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y0});
							x1 = (x0 + x2)/2;
							y1 = (y0 + y2)/2;
							figuresCode[figureName + 'Info'].allPoints.push({x:x1, y:y1});
						}
						break;
					case 'S3A':
						for (i = 0, len = points.length; i < len; i++ ) {
							x0 = points[i].x;
							y0 = points[i].y;
							x2 = points[i+1] ? points[i+1].x : points[0].x;
							y2 = points[i+1] ? points[i+1].y : points[0].y;

							figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y0});

							if (x0 === x2) {
								y4 = y2;

								y2 = (y0 + y4)/2;
								y1 = (y0 + y2)/2;
								y3 = (y2 + y4)/2;

//								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y1});
								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y2});
//								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y3});

							} else {
								x1 = (x0 + x2)/2;
								y1 = (y0 + y2)/2;
								figuresCode[figureName + 'Info'].allPoints.push({x:x1, y:y1});
							}

						}
						break;

					case 'TRP':
					case 'TRPR':

						for (i = 0, len = points.length; i < len; i++ ) {
							x0 = points[i].x;
							y0 = points[i].y;
							x2 = points[i+1] ? points[i+1].x : points[0].x;
							y2 = points[i+1] ? points[i+1].y : points[0].y;

							figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y0});

							if (x0 === x2) {
								y4 = y2;

								y2 = (y0 + y4)/2;
								y1 = (y0 + y2)/2;
								y3 = (y2 + y4)/2;

								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y1});
								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y2});
								figuresCode[figureName + 'Info'].allPoints.push({x:x0, y:y3});

							} else {
								x1 = (x0 + x2)/2;
								y1 = (y0 + y2)/2;
								figuresCode[figureName + 'Info'].allPoints.push({x:x1, y:y1});
							}

						}

						break;
				}



			});




		},
		//debug function - not use
		drawCircleByCoordinates: function(arr) {

			var w = info.screen.getWidth();
			var h = info.screen.getHeight();

			var tempNode = document.createElement('div');
			tempNode.innerHTML = '<svg version="1.2" baseProfile="tiny" class="figures-draw-field js-figures-draw-field" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + w + 'px" height="' + h + 'px" viewBox="0 0 ' + w + ' ' + h + '" xml:space="preserve"><\/svg>';

		},
		pointsInFigure: function(point, answer){

			var x0, y0;

			x0 = point.x;
			y0 = point.y;

			var lines = [];
			$.createSimpleArray(1, 1).forEach(function(value){
				lines.push({
					k: value * 0.5
				});
			});

			var points = answer.points;

			lines.forEach(function(line){

				var i, len, x1, y1, x2, y2, k, acros, acrosMunbers;
				k = line.k;

				acrosMunbers = 0;

				for (i = 0, len = points.length; i < len; i += 1) {

					x1 = points[i].x;
					y1 = points[i].y;

					x2 = points[i + 1] ? points[i + 1].x : points[0].x;
					y2 = points[i + 1] ? points[i + 1].y : points[0].y;

					acros = util.getPointsPositionRelativeOfLine(x0, y0, k, x1, y1, x2, y2);

					if (acros === 'across') {
						acrosMunbers += 1;
					}

					if (acros === 'touch') {
						line.state = 'touch';
					}

				}

				line.pointIsInner = acrosMunbers % 2 === 1;

			});

			lines.forEach(function(line){

				if (line.state !== 'touch') {
					console.log(line.pointIsInner);
				} else {
					console.log(line.state);
				}

			});




			return point;


		},
		getPointsPositionRelativeOfLine: function(x0, y0, k, x1, y1, x2, y2) {

			var delta = 2 * tg.q;
			var x, y, state, biggerX, smallerX, biggerY, smallerY;

			if (util.getPathSize(x1, x2, y1, y2) <= delta) {
				return 'no line';
			}

			if (Math.abs(x1 - x2) <= delta) { // if vertical line

				state = 'no across';

				// get y in point x1

				y = k * (x1 - x0) + y0;

				biggerY = (y1 > y2) ? y1 : y2;
				smallerY = (y1 < y2) ? y1 : y2;

				if ( y < biggerY && y > smallerY ) {
					state = 'across';
				}

				if ( util.getPathSize(x1, y1, x1, y) <= delta ) {
					state = 'touch';
				}

				if ( util.getPathSize(x2, y2, x2, y) <= delta ) {
					state = 'touch';
				}

				return state;

			}

			if (Math.abs(y1 - y2) <= delta) {   // if horizontal line

				state = 'no across';

				// get x in point y1

				x = (y1 - y0) / k + x0;

				biggerX = (x1 > x2) ? x1 : x2;
				smallerX = (x1 < x2) ? x1 : x2;

				if ( x < biggerX && x > smallerX ) {
					state = 'across';
				}

				if ( util.getPathSize(x1, y1, x, y1) <= delta ) {
					state = 'touch';
				}

				if ( util.getPathSize(x2, y2, x, y2) <= delta ) {
					state = 'touch';
				}

				return state;

			}

			// other cases
			var e1 = {
				a: k,
				b: -1,
				c: y0 - k * x0
			};

			var e2 = {
				a: 1 / (x2 - x1),
				b: 1 / (y2 - y1),
				c: ( y1 / (y2 - y1) - x1 / (x2 - x1) )
			};

			y = (e2.a * e1.c - e1.a * e2.c) / (e1.a * e2.b - e2.a * e1.b);
			x = -(e1.b * y + e1.c) / e1.a;

			biggerX = (x1 > x2) ? x1 : x2;
			smallerX = (x1 < x2) ? x1 : x2;
			biggerY = (y1 > y2) ? y1 : y2;
			smallerY = (y1 < y2) ? y1 : y2;

			if ( x < biggerX && x > smallerX && y < biggerY && y > smallerY ) {
				state = 'across'
			} else {
				state = 'no across';
			}

			if ( util.getPathSize(x1, y1, x, y) <= delta || util.getPathSize(x2, y2, x, y) <= delta ) {
				state = 'touch';
			}

			return state;

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
//	(function (win) {
//		console.log(util.getPathSize(0,0,3,4));
//	}(window));




	var evt = {
		down: info.isTouch ? 'touchstart' : 'mousedown',
		move: info.isTouch ? 'touchmove' : 'mousemove',
		up: info.isTouch ? 'touchend' : 'mouseup',
		out: info.isTouch ? 'touchcancel' : 'mouseout'
	};

	rotater = {
		isActive: false,
		defaultSize: 120,
		init: function(){
			this.wrapper = $('.js-rotater', main.wrapper);
			var size = this.defaultSize * tg.q;
			this.wrapper.style.width = size + 'px';
			this.wrapper.style.height = size + 'px';
			this.wrapper.style.marginTop = -size / 2 + 'px';
			this.wrapper.style.marginLeft = -size / 2 + 'px';

			var that = this;
			this.wrapper.addEventListener(evt.down, function(e){
				console.log('rotater wrapper down 0');
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
				console.log('rotater wrapper down 1');

			}, false);

			this.wrapper.addEventListener(evt.move, function(e){
				if (that.isActive) {
					that.curX = info.isTouch ? e.touches[0].pageX : e.pageX;
					that.curY = info.isTouch ? e.touches[0].pageY : e.pageY;
					that.rotate(e);
				} else {
					mover.move(e);
				}
			}, false);

			this.wrapper.addEventListener(evt.up, function(e){
				console.log('rotater wrapper up 0');
				that.isActive = false;
				that.alignAngle();
				that.showRotater();
				console.log('rotater wrapper up 1');
			}, false);

			var innerPoint = $('.js-rotater-inner-point', this.wrapper);
			innerPoint.addEventListener(evt.down, function(e){
				console.log('rotater inner point down 0');
				rotater.hideRotater();
				mover.isActive = true;
				mover.startX = info.isTouch ? e.touches[0].pageX : e.pageX;
				mover.startY = info.isTouch ? e.touches[0].pageY : e.pageY;
				mover.curX = info.isTouch ? e.touches[0].pageX : e.pageX;
				mover.curY = info.isTouch ? e.touches[0].pageY : e.pageY;
				var coords = util.getCoordinatesFromStyle(mover.activePolygon.node.getAttribute('style'));
				mover.activePolygon = {
					node: mover.activePolygon.node,
					x: coords[0] || 0,
					y: coords[1] || 0,
					angle: coords[2] || 0
				};
				e.stopPropagation();
				console.log('rotater inner point down 1');
			}, false);

			innerPoint.addEventListener(evt.up, function(){
				console.log('rotater inner point up 0');
				that.alignAngle();
				console.log('rotater inner point up 1');
			}, false);

		},
		showRotater: function() {
			//this.isActive = true;
			this.wrapper.style.display = 'block';
			var activePolygon = $('.js-figures-container polygon.active');
			var coords = util.getCoordinatesFromStyle(activePolygon.getAttribute('style'));
			this.activePolygon = {
				node: activePolygon,
				x: coords[0] || 0,
				y: coords[1] || 0,
				angle: coords[2] || 0,
				type: activePolygon.getAttribute('figure-name')
			};
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
		},
		alignAngle: function(){

			var activePolygon = $('.js-figures-container polygon.active');

			if (!activePolygon) {
				return;
			}


			var coords = util.getCoordinatesFromStyle(activePolygon.getAttribute('style'));
			var angle = coords[2];
			angle = util.toNormalAngle(angle);
			angle = Math.round(angle / 45) * 45;
			angle = angle % 360;
			angle += angle < 0 ? 360 : 0;


			activePolygon.setAttribute('style', info.preCSS + 'transform: translate(' + coords[0] + 'px, ' + coords[1] + 'px) rotate(' + angle + 'deg);');
			// if part of figure oyt of screen -> return this one tu screen
			mover.putFigureInBox(activePolygon);

			mover.alignCoordinates(activePolygon);
			tg.testAnswer();

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
		},
		alignCoordinates: function(activePolygon){

			if (!activePolygon) {
				return;
			}

			var polygons = $$('.js-figures-container polygon', main.wrapper);

			// coordinates for active lement
			var activeCoordinates = [];

			// coordinates for others lement
			var staticCoordinates = [];

			polygons.forEach(function(polygon){
				var pointsArr = JSON.parse(JSON.stringify(util.getFigureCoordinates(polygon).points));
				if (polygon.getAttribute('class') === 'active') {
					activeCoordinates = activeCoordinates.concat(pointsArr);
				} else {
					staticCoordinates = staticCoordinates.concat(pointsArr);
				}
			});

			var minDX = Infinity;
			var minDY = Infinity;

			var alignD = 7 * tg.q;

			staticCoordinates = staticCoordinates.concat(tg.extraAlignPoints);

			activeCoordinates.forEach(function(xyActive){
				staticCoordinates.forEach(function(xyStatic){
					var dx = xyStatic.x - xyActive.x;
					var dy = xyStatic.y - xyActive.y;
					if (util.getPathSize(0, 0, dx, dy) < util.getPathSize(0, 0, minDX, minDY))  {
						minDX = dx;
						minDY = dy;
					}

				});
			});

			var coords = util.getCoordinatesFromStyle(activePolygon.getAttribute('style'));
			coords[2] = util.toNormalAngle(coords[2]);
			coords[2] = Math.round(coords[2] / 45) * 45;

			if (util.getPathSize(0, 0, minDX, minDY) < Math.abs(alignD)) {
				var style = info.preCSS + 'transform: translate(' + (coords[0] + minDX) + 'px, ' + (coords[1] + minDY) + 'px) rotate(' + coords[2] + 'deg)';
				activePolygon.setAttribute('style', style);
				rotater.showRotater();
			}

		},
		putFigureInBox: function(activeFigure){

			var maxX = info.screen.getWidth();
			var maxY = info.screen.getHeight();
			var maxDTop = 0;
			var maxDRight = 0;
			var maxDBottom = 0;
			var maxDLeft = 0;

			var coords = util.getFigureCoordinates(activeFigure);
			var styleCoords = util.getCoordinatesFromStyle(activeFigure.getAttribute('style'));
			coords.points.forEach(function(xyObj){
				if (xyObj.x < 0) {
					maxDLeft = (maxDLeft < xyObj.x) ? maxDLeft : xyObj.x;
				}
				if (xyObj.y < 0) {
					maxDTop = (maxDTop < xyObj.y) ? maxDTop : xyObj.y;
				}
				if (xyObj.x > maxX) {
					maxDRight = (maxDRight > (xyObj.x - maxX)) ? maxDRight : (xyObj.x - maxX);
				}
				if (xyObj.y > maxY) {
					maxDBottom = (maxDBottom > (xyObj.y - maxY)) ? maxDBottom : (xyObj.y - maxY);
				}
			});

			if (maxDLeft !== 0 || maxDRight !== 0) {
				styleCoords[0] -= maxDLeft + maxDRight;
			}
			if (maxDTop !== 0 || maxDBottom !== 0) {
				styleCoords[1] -= maxDTop + maxDBottom;
			}

			styleCoords[0] = Math.round(styleCoords[0]);
			styleCoords[1] = Math.round(styleCoords[1]);

			var style = info.preCSS + 'transform: translate(' + styleCoords[0] + 'px, ' + styleCoords[1] + 'px) rotate(' + styleCoords[2] + 'deg);';
			activeFigure.setAttribute('style', style);

			if (maxDTop !== 0 || maxDRight !== 0 || maxDLeft !== 0 || maxDBottom !== 0) {
				if (activeFigure.getAttribute('class') === 'active') {
					rotater.showRotater();
				}
			}

		},
		reflectFigure: function() {

			var activePolygon = $('.js-figures-container polygon.active');
			if (!activePolygon) {
				return false;
			}

			event.stopPropagation();

			var coords = util.getCoordinatesFromStyle(activePolygon.getAttribute('style'));
			coords[2] += 180;
			coords[2] = util.toNormalAngle(coords[2]);
			var style = info.preCSS + 'transform: translate(' + coords[0] + 'px, ' + coords[1] + 'px) rotate(' + coords[2] + 'deg)';
			activePolygon.setAttribute('style', style);

			var figureName = activePolygon.getAttribute('figure-name');

			var pointsSrt = '';
			switch (figureName) {
				case 'TRP':
					figuresCode.TRPRInfo.points.forEach(function(xy){
						pointsSrt += xy.x + ',' + xy.y + ' ';
					});
					activePolygon.setAttribute('figure-name', 'TRPR');
					activePolygon.setAttribute('points', pointsSrt);
					break;
				case 'TRPR':
					figuresCode.TRPInfo.points.forEach(function(xy){
						pointsSrt += xy.x + ',' + xy.y + ' ';
					});
					activePolygon.setAttribute('figure-name', 'TRP');
					activePolygon.setAttribute('points', pointsSrt);
					break;

			}

		}

	};

	tg = {
		figureList: ['B3A', 'B3A', 'M3A', 'S3A', 'S3A', 'SQR', 'TRP'],
		fillColor: '#0C0',
		strokeColor: '#000',
		mover: mover,
		start: function () {
			/**
			 * flow
			 * - add question figure - done
			 * - get and set scale q - done
			 * - create svg with active polygons, append this one - done
			 * - add event listeners to polygons - not done
			 *
			 * */

			var questionFigureSVG = win.categories[info.currentCategoryName].figures[info.imageNumber].svg.toString();

			var wrapper = $('.page', main.wrapper);

			var w = info.screen.getWidth();
			var h = info.screen.getHeight();

			// color main image begin
			var colorizedPolygonsColor = (info.difficult === 'tower') ? info.mainFigureColor : 'transparent';
			questionFigureSVG = questionFigureSVG.replace(/fill='.*?'/gi, "fill='" + colorizedPolygonsColor + "'");
			// color main image end

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

					// create all info
					console.log(figuresCode);

					figuresStr += figuresCode.template.replace('{{figureName}}', figureName)
						.replace('{{fillColor}}', tg.fillColor)
						.replace('{{strokeColor}}', tg.strokeColor)
						.replace('{{points}}', points);

				});
				tempNode.innerHTML = tempNode.innerHTML.replace('{{figures}}', figuresStr);
				var svg = $('svg', tempNode);
				wrapper.appendChild(svg);
				util.createFigureInfo(tg.q);
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
						console.log('polygon down 0');
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
							x: coords[0] || 0,
							y: coords[1] || 0,
							angle: coords[2] || 0
						};

						mover.activePolygon.node.setAttribute('class', 'active');

						e.stopPropagation();
						console.log('polygon down 1');
					}, false);
				});

				polygons.forEach(function(polygon){
					polygon.addEventListener(evt.up, function(e){
						console.log('polygon up 0');

						mover.isActive = false;

						//rotater.isActive = true;
						var coords = util.getCoordinatesFromStyle(this.getAttribute('style'));
						rotater.activePolygon = {
							node: this,
							x: coords[0] || 0,
							y: coords[1] || 0,
							angle: coords[2] || 0,
							type: this.getAttribute('figure-name')
						};
						rotater.showRotater();
						rotater.alignAngle();
						e.stopPropagation();
						console.log('polygon up 1');

					}, false);
				});

				// set event listener to main svg (work field)
				var field = $('.js-figures-container');
				field.addEventListener(evt.down, function(e) {
					console.log('field down 0');

					mover.isActive = false;
					mover.activePolygon.node.setAttribute('class', '');
					rotater.hideRotater();
					console.log('field down 1');

				}, false);
				field.addEventListener(evt.move, function(e) {
					mover.move(e);
				}, false);
				field.addEventListener(evt.up, function(e) {
					console.log('field up 0');

					mover.isActive = false;
					rotater.hideRotater();
					rotater.alignAngle();
					console.log('field up 1');

				}, false);

			}());
			// add event listeners to polygons end

			// add extra align points begin
			var extraAlignPoints = [];
			(function () {
				var tempNode = document.createElement('div');
				tempNode.innerHTML = questionFigureSVG;
				var svg = $('svg', tempNode);
				var originalWidth = parseInt(svg.getAttribute('width'), 10);
				var originalHeight = parseInt(svg.getAttribute('height'), 10);
				var currentWidth = originalWidth * tg.q;
				var currentHeight = originalHeight * tg.q;

				var offsetX = (info.screen.getWidth() - currentWidth) / 2;
				var offsetY = (info.screen.getHeight() - currentHeight) / 2;

				var polygons = $$('polygon', tempNode);

				var points, x, y;
				polygons.forEach(function(polygon){
					points = (polygon.getAttribute('points')).trim();
					points = points.split(' ');
					points.forEach(function(xy){
						x = parseFloat(xy.split(',')[0]) * tg.q + offsetX;
						y = parseFloat(xy.split(',')[1]) * tg.q + offsetY;
						extraAlignPoints.push({x:x, y:y});
					})
				});
			}());
			this.extraAlignPoints = extraAlignPoints;
			// add extra align points end

			// add thumb image to left top angle for king difficult begin
			(function () {
				if (info.difficult === 'king') {
					var smallSVG = questionFigureSVG.toString(); // create new string
					smallSVG = smallSVG.replace(/fill='.*?'/gi, "fill='" + info.mainFigureColor + "'");
					var imgWrapper = $('.js-thumb-wrapper', main.wrapper);
					imgWrapper.setAttribute('style', 'background-image: url("data:image/svg+xml;utf8,' + smallSVG + '")');
				}
			}());
			// add thumb image to left top angle for king difficult end

			rotater.init();

			// create answer points
			var answerPoints = [];
			var minX, minY;
			(function () {
				minX = Infinity;
				minY = Infinity;

				extraAlignPoints.forEach(function(xy){
					minX = (xy.x < minX) ? xy.x : minX;
					minY = (xy.y < minY) ? xy.y : minY;
				});

				extraAlignPoints.forEach(function(xy){
					answerPoints.push({x: xy.x - minX, y: xy.y - minY});
				});

			}());

			this.answer = {
				points: answerPoints,
				minX: minX,
				minY: minY
			};

			console.log('tangram init');

		},
		testAnswer: function() {

			// get point of active figure
			var polygons = $$('.js-figures-container polygon', main.wrapper);
			var polygonPoints = [];
			var centerPoints = [];
			polygons.forEach(function(polygon){
				var coords = util.getFigureCoordinates(polygon);
				polygonPoints = polygonPoints.concat(coords.points);
				centerPoints.push(coords.center);
			});

			var minX = Infinity;
			var minY = Infinity;

			polygonPoints.forEach(function(xy){
				minX = (xy.x < minX) ? xy.x : minX;
				minY = (xy.y < minY) ? xy.y : minY;
			});

			// adjust polygon points
			polygonPoints.forEach(function(xy, index, arr){
				arr[index].x = xy.x - minX;
				arr[index].y = xy.y - minY;
			});

			// adjust center of polygon points
			centerPoints.forEach(function(xy, index, arr){
				arr[index].x = xy.x - minX;
				arr[index].y = xy.y - minY;
			});

			var answer = JSON.parse(JSON.stringify(this.answer));

			var that = this;

			// test for angles
			(function () {

				var delta = 2 * that.q;

				answer.points.forEach(function(xy, index, arr){
					polygonPoints.forEach(function(activeXY){
						if ( util.getPathSize(xy.x, xy.y, activeXY.x, activeXY.y) < delta ) {
							console.log(index);
							arr[index].accordAngle = true;
						}
					});
				});

				var properlyAnswers = 0;

				answer.points.forEach(function(xy){
					if (xy.accordAngle) {
						properlyAnswers += 1;
					}
				});

				if (properlyAnswers >= answer.points.length) {
					console.log(' ----- ANGLE test is PASSED ----- ');
				} else {
					console.log(' ----- ANGLE test is ERROR ----- ');
				}

			}());

			// test for all centers in figure
			answer = JSON.parse(JSON.stringify(this.answer));
			(function () {

				centerPoints.forEach(function(xy){

					var inside = util.pointsInFigure(xy, answer);
					//console.log(inside);

				});

			}());



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
		TRPRWidth: 25,
		TRPRHeight: 75,
		TRPRX: 12.5,
		TRPRY: 37.5,

		template: '<polygon figure-name="{{figureName}}" fill="{{fillColor}}" stroke="{{strokeColor}}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="{{points}}"/>'

	};

	win.tangram = tg;

}(window));
