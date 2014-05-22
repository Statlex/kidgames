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

			var dateStr = node.getStateOnly ? node.date : node.getAttribute('data-date'),
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
							state: 'removeCycle'
						};
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
							state: 'setEndOfFlow'
						};
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
						state: 'confirmNewCycle'
					};
				}
				APP.confirm.show(text,
				function(){
					var cycle = new Cycle(date);
					cycle.save();
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

		}

	};

	win.cycleMaster = cycleMaster;

}(window));