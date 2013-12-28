(function (win) {

	"use strict";
	/*global window, document */

	var tangram;
	tangram = {
		figureList: ['B3A', 'B3A', 'M3A', 'S3A', 'S3A', 'SQR', 'TRP'],
		handleEvent: function() {

		},
		init: function() {

			this.wrapper = $('#wrapper .page');
			this.mainImage = $('svg', this.wrapper);
			this.mainImage.setAttribute('class', 'main-image js-main-image');
			this.mainImageWidth = this.mainImage.getAttribute('width');
			this.mainImageHeight = this.mainImage.getAttribute('height');
			this.resizeMainImage(this.mainImage, 1);
			this.createActiveFigures(1);

		},
		resizeMainImage: function(svg, q) {

			var re = /\d+|\d+\.\d+/gi;
			var svgAttributes = ['x', 'y', 'width', 'height'];
			svgAttributes.forEach(function(attr){
				var svgAttr = svg.getAttribute(attr);
				svgAttr = svgAttr.match(re)[0];
				svgAttr = svgAttr * q + 'px';
				svg.setAttribute(attr, svgAttr);
			});

		},
		createActiveFigures: function(q) {

			var mainModel = {
				x: 0,
				y: 0,
				width: this.wrapper.clientWidth,
				height: this.wrapper.clientHeight,
				figures: '{{figures}}'
			};

			// get svg
			var html = viewer.templates['tangram-figures-wrapper'].html;
			// add svg for figures to field
			var mainSVG = viewer.template(html)(mainModel);

			var figuresModel = {
				fillColor: '0C0',
				strokeColor: '000'
			};

			var figuresStr = '';

			this.figureList.forEach(function(figureName){
				var polygon = viewer.template(figuresCode.template);
				// set figures color here

				figuresModel.points = figuresCode[figureName];
				polygon = polygon(figuresModel);
				// resize figures here

				figuresStr += polygon;
			});

			mainSVG = mainSVG.replace('{{figures}}', figuresStr);
			this.wrapper.innerHTML += mainSVG;

		}


	};

	var figuresCode = {
		B3A: '50,100 0,50 50,0',
		M3A: '35.355,70.711 35.355,0 0,35.355',
		S3A: '0,25 25,50 25,0',
		SQR: '0,0 35.355,0 35.355,35.355 0,35.355',
		TRP: '0,50 0,0 25,25 25,75',
		TRPR: '0,25 0,75 25,50 25,0',
		template: '<polygon fill="#{{= fillColor }}" stroke="#{{= strokeColor }}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="{{= points }}"/>'
	};


	win.tangram = tangram;

	//win.addEventListener('load', tangram, false);

}(window));
