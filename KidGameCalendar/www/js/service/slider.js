(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar, cycle, clearTimeout, dataBase, cycleMaster, setTimeout */

	var log = console.log.bind(console);

	function Slider(wrapper, date) {

		this.wrapper = wrapper;

		this.innerContainer = wrapper.querySelector('.js-main-calendar-inner-container');
		this.dateContainer = this.wrapper.parentNode.querySelector('.js-slider-date');
		this.trigger = undefined; // update calendar nodes
		this.page = {
			width: info.screen.getWidth()
		};
		this.date = date;

		this.templates = {
			calendarPage: templateContainer.templates['main-calendar-page'],
			calendarDate: templateContainer.templates['main-calendar-date']
		};

		this.changeMonth();

		this.swipeTime = 150;
		this.swipeTimeCSS = this.swipeTime - 50 + 'ms';

	}

	Slider.prototype.init = function () {
		var that = this,
			ev = info.evt;
		this.wrapper.addEventListener(ev.down, function () {
			that.innerContainer.style[info.preJS + 'Transition'] = 'none';
			clearTimeout(that.timeoutId);
			//that.fixPageState();
			that.isActive = true;
			that.time = {
				start: Date.now()
			};
		}, false);
		this.wrapper.addEventListener(ev.move, function () {
			if (!ev.isActive || !that.isActive) {
				return;
			}
			var dX = ev.touchStart.x - ev.touchMove.x;
			that.innerContainer.style[info.preJS + 'Transform'] = 'translate(-' + (that.page.width + dX) + 'px, 0)';
		}, false);
		this.wrapper.addEventListener(ev.up, function () {
			that.isActive = false;
			var dX = ev.touchStart.x - ev.touchMove.x,
				x = that.page.width,
				speed;

			that.time.end = Date.now();

			speed = Math.abs(dX / ((that.time.end - that.time.start) / 1000));

			if (speed > 700) {
				if (dX > 0) {
					x *= -2;
					that.changeMonth(1);
				} else {
					x = 0;
					that.changeMonth(-1);
				}

				that.innerContainer.style[info.preJS + 'Transition'] = that.swipeTimeCSS + ' all ease';
				that.innerContainer.style[info.preJS + 'Transform'] = 'translate(' + x + 'px, 0)';
				return;
			}

			if (Math.abs(dX) < that.page.width / 2) {
				that.innerContainer.style[info.preJS + 'Transition'] = that.swipeTimeCSS + ' all ease';
				that.innerContainer.style[info.preJS + 'Transform'] = 'translate(-' + x + 'px, 0)';
				return;
			}

			if (dX > 0) {
				x *= -2;
				that.changeMonth(1);
			} else {
				x = 0;
				that.changeMonth(-1);
			}

			that.innerContainer.style[info.preJS + 'Transition'] = that.swipeTimeCSS + ' all ease';
			that.innerContainer.style[info.preJS + 'Transform'] = 'translate(' + x + 'px, 0)';

		}, false);

		win.addEventListener('resize', this.fixPageState.bind(this), false);

	};

	Slider.prototype.addRightPage = function (node) {
		var pages = this.innerContainer.querySelectorAll('.js-main-calendar-page');
		if (pages.length === 3) {
			this.innerContainer.removeChild(pages[0]);
		}
		this.innerContainer.appendChild(node);
	};

	Slider.prototype.addLeftPage = function (node) {
		var pages = this.innerContainer.querySelectorAll('.js-main-calendar-page');
		if (pages.length === 3) {
			this.innerContainer.removeChild(pages[2]);
		}
		this.innerContainer.insertBefore(node, pages[0]);
	};

	Slider.prototype.setStartPosition = function () {
		this.innerContainer.style[info.preJS + 'Transform'] = 'translate(-' + this.page.width + 'px, 0)';
	};

	Slider.prototype.setCreatePages = function () {

		var calendar = new Calendar(),
			page0, page1, page2;

		page0 = calendar.getMonthPage({year: this.date.year, month: this.date.month, dMonth: -1});
		page1 = calendar.getMonthPage({year: this.date.year, month: this.date.month, dMonth: 0});
		page2 = calendar.getMonthPage({year: this.date.year, month: this.date.month, dMonth: 1});

		page0 = this.createCalendarPage(page0);
		page1 = this.createCalendarPage(page1);
		page2 = this.createCalendarPage(page2);

		this.addRightPage(page0);
		this.addRightPage(page1);
		this.addRightPage(page2);

	};

	Slider.prototype.createCalendarPage = function (pageDate) {
		var node = doc.createElement('div'), page;
		node.innerHTML = _.template(this.templates.calendarPage, pageDate);
		page = node.querySelector('.js-main-calendar-page');
		this.addColoringToPage(page);
		this.listenersToPage(page);
		return page;
	};

	function sliderTap() {

		var dateInfo = {
				state: this.getAttribute('data-cycle-state'),
				dateOfCycle: this.getAttribute('data-date-number'),
				length: info.get('cycleLength')
			},
			cycleInfoWrapper = util.find('.js-cycle-progress-wrapper');

		$('.selected-date').removeClass('selected-date');

		util.addClass(this, 'selected-date');

		// set state, hind under the calendar
		cycleInfoWrapper.innerHTML = dateInfo.dateOfCycle ? _.template(templateContainer.templates['cycle-progress-info'], dateInfo) : '';

	}

	Slider.prototype.listenersToPage = function (page) {

		var cells = page.querySelectorAll('.month-date');
		cells = util.toArray(cells);
		cells.forEach(function (cell) {

			var $cell = $(cell);

			$cell.on('click', sliderTap);

			$cell.on('dblclick', function () {
				APP.router.navigate('date-info', {trigger: true});
				APP.dateInfo.show(this.getAttribute('data-date'));
			});

			$cell.on('hold', function () {
				cycleMaster.scanDay(this);
			});

		});

	};

	Slider.prototype.changeMonth = function (number) {

		// create needed page
		// replace with extra page
		if (number) {
			this.changeMonthDate(number);
			this.timeoutId = setTimeout(this.changePage.bind(this, number), this.swipeTime);
		}

		this.updateDateNode();

	};

	Slider.prototype.updateDateNode = function() {
		this.dateContainer.innerHTML = _.template(this.templates.calendarDate, this);
	};

	Slider.prototype.changeMonthDate = function(number) {
		if (!number) {
			return;
		}

		if (number > 0) {
			if (this.date.month === 11) {
				this.date.year += 1;
				this.date.month = 0;
			} else {
				this.date.month += 1;
			}
		} else if (number < 0) {
			if (this.date.month === 0) {
				this.date.year -= 1;
				this.date.month = 11;
			} else {
				this.date.month -= 1;
			}

		}

	};

	Slider.prototype.fixPageState = function () {
		this.page.width = this.wrapper.clientWidth;
		this.innerContainer.style[info.preJS + 'Transform'] = 'translate(-' + this.page.width + 'px, 0)';
	};

	Slider.prototype.changePage = function(direction) {
		var calendar = new Calendar(),
			page = calendar.getMonthPage({year: this.date.year, month: this.date.month, dMonth: direction});

		page = this.createCalendarPage(page);

		if (direction > 0) {
			this.addRightPage(page);
		} else {
			this.addLeftPage(page);
		}
		this.innerContainer.style[info.preJS + 'Transition'] = 'none';
		this.innerContainer.style[info.preJS + 'Transform'] = 'translate(-' + this.page.width + 'px, 0)';

		this.updateSelectedDate();

	};

	Slider.prototype.addColoringToPage = function (node) {

		var cycles = info.get('cycles') || [],
			dateNodes = util.findAll('.month-date', node),
			calendar = new Calendar(),
			classList = ['safe', 'unsafe', 'fertile', 'flow', 'start-flow', 'future-start-flow', 'tick'],
			lastCycle = cycles[cycles.length - 1];

		this.calendar = calendar;

		dateNodes = dateNodes.map(function (nodeDate) {
			var date = util.strToDate(nodeDate.getAttribute('data-date'));
			date.node = nodeDate;
			nodeDate.removeAttribute('data-date-number');
			nodeDate.removeAttribute('data-cycle-state');
			classList.forEach(function (className) {
				util.removeClass(nodeDate, className);
			});
			return date;
		});

		// flow - 4
		// after flow - safe - 5
		// before zalyot - unsafe - 5
		// zalyot - fertile - 4
		// after zalyot - unsafe - 5
		// before flow - safe - 5

		cycles.forEach(function (cycle) {

			var dateMap = {
					flow: 4,
					safe_1: 5,
					unsafe_1: 5,
					fertile: 4,
					unsafe_2: 5,
					safe_2: 5
				},
				cycleLength = info.get('cycleLength'),
				fullCycleLength = cycleLength,
				dateMapDifferent, halfOfMapDifferent;

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

			dateNodes.forEach(function (dateNode) {

				var different = calendar.getDifferent(dateNode, cycle.startCycle),
					cycleLength = fullCycleLength,
					addedNodeClass;

				if ((different < 0) || (different >= cycleLength)) {
					return;
				}

				if (different < cycleLength) {
					addedNodeClass = 'safe';
				}

				cycleLength -= dateMap.safe_2;
				if (different < cycleLength) {
					addedNodeClass = 'unsafe';
				}

				cycleLength -= dateMap.unsafe_2;
				if (different < cycleLength) {
					addedNodeClass = 'fertile';
				}

				cycleLength -= dateMap.fertile;
				if (different < cycleLength) {
					addedNodeClass = 'unsafe';
				}

				cycleLength -= dateMap.unsafe_1;
				if (different < cycleLength) {
					addedNodeClass = 'safe';
				}

				cycleLength -= dateMap.safe_1;
				if (different < cycleLength) {
					addedNodeClass = 'flow';
				}

				if (!different) {
					addedNodeClass = 'start-flow';
				}

				classList.forEach(function (className) {
					util.removeClass(dateNode.node, className);
				});

				util.addClass(dateNode.node, addedNodeClass);

				dateNode.node.setAttribute('data-date-number', different + 1);
				dateNode.node.setAttribute('data-cycle-state', addedNodeClass);

			});

		});

		if (lastCycle) {
			dateNodes.forEach(function (dateNode) {
				var different = calendar.getDifferent(dateNode, lastCycle.startCycle);
				if ((different > 0) && ((different % info.get('cycleLength')) === 0)) {
					util.addClass(dateNode.node, 'future-start-flow');
				}
			});
		}

		dataBase.getSavedDates(function(data){
			var dateNodes = util.findAll('.month-date', node);
			dateNodes.forEach(function(node){
				if (data.indexOf(node.getAttribute('data-date')) !== -1) {
					util.addClass(node, 'tick');
				}
			});
		}, this);


		this.updateSelectedDate();

	};

	Slider.prototype.addColoringToAllPage = function () {
		var nodes = util.findAll('.js-main-calendar-page');
		nodes.forEach(function (node) {
			Slider.prototype.addColoringToPage(node);
		});
	};

	Slider.prototype.updateSelectedDate = function() {
		var selectedDate = util.find('.js-main-calendar-wrapper .js-main-calendar-page:nth-child(2) .selected-date'),
			selectedDates;
		if (selectedDate) {
			sliderTap.call(selectedDate);
		} else {
			selectedDates = util.findAll('.selected-date');
			selectedDates.forEach(function(node){
				util.removeClass(node, 'selected-date');
			});
			util.find('.js-cycle-progress-wrapper').innerHTML = '';
		}
	};

	win.Slider = Slider;

}(window, document, document.documentElement));