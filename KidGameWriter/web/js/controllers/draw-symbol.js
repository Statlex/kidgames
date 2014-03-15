(function (win, doc, docElem) {

	"use strict";
	/*global window, document, console, alert,   main, $, $$, setTimeout */

	var drawSymbol = {
		animationTime: 200,
		handleEvent: function() {

		},
		start: function() {
			this.wrapper = $('.jsSymbolContainer', main.wrapper);
			this.curSymbol = win.symbols.number['5'];

			this.wrapper.innerHTML = this.curSymbol.points;
			this.groups = $$('g', this.wrapper);

			this.markGroup();

			this.runAnimate();

		},
		markGroup: function() {
			this.groups.forEach(function(g, index){
				g.setAttribute('data-group-index', index);
			});
		},
		runAnimate: function() {

			var that = this,
				startIndex = 0;
			this.groups.forEach(function(g, gIndex){
				var previousGroup, polygons;
				if (gIndex) {
					previousGroup = $$('*', that.groups[gIndex -1]);
					startIndex += previousGroup.length;
				}

				polygons = $$('*', g);
				polygons.forEach(function(polygon, pIndex){
					setTimeout(function() {
						that.upGroupByPolygon(this);
						this.setAttribute('fill', '#' + gIndex * 4 + gIndex * 4 + gIndex * 4 );
					}.bind(polygon), (pIndex + startIndex) * that.animationTime);
				});

			});

		},
		upGroupByPolygon: function(polygon) {
			var group = polygon.parentNode;
			group.parentNode.appendChild(group);
		}

	};

	win.drawSymbol = drawSymbol;

}(window, document, document.documentElement));
