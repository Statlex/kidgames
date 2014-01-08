(function (win) {

	"use strict";
	/*global window, document, console, alert */

	var tg;

	tg = {
		figureList: ['B3A', 'B3A', 'M3A', 'S3A', 'S3A', 'SQR', 'TRP'],
		fillColor: '#0C0',
		strokeColor: '#000',
		start: function () {
			/**
			 * flow
			 * -1 - add question figure - done
			 * 0 - get and set scale q - done
			 * 1 - create svg with active polygons, append this one - done
			 * 2 - add event listeners to polygons - not done
			 *
			 * */

			var questionFigureSVG = win.categories.animal_1.svg;

			var wrapper = $('.page', main.wrapper);

			var w = info.screen.getWidth();
			var h = info.screen.getHeight();

			// -1 begin
			wrapper.setAttribute('style', "background-image: url(\"data:image/svg+xml;utf8," + questionFigureSVG + "\");");
			// -1 end

			// 0 begin
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
			// 0 end

			// 1 begin
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
						.replace('{{className}}', 'polygon-' + figureName)
						.replace('{{points}}', points);

				});
				tempNode.innerHTML = tempNode.innerHTML.replace('{{figures}}', figuresStr);
				var svg = $('svg', tempNode);
				wrapper.appendChild(svg);
			}());
			// 1 end

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

		template: '<polygon class="{{className}}" figure-name="{{figureName}}" fill="{{fillColor}}" stroke="{{strokeColor}}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="{{points}}"/>'

	};


	win.tangram = tg;

}(window));
