(function (win) {

	"use strict";
	/*global console, alert, window, util, APP, lang, localStorage, info, Calendar, info, Slider */

	var cycleMaster;

	function Cycle(date) {
		this.startCycle = date;
		this.endFlow = {};
	}

	Cycle.prototype.save = function() {
		var cycles = info.get('cycles') || [];
		cycles.push(this);
		info.set('cycles', cycles, true);
		cycleMaster.sortCycles();
	};

	Cycle.prototype.remove = function() {
		var cycles = info.get('cycles');
		cycles.forEach(function(cycle, index, arr){
			if (cycle.startCycle.str === this.startCycle.str) {
				util.removeItemByIndex(arr, index);
			}
		}, this);
		info.set('cycles', cycles, true);
		cycleMaster.sortCycles();
	};

	Cycle.prototype.setFlowEnd = function(date) {
		var newCycle = new Cycle(this.startCycle);
		this.remove();
		newCycle.endFlow = date;
		newCycle.save();
	};

	cycleMaster = {
		cycles: {},
		scanDay: function(node) {
			// try to get closest cycle

			var dateStr = (node.getStateOnly || node.forceRun) ? node.date : node.getAttribute('data-date'),
				options = node,
				date = util.strToDate(dateStr),
				cycle, different,
				calendar = new Calendar(),
				text = {};
			cycle = this.getCycleByDate(date);

			different = calendar.getDifferent(date, util.getToday());

			if (different > 0) {
				text.title = lang.checkDate;
				text.text = lang.cannotUseThisDay.replace('{{date}}', dateStr);
				text.text = lang.replaceMonth(text.text);
				// create notification with 'v' and '?'
				if (options && options.getStateOnly) {
					return {
						state: 'impossible',
						text: lang.thisDayFromFuture,
						shortText: lang.impossibleDayDP,
						buttonText: lang.impossibleBtn
					};
				}
				if (options && options.forceRun) {
					return 'impossible day';
				}
				APP.alert.show(text);
				APP.router.navigate('alert');
				return;
			}

			if (cycle) {
				if (cycle.startCycle.str === dateStr) {
					text.title = lang.removeCycle;
					text.text = lang.removeFromHistoryCycle.replace('{{date}}', dateStr);
					text.text = lang.replaceMonth(text.text);
					if (options && options.getStateOnly) {
						return {
							state: 'removeCycle',
							text: lang.clickHereToRemoveCycle,
							shortText: lang.removeCycleDP,
							buttonText: lang.removeBtn
						};
					}
					if (options && options.forceRun) {
						cycle.remove();
						Slider.prototype.addColoringToAllPage();
						return 'remove cycle';
					}
					APP.confirm.show(text,
						function(){
							cycle.remove();
							Backbone.history.history.back();
							Slider.prototype.addColoringToAllPage();
						}, this);
				} else {
					text.title = lang.setEndOfFlow;
					text.text = lang.setEndOfFlowOn.replace('{{date}}', dateStr);
					text.text = lang.replaceMonth(text.text);
					if (options && options.getStateOnly) {
						return {
							state: 'setEndOfFlow',
							text: lang.clickHereToSetEndOfFlow,
							shortText: lang.endOfFlowDP,
							buttonText: lang.endOfFlowBtn
						};
					}
					if (options && options.forceRun) {
						cycle.setFlowEnd(date);
						Slider.prototype.addColoringToAllPage();
						return 'end flow';
					}
					APP.confirm.show(text,
						function(){
							cycle.setFlowEnd(date);
							Backbone.history.history.back();
							Slider.prototype.addColoringToAllPage();
						}, this);
				}
			} else {
				text.title = lang.confirmNewCycle;
				text.text = lang.setStartDateOfLastCycleAs.replace('{{date}}', dateStr);
				text.text = lang.replaceMonth(text.text);
				if (options && options.getStateOnly) {
					return {
						state: 'confirmNewCycle',
						text: lang.clickHereToStartNewCycle,
						shortText: lang.startNewCycleDP,
						buttonText: lang.startBtn
					};
				}
				if (options && options.forceRun) {
					(new Cycle(date)).save();
					Slider.prototype.addColoringToAllPage();
					return 'new cycle';
				}
				APP.confirm.show(text,
				function(){
					(new Cycle(date)).save();
					Backbone.history.history.back();
					Slider.prototype.addColoringToAllPage();
				}, this);
			}

			APP.router.navigate('confirm');

		},
		getCycleByDate: function(date) {

			var cycles = info.get('cycles') || [],
				calendar = new Calendar(),
				nearestCycle = false;

			cycles.forEach(function(cycle){
				var different = calendar.getDifferent(date, cycle.startCycle);
				if (different === 0) {
					nearestCycle = new Cycle(cycle.startCycle);
					nearestCycle.endFlow = cycle.endFlow;
				}
				if (!nearestCycle && (different >= 0) && (different <= info.flowMaxLength)) {
					nearestCycle = new Cycle(cycle.startCycle);
					nearestCycle.endFlow = cycle.endFlow;
				}
			});

			return nearestCycle;

		},
		sortCycles: function() {
			var cycles = info.get('cycles'),
				calendar = new Calendar();
			cycles = cycles.sort(function(a, b) {
				return calendar.getDifferent(a.startCycle, b.startCycle);
			});

			info.set('cycles', cycles, true);

		},
		createCycleByDate: function(date) {

			var obj = {
					dates: [],
					cycleLength: info.get('cycleLength')
				},
				ii, ll,
				cycle = this.getCycleByDate(date),
				calendar = new Calendar();

			for (ii = 0, ll = obj.cycleLength; ii < ll; ii += 1) {
				obj.dates.push({
					dayNumber: ii
				});
			}

			if (!cycle) {
				return obj;
			}

			obj.hasCycle = true;

			obj.dates[calendar.getDifferent(date, cycle.startCycle)].isActive = true;

			var dateMap = JSON.parse(JSON.stringify(info.dateMap)),
				cycleLength = info.get('cycleLength'),
				dateMapDifferent, halfOfMapDifferent,
				index = 0;

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

			for (var key in dateMap) {
				if (dateMap.hasOwnProperty(key)) {
					for (ii = 0, ll = dateMap[key]; ii < ll; ii += 1) {
						obj.dates[index].cycleState = key;
						obj.dates[index].periodName = key.replace(/_\d/gi, '');
						var dateObj = new Date();
						dateObj.setDate(cycle.startCycle.date + index);
						obj.dates[index].date = {
							date: dateObj.getDate(),
							month: dateObj.getMonth(),
							year: dateObj.getFullYear()
						};
						index += 1;
					}
				}
			}

			return obj;

		}

	};

	win.cycleMaster = cycleMaster;

}(window));