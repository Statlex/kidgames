(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global Backbone, $, info, APP, Calendar, cycleMaster */

	win.GC = win.GC || {};

	win.GC.TitleView = Backbone.View.extend({
		el: '.js-title-view',
		selectors: {
			'click .js-to-calendar': 'toHome',
			'click .js-setting': 'setting'
		},
		initialize: function () {

			//$(win).on('resize', this.show.bind(this));

			var selectors = this.selectors,
				eventName, selector, key, onArr;
			for (key in selectors) {
				if (selectors.hasOwnProperty(key)) {
					onArr = key.split(' ');
					eventName = onArr[0];
					selector = onArr[1];
					this.$el.on(eventName, selector, this[selectors[key]].bind(this));
				}
			}

		},
		toHome: function () {
			APP.router.navigate('', {trigger: true});
		},
		setting: function() {
			APP.window.show('settings');
		},
		show: function () {

			var mainStateWrapper = $('.js-main-state-wrapper'),
				mainStateNode = this.createMainState(),
				date = new Date(),
				dayState = cycleMaster.scanDay({
					getStateOnly: true,
					date: [date.getDate(), date.getMonth(), date.getFullYear()].join('-')
				});
			mainStateWrapper.empty();
			mainStateWrapper.append(mainStateNode);

			this.$el.show();

			// detect 'start cycle' or 'end flow' or 'remove cycle'

			$('.js-start-tracking-button').off().on('click', this.showDatePicker.bind(this));
			$('.js-start-tracking-button.js-bottom-button').html('tracking ' + dayState.state + ' tracking');

		},
		showDatePicker: function() {

			APP.closeDatePicker();
			APP.datePicher = new GC.DatePicherView();
			APP.datePicher.show();

		},
		hide: function () {

			this.$el.hide();

		},

		createMainState: function () {

			// create circle wrapper
			var util, screenInfo, mainNode;
			util = $().util;
			screenInfo = util.screen();
			mainNode = $('<div class="main-state"></div>').css({
				width: screenInfo.smallestSide + 'px',
				height: screenInfo.smallestSide + 'px',
				top: (screenInfo.height - screenInfo.smallestSide) / 2 + 'px',
				left: (screenInfo.width - screenInfo.smallestSide) / 2 + 'px'
			});

			// create button
			var button;
			button = $('<div class="main-button js-start-tracking-button"></div>');
			mainNode.append(button);

			// create cycle's days
			var svgStr, svg, ii, ll, paths, halfSize, sectorAngle, cycleLength, angle1, angle2;
			svgStr = '<svg class="cycle-days-wrapper" x="0px" y="0px" width="' + screenInfo.smallestSide + 'px" height="' + screenInfo.smallestSide + 'px" viewBox="0 0 ' + screenInfo.smallestSide + ' ' + screenInfo.smallestSide + '" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">{{paths}}</svg>';
			paths = '';
			halfSize = screenInfo.smallestSide / 2;
			cycleLength = info.get('cycleLength');
			sectorAngle = 2 * Math.PI / cycleLength;
			for (ii = 0, ll = cycleLength; ii < ll; ii += 1) {
				angle1 = -(Math.PI + ii * sectorAngle) - Math.PI / 1000;
				angle2 = -(Math.PI + (ii + 1) * sectorAngle) + Math.PI / 1000;
				paths += this.createSVGDay(halfSize, halfSize, angle1, angle2, halfSize * 0.64, halfSize * 0.78, ii);
			}
			svg = $(svgStr.replace('{{paths}}', paths));
			mainNode.append(svg);

			// add coloring

			// detect cycles
			var cycles, lastCycle, lastDate, date, now, different;
			cycles = info.get('cycles') || [];


			// detect cycles is > 1
			if (cycles.length) {
				lastCycle = cycles[cycles.length - 1];

				lastDate = lastCycle.startCycle;
				date = new Date();
				now = {
					date: date.getDate(),
					month: date.getMonth(),
					year: date.getFullYear()
				};

				different = Calendar.prototype.getDifferent(now, lastDate) - info.get('cycleLength');

				if (different <= 0) {
					// no delayed


						var cycle = lastCycle,
							dateMap = JSON.parse(JSON.stringify(info.dateMap)),
							cycleLength = info.get('cycleLength'),
							calendar = new Calendar(),
							dateMapDifferent, halfOfMapDifferent,
							dateNodes = $('.js-title-cycle-date', mainNode);

						// detect end of flow
						if (cycle.endFlow.str) {
							dateMapDifferent = dateMap.flow - calendar.getDifferent(cycle.endFlow, cycle.startCycle) - 1;
							dateMap.flow -= dateMapDifferent;
							dateMap.safe_1 += dateMapDifferent;
						}

						if (cycleLength !== 28) {
							dateMapDifferent = cycleLength - 28;
							halfOfMapDifferent = Math.floor(dateMapDifferent / 2);
							dateMap.unsafe_1 += halfOfMapDifferent;
							dateMap.unsafe_2 += halfOfMapDifferent;
							if (halfOfMapDifferent * 2 < dateMapDifferent) {
								dateMap.unsafe_2 += 1;
							}
						}

						var key, dateNodeIndex = 0, className;


						for (key in dateMap) {
							if (dateMap.hasOwnProperty(key)) {
								for (ii = 0, ll = dateMap[key]; ii < ll; ii += 1) {
									className = dateNodes[dateNodeIndex].getAttribute('class');
									className += ' ' + (dateNodeIndex ? key.toString().replace(/_\d/gi, '') : 'start-flow');
									dateNodes[dateNodeIndex].setAttribute('class', className);
									dateNodeIndex += 1;
								}
							}
						}



						// detect current date
						var number = calendar.getDifferent(now, cycle.startCycle);
						className = dateNodes[number].getAttribute('class');
						dateNodes[number].setAttribute('class', className + ' current-day');

						// rotate circle arrow
						var mainButton, angle, singleDayAngle;
						mainButton = $('.js-start-tracking-button', mainNode);
						singleDayAngle = 360 / cycleLength;
						angle = singleDayAngle * (number + 0.5);
						mainButton.css(util.vendorPrefix.css + 'transform', 'rotate(' + angle + 'deg)');

					//return;
				} else {
					console.log('you have delayed ' + different);
				}


			} else {
				// user have no any cycles
				console.log('you have no cycles, start new cycles?');
			}

			return mainNode;

		},
//		createSVGDay: function(x, y, angle1, angle2, r1, r2, data) {
//
//			var path = '<path d="{{d}}" fill="none" stroke="#000" stroke-width="1" data-data="' + data + '"/>',
//				d = {},
//				dStr;
//
//			d.x1 = x + Math.sin(angle1) * r1;
//			d.y1 = y + Math.cos(angle1) * r1;
//
//			d.x2 = x + Math.sin(angle1) * r2;
//			d.y2 = y + Math.cos(angle1) * r2;
//
//			d.x3 = x + Math.sin(angle2) * r2;
//			d.y3 = y + Math.cos(angle2) * r2;
//
//			d.x4 = x + Math.sin(angle2) * r1;
//			d.y4 = y + Math.cos(angle2) * r1;
//
//			dStr = 'M ' + d.x1 + ',' + d.y1 + ' L' + d.x2 + ',' + d.y2 + ' L' + d.x3 + ',' + d.y3 + ' L' + d.x4 + ',' + d.y4 + ' z';
//
//			path = path.replace('{{d}}', dStr);
//
//			return path;
//
//		},
		createSVGDay: function (x, y, angle1, angle2, r1, r2, data) {

			var path = '<path class="js-title-cycle-date title-cycle-date" d="{{d}}" fill="none" stroke="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-data="' + data + '"/>',
				d = {},
				dStr;

			d.x1 = x + Math.sin(angle1) * r1;
			d.y1 = y + Math.cos(angle1) * r1;
			dStr = 'M ' + d.x1 + ',' + d.y1;

			d.x2 = x + Math.sin(angle1) * r2;
			d.y2 = y + Math.cos(angle1) * r2;
			dStr += ' L' + d.x2 + ',' + d.y2;

			d.x3 = x + Math.sin(angle2) * r2;
			d.y3 = y + Math.cos(angle2) * r2;
			dStr += ' A' + [' ', r1, r1, 1, 0, 1, d.x3, d.y3].join(' ');

			d.x4 = x + Math.sin(angle2) * r1;
			d.y4 = y + Math.cos(angle2) * r1;
			dStr += ' L' + d.x4 + ',' + d.y4;

			dStr += ' A' + [' ', r1, r1, 1, 0, 0, d.x1, d.y1].join(' ');

			dStr += 'z';

			path = path.replace('{{d}}', dStr);

			return path;

		}

	});

}(window, document, document.documentElement));