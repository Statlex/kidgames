(function (win) {

	"use strict";
	/*global window, document, console, alert,   main, $, $$, setTimeout, info */

	win.drawSymbol = {
		animationTime: 100,
		handleEvent: function () {

		},
		start: function () {
			this.wrapper = $('.jsSymbolContainer', main.wrapper);
			this.curSymbol = win.symbols.number['1'];

			this.wrapper.innerHTML = this.curSymbol.points;
			this.groups = $$('g', this.wrapper);
			this.polygons = $$('svg g *', this.wrapper);

			this.markGroupsAndPolygons();
			this.addEventListeners();
			this.runAnimation();

		},
		markGroupsAndPolygons: function () {
			this.groups.forEach(function (g, index) {
				g.setAttribute('data-group-index', index);
				var polygons = $$('*', g);
				polygons.forEach(function (polygon, pIndex) {
					polygon.setAttribute('data-group-number', index);
					polygon.setAttribute('data-polygon-number', pIndex);
				});
				polygons[polygons.length - 1].setAttribute('data-is-last-polygon', '1');
			});
		},
		addEventListeners: function () {

			var that = this;

			this.polygons.forEach(function (p) {
				p.addEventListener(info.evt.down, function () {
					var pIndex = +this.getAttribute('data-polygon-number'),
						gIndex = +this.getAttribute('data-group-number'),
						isDisablePolygon = this.getAttribute('data-is-disable-polygon');

					if (isDisablePolygon) {
						console.log('this is disable polygon');
						return;
					}

					if (pIndex !== 0) {
						console.log('this is not started point');
						return;
					}

					info.svgInfo = {
						pIndex: pIndex,
						gIndex: gIndex
					};

					this.setAttribute('fill', '#c00');

				}, true);

				p.addEventListener(info.evt.move, function () {
					var pIndex = +this.getAttribute('data-polygon-number'),
						gIndex = +this.getAttribute('data-group-number'),
						isDisablePolygon = this.getAttribute('data-is-disable-polygon'),
						isLastPolygon = this.getAttribute('data-is-last-polygon');

					if (isDisablePolygon) {
//						console.log('this is disable polygon');
						return;
					}

					if (pIndex === 0) {
//						console.log('this is started point');
						return;
					}

					if (gIndex !== (info.svgInfo && info.svgInfo.gIndex)) {
//						console.log('this is not current group');
						return;
					}

					if (pIndex !== (info.svgInfo.pIndex + 1)) {
//						console.log('is not next point');
						return;
					}

					info.svgInfo = {
						pIndex: pIndex,
						gIndex: gIndex
					};

					this.setAttribute('fill', '#c00');

					console.log(pIndex);

					if (isLastPolygon) {
						console.log('group is done');
						that.disableGroupByPolygon(this);

						if (that.symbolIsDone()) {
							console.log('done :)');
						} else {
							console.log('not done :)');
						}

					}

				}, true);

			});
		},
		symbolIsDone: function() {
			var isDone = true;
			this.groups.forEach(function(g){
				isDone = isDone ? g.getAttribute('data-is-disable-group') : isDone;
			});
			return isDone;
		},
		disableGroupByPolygon: function (polygon) {
			var group = polygon.parentNode,
				polygons = $$('*', group),
				groupIndex;

			polygons.forEach(function (p) {
				p.setAttribute('data-is-disable-polygon', '1');
			});
			group.setAttribute('data-is-disable-group', '1');
			groupIndex = +group.getAttribute('data-group-index');
			group.setAttribute('data-default-group-index', groupIndex);
			groupIndex -= 1000;
			group.setAttribute('data-group-index', groupIndex);

			this.downGroupByGroup(group);

		},
		downGroupByGroup: function (group) {
			if (this.groups.length === 1) {
				return;
			}
			var svg = group.parentNode,
				firstGroup = $('g', svg);
			svg.insertBefore(group, firstGroup);
		},
		runAnimation: function () {

			var that = this,
				startIndex = 0;

			this.groups.forEach(function (g, gIndex) {
				var previousGroup, polygons;

				if (gIndex) { // if gIndex > 0
					previousGroup = $$('*', that.groups[gIndex - 1]);
					startIndex += previousGroup.length;
				}

				polygons = $$('*', g);
				polygons.forEach(function (polygon, pIndex) {
					setTimeout(function (i) {
						if (!i) { // if i !== 0
							that.upGroupByPolygon(this);
						}
						this.setAttribute('fill', '#' + gIndex * 7 + gIndex * 7 + gIndex * 7);
					}.bind(polygon, pIndex), (pIndex + startIndex) * that.animationTime);
				});

			});

			setTimeout(this.setDefaultGroupState.bind(this), (this.polygons.length + 1) * this.animationTime);

		},
		upGroupByPolygon: function (polygon) {
			var group = polygon.parentNode;
			group.parentNode.appendChild(group);
		},
		setDefaultGroupState: function () {
			this.groups.sort(function (a, b) {
				return +b.getAttribute('data-group-index') - +a.getAttribute('data-group-index');
			});
			this.groups.forEach(function (group) {
				group.parentNode.appendChild(group);
			});
		}

	};


}(window));
