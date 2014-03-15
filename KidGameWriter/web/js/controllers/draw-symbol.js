(function (win) {

	"use strict";
	/*global window, document, console, alert,   main, $, $$, setTimeout, info */

	win.drawSymbol = {
		animationTime: 100,
		handleEvent: function() {

		},
		start: function() {
			this.wrapper = $('.jsSymbolContainer', main.wrapper);
			this.curSymbol = win.symbols.number['5'];

			this.wrapper.innerHTML = this.curSymbol.points;
			this.groups = $$('g', this.wrapper);
			this.polygons = $$('svg g *', this.wrapper);

			this.markGroupsAndPolygons();
			this.addEventListeners();
			this.runAnimation();

		},
		markGroupsAndPolygons: function() {
			this.groups.forEach(function(g, index){
				g.setAttribute('data-group-index', index);
				$$('*', g).forEach(function(polygon, pIndex){
					polygon.setAttribute('data-group-number', index);
					polygon.setAttribute('data-polygon-number', pIndex);
				});
			});
		},
		addEventListeners: function(){
			var that = this;
			this.polygons.forEach(function(p){
				p.addEventListener(info.evt.down, function(){
					var pIndex = +p.getAttribute('data-polygon-number'),
						gIndex = +p.getAttribute('data-group-number');

					if (pIndex !== 0) {
						console.log('this is not started point');
						return;
					}



				}, false);
			});
		},
		runAnimation: function() {

			var that = this,
				startIndex = 0;

			this.groups.forEach(function(g, gIndex){
				var previousGroup, polygons;

				if (gIndex) { // if gIndex > 0
					previousGroup = $$('*', that.groups[gIndex -1]);
					startIndex += previousGroup.length;
				}

				polygons = $$('*', g);
				polygons.forEach(function(polygon, pIndex){
					setTimeout(function(i) {
						if (!i) { // if i !== 0
							that.upGroupByPolygon(this);
						}
						this.setAttribute('fill', '#' + gIndex * 7 + gIndex * 7 + gIndex * 7 );
					}.bind(polygon, pIndex), (pIndex + startIndex) * that.animationTime);
				});

			});

			setTimeout(this.setDefaultGroupState.bind(this), (this.polygons.length + 1) * this.animationTime);

		},
		upGroupByPolygon: function(polygon) {
			var group = polygon.parentNode;
			group.parentNode.appendChild(group);
		},
		setDefaultGroupState: function() {
			this.groups.sort(function(a, b){
				return +b.getAttribute('data-group-index') - +a.getAttribute('data-group-index');
			});
			this.groups.forEach(function(group){
				group.parentNode.appendChild(group);
			});
		}

	};


}(window));
