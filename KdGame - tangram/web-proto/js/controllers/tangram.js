(function (win) {

	"use strict";
	/*global window, document, $ */

	var isTouch = document.documentElement.hasOwnProperty('ontouchstart');

	var evt = {
		down: isTouch ? 'touchstart' : 'mousedown',
		move: isTouch ? 'touchmove' : 'mousemove',
		up: isTouch ? 'touchend' : 'mouseup',
		out: isTouch ? 'touchcancel' : 'mouseout'
	};

	var mover = {
		alignAngle: function() {
			var node = mover.activeObject.node;
			var style = node.getAttribute('style');
			var angle = (style.match(/-?\d+|-?\d+\.\d+/gi))[2];
			angle = Math.round(angle/45)*45;
			style = style.replace(/-?\d+deg|-?\d+\.\d+deg/gi, angle + 'deg');
			mover.activeObject.angle = angle;
			node.setAttribute('style', style);
		},
		getAngle: function(centerX, centerY, pointX, pointY) {
			var x = centerX - pointX;
			var y = centerY - pointY;
			var addGrad = 0;
			if (x > 0) {
				addGrad = 180;
			}
			return Math.atan(y/x) * 180 / 3.1415926 + addGrad;
		},
		init: function() {

			// set def object
			var div = document.createElement('div');
			div.setAttribute('style', 'transform: translate(0px, 0px) rotate(0deg)');
			this.activeObject = {
				node: div
			};

		},
		addObject: function(polygon) {

			this.activeObject.node.removeAttribute('class');

			this.moverIsActive = true;
			this.showRotater(false);

			this.startX = event.pageX || event.touches[0].pageX;
			this.startY = event.pageY || event.touches[0].pageY;

			// go on top
			polygon.parentNode.appendChild(polygon.parentNode.removeChild(polygon));

			// get start position
			var style = polygon.getAttribute('style') || 'transform(0px, 0px) rotate(0deg)';
			style = style.match(/-?\d+|-?\d+\.\d+/gi);
			this.activeObject = {
				node: polygon,
				startX: parseInt(style[0], 10),
				startY: parseInt(style[1], 10),
				angle: parseInt(style[2], 10)
			};

			this.activeObject.x = this.activeObject.startX;
			this.activeObject.y = this.activeObject.startY;

			// fix rotater when click to polygon
			var objectName = this.activeObject.node.getAttribute('figure-name');
			this.rotater.x = this.activeObject.x + figuresCode[objectName + 'Width'] / 2 * tangram.mainImage.q;
			this.rotater.y = this.activeObject.y + figuresCode[objectName + 'Height'] / 2 * tangram.mainImage.q;
			this.rotater.node.style[info.preJS + 'Transform'] = 'translate(' + this.rotater.x + 'px, ' + this.rotater.y + 'px)';

			this.activeObject.node.setAttribute('class', 'active');

		},
		move: function() {
			var obj = this.activeObject;
			this.currentX = (event.pageX !== undefined) ? event.pageX : event.touches[0].pageX;
			this.currentY = (event.pageY !== undefined) ? event.pageY : event.touches[0].pageY;
			if (this.moverIsActive) {
				obj.x = obj.startX + this.currentX - this.startX;
				obj.y = obj.startY + this.currentY - this.startY;
			}

			if (this.rotaterIsActive) {
				// get start angle
				var startAngle = this.getAngle(mover.rotater.x, mover.rotater.y + tangram.offsetTop, this.rotater.startPosiitionRotatePointX, this.rotater.startPosiitionRotatePointY);
				// get cur angle
				var currentAngle = this.getAngle(mover.rotater.x, mover.rotater.y + tangram.offsetTop, this.currentX, this.currentY);
				// get different of angles
				var dAngle = currentAngle - startAngle;
				// add different angle to object
				obj.angle = (this.rotater.startAngle + dAngle) || obj.angle;
			}

			obj.x = obj.x || 0;
			obj.y = obj.y || 0;
			obj.angle = obj.angle || 0;

			var style = info.preCSS + 'transform: translate(' + obj.x + 'px, ' + obj.y + 'px) rotate(' + obj.angle + 'deg)';
			obj.node.setAttribute('style', style);

		},
		initRotater: function(q) {

			var node = $('.js-rotater', main.wrapper);
			this.rotater = {
				node: node,
				originalSize: 120,
				x:0,
				y:0
			};

			node.style.width = this.rotater.originalSize * q + 'px';
			node.style.height = this.rotater.originalSize * q + 'px';
			node.style.marginTop = -this.rotater.originalSize * q / 2 + 'px';
			node.style.marginLeft = -this.rotater.originalSize * q / 2 + 'px';

			var rotaterOutBlock = {
				node: $('.js-rotater-out-block', node)
			};

			rotaterOutBlock.node.addEventListener(evt.down, function(e){

				mover.moverIsActive = true;
				tangram.setActiveObject(mover.activeObject.node);
				mover.showRotater(false);
				e.stopPropagation();
			}, false);

			rotaterOutBlock.node.addEventListener(evt.up, function(){
				tangram.testAnswer();
			}, false);


		},
		showRotater: function(show) {

			mover.rotaterIsActive = show;
			if (!show) {
				this.rotater.node.style.display = '';
				return;
			}

			var objectName = this.activeObject.node.getAttribute('figure-name');

			this.rotater.x = this.activeObject.x + figuresCode[objectName + 'Width'] / 2 * tangram.mainImage.q;
			this.rotater.y = this.activeObject.y + figuresCode[objectName + 'Height'] / 2 * tangram.mainImage.q;

			this.rotater.node.style.display = 'block';
			this.rotater.node.style[info.preJS + 'Transform'] = 'translate(' + this.rotater.x + 'px, ' + this.rotater.y + 'px)';

		}

	};

	var tangram = {
		figureList: ['B3A', 'B3A', 'M3A', 'S3A', 'S3A', 'SQR', 'TRP'],
		handleEvent: function() {

		},
		testAnswer: function() {
			var polygons = $$('.js-figure-container polygon');
			var answers = JSON.parse(JSON.stringify(this.figure.figureCoords));
			var that = this;
			var delta = 10;

			var goodAnswers = 0;

			mover.alignAngle();
			polygons.forEach(function(polygon){

				var style = polygon.getAttribute('style') || 'transform(0px, 0px) rotate(0deg)';
				style = style.match(/-?\d+|-?\d+\.\d+/gi);
				var coords = {
					x: parseInt(style[0], 10),
					y: parseInt(style[1], 10),
					angle: -parseInt(style[2], 10),
					type: polygon.getAttribute('figure-name')
				};

				$.createSimpleArray(0, answers.length - 1).forEach(function(i){

					if (coords.type !== answers[i][0]) {
						return;
					}

					// this answer was used?
					if (answers[i][4]) {
						return;
					}

					var isX, isY, isA;
					isX = Math.abs(coords.x + figuresCode[coords.type + 'Width'] / 2 * that.mainImage.q - (answers[i][1] * that.mainImage.q + that.mainImage.offsetX)) < delta;
					isY = Math.abs(coords.y + figuresCode[coords.type + 'Height'] / 2 * that.mainImage.q - (answers[i][2] * that.mainImage.q + that.mainImage.offsetY)) < delta;

					// get angle
					while (coords.angle < 0) {
						coords.angle += 360;
					}

					while (answers[i][3] < 0) {
						answers[i][3] += 360;
					}

					coords.angle = Math.round((coords.angle % figuresCode[coords.type + 'AngleStep']) / 45) * 45;
					answers[i][3] = answers[i][3] % figuresCode[coords.type + 'AngleStep'];
					isA = Math.abs(coords.angle - answers[i][3]) < delta;

					// is it good answer?
					if (isX && isY && isA && !answers[i][4]) {
						goodAnswers += 1;
						answers[i][4] = true;
					}

				});


			});

			console.log(goodAnswers + '/' + answers.length);

		},
		init: function(figure) {
			this.figure = figure;
			this.wrapper = $('.tangram-page', main.wrapper);
			this.wrapper.innerHTML = this.wrapper.innerHTML.replace('%figure%', this.figure.svg);

			var svg = $('svg', this.wrapper);
			svg.setAttribute('class', 'main-image js-main-image');

			this.mainImage = {
				svg: svg,
				original: {
					width: parseInt(svg.getAttribute('width'), 10),
					height: parseInt(svg.getAttribute('height'), 10)
				},
				current: {
					width: parseInt(svg.getAttribute('width'), 10),
					height: parseInt(svg.getAttribute('height'), 10)
				},
				offsetX: 0,
				offsetY: 0,
				q: 1
			};

			this.offsetTop = $('.status-bar').clientHeight;

			this.positionMainImage();
			this.createActiveFigures();
			this.addMoveListeners();
			mover.init();
			mover.initRotater(this.mainImage.q);

		},
		positionMainImage: function() {

			// resize image
			var img = this.mainImage;
			var svgAspectRatio = img.original.width / img.original.height;
			if (svgAspectRatio > info.screen.getAspectRatio()) {
				img.q = this.wrapper.clientWidth / img.original.width;
			} else {
				img.q = this.wrapper.clientHeight / img.original.height;
			}

			img.current.width = img.original.width * img.q;
			img.current.height = img.original.height * img.q;

			img.svg.setAttribute('width', img.current.width + 'px');
			img.svg.setAttribute('height', img.current.height + 'px');

			// position image
			img.offsetX = (this.wrapper.clientWidth - img.current.width) / 2;
			img.offsetY = (this.wrapper.clientHeight - img.current.height) / 2;
			img.svg.style.top = img.offsetY + 'px';
			img.svg.style.left = img.offsetX + 'px';

		},
		createPolygonsContainer: function() {
			var mainModel = {
				x: 0,
				y: 0,
				width: this.wrapper.clientWidth,
				height: this.wrapper.clientHeight,
				figures: '{{figures}}'
			};
			var html = '<svg class="figure-container js-figure-container" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="{{= x }}px" y="{{= y }}px" width="{{= width }}px" height="{{= height }}px" viewBox="{{= x }} {{= y }} {{= width }} {{= height }}" xml:space="preserve"><g>{{= figures }}</g></svg>';
			return viewer.template(html)(mainModel);
		},
		resizePolygon: function(polygonStr) {

			var that = this;
			var div = document.createElement('div');
			div.innerHTML = polygonStr;
			var polygon = $('polygon', div);
			var points = polygon.getAttribute('points');
			var arr = points.split(' ');
			arr.forEach(function(coupleNumber, index, array){
				var numbers = coupleNumber.split(',');
				numbers[0] = numbers[0] * that.mainImage.q;
				numbers[1] = numbers[1] * that.mainImage.q;
				array[index] = numbers.join(',');
			});
			polygon.setAttribute('points', arr.join(' '));
			return div.innerHTML;

		},
		createActiveFigures: function() {

			var that = this;

			var figuresModel = {
				fillColor: '0C0',
				strokeColor: '000'
			};

			var figuresStr = '';
			this.figureList.forEach(function(figureName){
				var polygon = viewer.template(figuresCode.template);
				// set figures color here
				figuresModel.points = figuresCode[figureName];
				figuresModel.figureName = figureName;
				polygon = polygon(figuresModel);
				polygon = that.resizePolygon(polygon);
				figuresStr += polygon;
			});

			this.wrapper.innerHTML += this.createPolygonsContainer().replace('{{figures}}', figuresStr);

			var polygons = $$('.js-figure-container polygon', this.wrapper);
			polygons.forEach(function(polygon){
				polygon.setAttribute('style', info.preCSS + 'transform: translate(0px, 0px) rotate(0deg)');
			});

		},
		setActiveObject: function(polygon) {

			polygon.setAttribute('class', 'active');

			mover.addObject(polygon);

		},
		addMoveListeners: function() {
			var that = this;
			this.polygons = $$('.js-figure-container polygon', this.wrapper);

			// polygons
			this.polygons.forEach(function(polygon){
				polygon.addEventListener(evt.down, function(e) {
					mover.moverIsActive = true;
					that.setActiveObject(polygon);
					mover.rotaterIsActive = false;
					e.stopPropagation();
				}, false);
				polygon.addEventListener(evt.up, function(e) {
					mover.moverIsActive = false;
					mover.showRotater(true);
					mover.rotaterIsActive = false;
					e.stopPropagation();
					that.testAnswer();
				}, false);
			});

			// main svg
			this.wrapper.addEventListener(evt.move, mover.move.bind(mover), false);
			this.wrapper.addEventListener(evt.down, function(){
				mover.moverIsActive = false;
				mover.showRotater(false);
				mover.activeObject.node.removeAttribute('class');
			}, false);
			this.wrapper.addEventListener(evt.up, this.testAnswer.bind(this), false);


			// rotater
			var rotater = $('.js-rotater', main.wrapper);

			rotater.addEventListener(evt.down, function(e){
				mover.rotater.startPosiitionRotatePointX = (e.pageX !== undefined) ? e.pageX : e.touches[0].pageX;
				mover.rotater.startPosiitionRotatePointY = (e.pageY !== undefined) ? e.pageY : e.touches[0].pageY;
				mover.rotater.startAngle = mover.activeObject.angle;
				mover.rotaterIsActive = true;
				e.stopPropagation();
			}, false);

			rotater.addEventListener(evt.move, mover.move.bind(mover), false);

			rotater.addEventListener(evt.up, function(e){
				mover.moverIsActive = false;
				mover.rotaterIsActive = false;
				that.testAnswer();
				e.stopPropagation();
			}, false);


		}

	};


	var figuresCode = {
		B3A: '50,100 0,50 50,0',
		B3AWidth: 50,
		B3AHeight: 100,
		B3AAngleStep: 360,

		M3A: '35.355,70.711 35.355,0 0,35.355',
		M3AWidth: 35.5,
		M3AHeight: 71.7,
		M3AAngleStep: 360,

		S3A: '0,25 25,50 25,0',
		S3AWidth: 25,
		S3AHeight: 50,
		S3AAngleStep: 360,

		SQR: '0,0 35.355,0 35.355,35.355 0,35.355',
		SQRWidth: 35.5,
		SQRHeight: 35.5,
		SQRAngleStep: 90,

		TRP: '0,50 0,0 25,25 25,75',
		TRPWidth: 25,
		TRPHeight: 75,
		TRPAngleStep: 180,

		TRPR: '0,25 0,75 25,50 25,0',

		template: '<polygon figure-name="{{= figureName }}" fill="#{{= fillColor }}" stroke="#{{= strokeColor }}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="{{= points }}"/>'
	};


	win.tangram = tangram;

	//win.addEventListener('load', tangram, false);

}(window));
