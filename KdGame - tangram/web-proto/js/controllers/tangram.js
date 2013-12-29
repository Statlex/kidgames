(function (win) {

	"use strict";
	/*global window, document */

	var preJS = 'webkit';
	var preCSS = 'webkit';

	var isTouch = document.documentElement.hasOwnProperty('ontouchstart');

	var evt = {
		down: isTouch ? 'touchstart' : 'mousedown',
		move: isTouch ? 'touchmove' : 'mousemove',
		up: isTouch ? 'touchend' : 'mouseup',
		out: isTouch ? 'touchcancel' : 'mouseout'
	};


	var mover = {
		addObject: function(polygon) {
			this.isActive = true;
			this.activeObject = {
				node: polygon,
				startX: 0,
				startY: 0,
				angle: 0
			};

			this.startX = event.pageX || event.touches[0].pageX;
			this.startY = event.pageY || event.touches[0].pageY;

			// get start position
			this.setStartActiveObjectPosition();

			// go on top
			polygon.parentNode.appendChild(polygon.parentNode.removeChild(polygon));

		},
		move: function(){
			if (!this.isActive) {
				return;
			}
			this.currentX = event.pageX || event.touches[0].pageX;
			this.currentY = event.pageY || event.touches[0].pageY;

			var obj = this.activeObject;
			var style = info.preCSS + 'transform: translate(' + (obj.startX + this.currentX - this.startX) + 'px, ' + (obj.startY + this.currentY - this.startY) + 'px) rotate(' + obj.angle + 'deg)';
			obj.node.setAttribute('style', style);

		},
		setStartActiveObjectPosition: function() {

			var obj = this.activeObject;
			var style = obj.node.getAttribute('style') || 'transform(0px, 0px) rotate(0deg)';
			console.log(style);
			style = style.match(/\d+|\d+\.\d+/gi);
			obj.startX = parseInt(style[0], 10);
			obj.startY = parseInt(style[1], 10);
			obj.angle = parseInt(style[2], 10);


		}




	};

	var tangram = {
		figureList: ['B3A', 'B3A', 'M3A', 'S3A', 'S3A', 'SQR', 'TRP'],
		handleEvent: function() {

		},
		init: function() {

			this.wrapper = $('#wrapper .tangram-page');
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

			this.positionMainImage();
			this.createActiveFigures();
			this.addMoveListeners();


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

		},
		setActiveObject: function(polygon) {

			if (!polygon) {
				if (this.activePolygin) {
					this.activePolygin.removeAttribute('class');
				}
				mover.isActive = false;
				return;
			}

			this.activePolygin = polygon;
			this.activePolygin.setAttribute('class', 'active');

			mover.addObject(polygon);

		},
		addMoveListeners: function() {
			var that = this;
			this.polygons = $$('.js-figure-container polygon', this.wrapper);
			this.polygons.forEach(function(polygon){
				polygon.addEventListener(evt.down, that.setActiveObject.bind(that, polygon),false);
			});

			this.wrapper.addEventListener(evt.move, mover.move.bind(mover), false);
			this.wrapper.addEventListener(evt.up, this.setActiveObject.bind(this, false), false);
			this.wrapper.addEventListener('touchcancel', this.setActiveObject.bind(this, false), false);

		}

	};


	var figuresCode = {
		B3A: '50,100 0,50 50,0',
		M3A: '35.355,70.711 35.355,0 0,35.355',
		S3A: '0,25 25,50 25,0',
		SQR: '0,0 35.355,0 35.355,35.355 0,35.355',
		TRP: '0,50 0,0 25,25 25,75',
		TRPR: '0,25 0,75 25,50 25,0',
		template: '<polygon figure-name="{{= figureName }}" fill="#{{= fillColor }}" stroke="#{{= strokeColor }}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="{{= points }}"/>'
	};


	win.tangram = tangram;

	//win.addEventListener('load', tangram, false);

}(window));
