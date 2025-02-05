(function (win, doc, docElem) {

	"use strict";
	/*global window, document, console, alert, setTimeout, $, $$, statusBar, main, symbols, info, viewer, player, lang */

	var log = console.log.bind(console);

	function Group(index, pointsArray) {

		this.index = index;
		this.isActive = false;

		this.points = pointsArray;
		// init group
		this.createPoints();

	}

	function Point(index, xy) {

		var mainObj = symbol;

		this.index = index;
		this.isActive = true;

		this.x = xy.x * mainObj.svg.scale + mainObj.svg.offset.left;
		this.y = xy.y * mainObj.svg.scale + mainObj.svg.offset.top;

	}

	Group.prototype.createPoints = function () {
		this.points.forEach(function (xy, index, arr) {
			arr[index] = new Point(index, xy);
		}, this);
	};

	Group.prototype.deactivate = function() {
		this.isActive = false;
		this.points.forEach(function(point){
			var zIndex = +point.node.style.zIndex - 1000;
			point.node.style.zIndex = zIndex;

		});
	};

	Group.prototype.clear = function() {
		this.points.forEach(function(point){
			point.clear();
		});

		delete this.points;

	};

	Group.prototype.hasDeactivePoint = function() {
		var i, len;
		for (i = 0, len = this.points.length; i < len; i += 1) {
			if (!this.points[i].isActive) {
				return true;
			}
		}
		return false;
	};

	Group.prototype.hasActivePoint = function() {
		var i, len;
		for (i = 0, len = this.points.length; i < len; i += 1) {
			if (this.points[i].isActive) {
				return true;
			}
		}
		return false;
	};

	Group.prototype.activatePoints = function() {

		this.points.forEach(function(point){
			point.activate();
		});

	};

	Point.prototype.addNode = function (node) {
		this.node = node;
		node.style.backgroundColor = this.currentColor;
		this.nodeSatelite = node.cloneNode();
		this.nodeSatelite.style.zIndex = 1;
		symbol.viewport.node.appendChild(this.nodeSatelite);
	};

	Point.prototype.defaultSize = 10;

	Point.prototype.colors = ['#eb5d46', '#86ea94', '#e7db26', '#965db5', '#8abbff', '#82ece1', '#ec82cf', '#eca082', '#c0c0c0'];

	Point.prototype.currentColor = '#eb5d46';

	Point.prototype.setColor = function() {
		this.colors = $.shuffle(this.colors);
		this.currentColor = this.colors[3];
	};

	Point.prototype.size = 10;

	Point.prototype.getPathLength = function (x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	};

	Point.prototype.isCoordinateInPoint = function (x, y) {
		return this.getPathLength(this.x, this.y, x, y) < this.size * 2; // this.size / 2 * 4 (4 is scale)
	};

	Point.prototype.deactivate = function() {

		if (!this.isActive) {
			return;
		}

		this.isActive = false;

		// add light to node's color
		var rgb = this.currentColor.match(/\w{2}/gi);
		rgb.forEach(function(component, index, arr){
			var value = parseInt(component, 16) + 50;
			arr[index] = (value > 255) ? 255 : value;
		});

		this.node.style.backgroundColor = 'rgb(' + rgb.join(',') + ')';

		$.addClass(this.node, 'bigFlash');

	};

	Point.prototype.activate = function() {
		if (this.isActive) {
			return;
		}
		this.isActive = true;
		// remove light to node's color
		this.node.style.backgroundColor = this.currentColor;
		this.node.innerHTML = '';
		$.removeClass(this.node, 'bigFlash');
	};

	Point.prototype.clear = function() {
		delete this.node;
	};

	Point.prototype.flash = function() {
		if (!this.node) {
			return false;
		}

		$.addClass(this.node, 'flash');
		return true;
	};

	var symbol = {
		pointSize: 10,
		pointStep: 16,
		animationTime: 100,
		handleEvent: function () {

		},
		start: function () {

			Point.prototype.setColor();

			this.getData();
			this.playSymbol();
			this.createGroups();
			this.createPointsNode();
			this.createEventHunter();
//			this.showAction();
			this.prepareCard();
			log(this);

			setTimeout(this.showAction.bind(this), 1000);

			player.playQuestionAgain = viewer.refresh.bind(viewer);

		},
		playSymbol: function() {
			var src, index;
			if (this.symbol.type === 'number') {
				src = this.symbol.type + '/' + info.lang + '/' + this.symbol.symbol + '.mp3';
			}
			if (this.symbol.type === 'letter') {
				// get index of letter
				index = lang[info.lang].alphabet.indexOf(this.symbol.symbol.toLowerCase());
				src = 'alphabet/' + info.lang + '/' + index + '.mp3';
			}
			player.play(src);
		},
		prepareCard: function() {

			var cardNode = $('.symbol-card', main.wrapper),
				cardWrapper = $('.symbol-card-wrapper', main.wrapper),
				height = main.wrapper.clientHeight - 60,
				style = cardNode.style,
				that = this;

			style.lineHeight = height * 0.95 / 4 + 'px';
			style.fontSize = height * 0.95 / 4 + 'px';

			cardWrapper.addEventListener(info.evt.up, function() {
				if (!info.evt.isClick()) {
					return;
				}
				that.startWithRandomSymbol();
			}, false);

			this.card = {
				node: cardNode,
				cardWrapper: cardWrapper
			};

		},
		startWithRandomSymbol: function() {
			// create symbols arrays
			var letters = [],
				letter;
			letters = letters.concat(lang[info.lang].alphabet, lang[info.lang].alphabet, '0','1','2','3','4','5','6','7','8','9');
			letters.shift();

			// get random letter
			letters = $.shuffle(letters);
			letter = letters[5];

			// create upper case
			if (Math.random() > 0.6) {
				letter = letter.toUpperCase();
			}

			// set symbol to info
			info.set('current-symbol', letter);

			// clear all setTimeouts
			main.clearIntervals();

			// refresh page with new symbol
			player.playQuestionAgain();

		},
		getData: function () {

			this.symbol = info.get('current-symbol');
			if ((/\d/).test(this.symbol)) {
				this.symbol = {
					svg: symbols.number[this.symbol].toString(),
					symbol: this.symbol,
					type: 'number'
				};
			} else {
				this.symbol = {
					svg: symbols['letters_' + info.lang][this.symbol].toString(),
					symbol: this.symbol,
					type: 'letter'
				};
			}

			// get and set all coordinates and size
			this.coordinates = {
				offsetTop: statusBar.wrapper.clientHeight,
				offsetLeft: 0,
				x: 0,
				y: 0
			};

			var viewportNode = $('.symbol-page', main.wrapper),
				svg;
			this.viewport = {
				node: viewportNode,
				width: viewportNode.clientWidth, // add reduce by padding
				height: viewportNode.clientHeight // -"-
			};
			this.viewport.aspectRatio = this.viewport.width / this.viewport.height;

			svg = {
				original: {
					width: 600,
					height: 600
				},
				offset: {
					top: 0,
					left: 0
				},
				svgAspectRatio: 1
			};

			if (svg.svgAspectRatio > this.viewport.aspectRatio) {
				svg.scale = this.viewport.width / svg.original.width;
			} else {
				svg.scale = this.viewport.height / svg.original.height;
			}

			svg.width = svg.original.width * svg.scale;
			svg.height = svg.original.height * svg.scale;

			svg.offset.left = (this.viewport.width - svg.width) / 2;
			svg.offset.top = (this.viewport.height - svg.height) / 2;

			Point.prototype.size = this.pointSize;

			this.svg = svg;

		},
		getSmallestScreenSide: function() {
			var w = info.screen.getWidth(),
				h = info.screen.getHeight();
			return (w < h) ? w : h;
		},
		createGroups: function () {

			// clear groups
			if (this.groups) {
				this.groups.forEach(function(group){
					group.clear();
				});
			}

			// create points
			this.createPointsFromSVG();

			// create groups
			this.groups = [];
			this.symbol.points.forEach(function (g, index) {
				var group = new Group(index, g);
				this.groups.push(group);
			}, this);

			// activate first group
			this.groups[0].isActive = true;
			this.activeGroup = this.groups[0];

		},
		createPointsFromSVG: function() {
			this.symbol.points = [];
			var node = doc.createElement('div'),
				polygons;
			node.innerHTML = this.symbol.svg;
			polygons = $$('polyline, path, line', node);
			polygons.forEach(function(poly){
				var step = this.pointStep,
					length = poly.getTotalLength(),
					distance = 0,
					points = [],
					xy;
				length += (length > step) ? 0 : step;
				while (distance < length) {
					xy = poly.getPointAtLength(distance);
					points.push({
						x: parseInt(xy.x, 10),
						y: parseInt(xy.y, 10)
					});
					distance += step;
				}
				this.symbol.points.push(points);
			}, this);
		},
		createPointsNode: function () {
			this.groups.forEach(function (group) {
				group.points.forEach(function (point) {
					var node = doc.createElement('div'),
						style = node.style;
					node.className = 'point';
					style.left = point.x - point.size / 2 + 'px';
					style.top = point.y - point.size / 2 + 'px';
					style.zIndex = -group.index;
					style.width = point.size + 'px';
					style.height = point.size + 'px';
					this.viewport.node.appendChild(node);
					point.addNode(node);
				}, this);
			}, this);
		},
		createEventHunter: function () {
			var node = doc.createElement('div'),
				that = this;
			node.className = 'event-hunter';

			node.addEventListener(info.evt.down, function () {

				that.coordinates.x = info.evt.touchMove.x - that.coordinates.offsetLeft;
				that.coordinates.y = info.evt.touchMove.y - that.coordinates.offsetTop;

				// find point in activeGroup
				var firstPoint = that.activeGroup.points[0];

				if (!firstPoint.isCoordinateInPoint(that.coordinates.x, that.coordinates.y)) {
					log('touch is not in first point');
					//return;
				}

				if (!firstPoint.isActive) {
					log('first points is not active');
					return;
				}

				firstPoint.deactivate();

			}, false);

			node.addEventListener(info.evt.move, function () {

				if (!info.evt.isActive) {
					return;
				}

				that.coordinates.x = info.evt.touchMove.x - that.coordinates.offsetLeft;
				that.coordinates.y = info.evt.touchMove.y - that.coordinates.offsetTop;
				var activePoint = that.getActivePoint(that.coordinates.x, that.coordinates.y),
					nextActiveGroup;

				if (!activePoint) {
					log('active point was not found');
					return;
				}

				if (!activePoint.isActive) {
					log('active points is not active');
					return;
				}

				if (!activePoint.index) { // activePoint.index === 0
					log('this is first point');
					return;
				}

				if (that.activeGroup.points[activePoint.index - 1].isActive) {
					log('previous point is passed');
					return;
				}

				activePoint.deactivate();

				// try to deactivate group
				if (that.activeGroup.points.length === (activePoint.index + 1)) {
					that.activeGroup.deactivate();

					// try to activate next group
					nextActiveGroup = that.groups[that.activeGroup.index + 1];
					if (nextActiveGroup) {
						that.activeGroup = nextActiveGroup;
						that.activeGroup.isActive = true;
					} else {
						setTimeout(that.done.bind(that), 1500);
					}

				}

			}, false);

			node.addEventListener(info.evt.up, function(){

				if (that.activeGroup.hasActivePoint() && that.activeGroup.hasDeactivePoint()) {
					// activate all points
					that.activeGroup.activatePoints();
				}

			}, false);

			this.viewport.node.appendChild(node);

		},
		done: function() {
			if (!$('.symbol-page', main.wrapper)) {
				return;
			}

			var svg, paths,
				attributs = {
					'fill': 'none',
					'stroke': '#000000',
					'stroke-width': '20',
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round',
					'stroke-miterlimit': '10'
				},
				tempNode = doc.createElement('div');

			tempNode.innerHTML = this.symbol.svg;
			svg = tempNode.querySelector('svg');
			svg.setAttribute('width', this.svg.original.width);
			svg.setAttribute('height', this.svg.original.height);
			svg.setAttribute('viewBox', '0 0 600 600');

			svg.setAttribute('class', 'letter-on-card');

			paths = $$('path', svg);

			paths.forEach(function(path){
				var key;
				for (key in attributs) {
					if (attributs.hasOwnProperty(key)) {
						path.setAttribute(key, attributs[key]);
					}
				}
			});

			this.card.cardWrapper.querySelector('.symbol-card').appendChild(svg);

			this.playSymbol();
			$.addClass(this.card.cardWrapper, 'show');
		},
		getActivePoint: function(x, y) {
			var i, len;
			for (i = 0, len = this.activeGroup.points.length; i < len; i += 1) {
				if (this.activeGroup.points[i].isCoordinateInPoint(x, y) && this.activeGroup.points[i].isActive) {
					return this.activeGroup.points[i];
				}
			}

			return false;

		},
		showAction: function() {

			var that = this,
				startIndex = 0,
				pointsLength = 0;

			this.groups.forEach(function (g, gIndex) {
				var previousGroup, points;

				if (gIndex) { // if gIndex > 0
					previousGroup = that.groups[gIndex - 1];
					startIndex += previousGroup.points.length;
				}

				points = g.points;
				points.forEach(function (point, pIndex) {
					setTimeout(function () {
						this.flash();
					}.bind(point), (pIndex + startIndex) * that.animationTime);
				});

				pointsLength += g.points.length + 2;

			});

			setTimeout(function(){
				this.groups.forEach(function (g) {
					g.points.forEach(function (point) {
						$.addClass(point.node, 'state');
					});
				});
			}.bind(this), pointsLength * that.animationTime);

		}

	};

	win.symbol = symbol;

}(window, document, document.documentElement));
