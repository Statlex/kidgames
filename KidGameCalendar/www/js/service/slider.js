(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar, cycle, clearTimeout */

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

		this.swipeTime = 100;
		this.swipeTimeCSS = this.swipeTime / 1000 + 's';

	}

	Slider.prototype.init = function() {
		var that = this,
			ev = info.evt;
		this.wrapper.addEventListener(ev.down, function() {
			that.innerContainer.style[info.preJS + 'Transition'] = 'none';
			clearTimeout(that.timeoutId);
			//that.fixPageState();
			that.isActive = true;
			that.time = {
				start: Date.now()
			};
		}, false);
		this.wrapper.addEventListener(ev.move, function() {
			if (!ev.isActive || !that.isActive) {
				return;
			}
			var dX = ev.touchStart.x - ev.touchMove.x;
			that.innerContainer.style[info.preJS + 'Transform'] = 'translate(-' + (that.page.width + dX) + 'px, 0)';
		}, false);
		this.wrapper.addEventListener(ev.up, function() {
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

				that.innerContainer.style[info.preJS + 'Transition'] = that.swipeTimeCSS + ' all ease-out';
				that.innerContainer.style[info.preJS + 'Transform'] = 'translate(' + x + 'px, 0)';
				return;
			}

			if (Math.abs(dX) < that.page.width / 2) {
				that.innerContainer.style[info.preJS + 'Transition'] = that.swipeTimeCSS + ' all ease-out';
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

			that.innerContainer.style[info.preJS + 'Transition'] = that.swipeTimeCSS + ' all ease-out';
			that.innerContainer.style[info.preJS + 'Transform'] = 'translate(' + x + 'px, 0)';

		}, false);
	};

	Slider.prototype.addRightPage = function(node) {
		var pages = this.innerContainer.querySelectorAll('.js-main-calendar-page');
		if (pages.length === 3) {
			this.innerContainer.removeChild(pages[0]);
		}
		this.innerContainer.appendChild(node);
	};

	Slider.prototype.addLeftPage = function(node) {
		var pages = this.innerContainer.querySelectorAll('.js-main-calendar-page');
		if (pages.length === 3) {
			this.innerContainer.removeChild(pages[2]);
		}
		this.innerContainer.insertBefore(node, pages[0]);
	};

	Slider.prototype.setStartPosition = function() {
		this.innerContainer.style[info.preJS + 'Transform'] = 'translate(-' + this.page.width + 'px, 0)';
	};

	Slider.prototype.setCreatePages = function() {

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

	Slider.prototype.createCalendarPage = function(pageDate) {
		var node = doc.createElement('div'), page;
		node.innerHTML = _.template(this.templates.calendarPage, pageDate);
		page = node.querySelector('.js-main-calendar-page');
		this.addColoringToPage(page);
		this.listenersToPage(page);
		return page;
	};

	Slider.prototype.listenersToPage = function(page) {

		var cells = page.querySelectorAll('.month-date');
		cells = util.toArray(cells);
		cells.forEach(function(cell){

			Hammer(cell).on('tap', function() {

				// set active date
				if (util.hasClass(this, 'selected-date')) {
					return;
				}

				var siblings = util.findAll('.js-main-calendar-wrapper .js-main-calendar-page:nth-child(2) .month-date');
				siblings.forEach(function(node){
					util.removeClass(node, 'selected-date');
				});

				util.addClass(this, 'selected-date');

			});

			Hammer(cell).on('doubletap', function() {
				APP.router.navigate('date-info', {trigger: true});
				APP.dateInfo.show(this.getAttribute('data-date'));
			});

			Hammer(cell).on('hold', function() {

				cycleMaster.scanDay(this);

			});

		});

	};

	Slider.prototype.changeMonth = function(number) {

		// create needed page
		// replace with extra page
		if (number) {
			if (number > 0) {
				if (this.date.month === 11) {
					this.date.year += 1;
					this.date.month = 0;
				} else {
					this.date.month += 1;
				}
			} else  if (number < 0) {
				if (this.date.month === 0) {
					this.date.year -= 1;
					this.date.month = 11;
				} else {
					this.date.month -= 1;
				}

			}

			this.timeoutId = setTimeout(function(direction){

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

			}.bind(this, number), this.swipeTime);

		}

		this.dateContainer.innerHTML = _.template(this.templates.calendarDate, this);

	};

	Slider.prototype.fixPageState = function() {

	};

	Slider.prototype.addColoringToPage = function(node) {
		var cycles = info.get('cycles') || [],
			dateNodes = util.findAll('.month-date', node),
			calendar = new Calendar();

		dateNodes = dateNodes.map(function(nodeDate){
			var date = util.strToDate(nodeDate.getAttribute('data-date'));
			date.node = nodeDate;
			return date;
		});

		cycles.forEach(function(cycle){

			dateNodes.forEach(function(dateNode){
				var different = calendar.getDifferent(dateNode, cycle.startCycle);
				if (different === 0) {
					util.addClass(dateNode.node, 'start-flow');
				}
				if (different > 0 && different <= 3) {
					util.addClass(dateNode.node, 'flow');
				}

			});

			console.log('--------------------------------');

		});

	};



	win.Slider = Slider;

}(window, document, document.documentElement));