(function (win) {

	"use strict";
	/*global console, alert, window, util, APP, lang, localStorage, info, Calendar, info */

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

			var dateStr = node.getAttribute('data-date'),
				date = util.strToDate(dateStr),
				cycle, different,
				calendar = new Calendar(),
				text = {};
			cycle = this.getCycleByDate(date);

			console.log(cycle);

			if (cycle) {
				if (cycle.startCycle.str === dateStr) {
					text.title = lang.removeCycle;
					text.text = lang.removeFromHistoryCycle.replace('{{date}}', dateStr);
					APP.confirm.show(text,
						function(){
							cycle.remove();
							APP.router.navigate('', {trigger: true});
						}, this);
				} else {
					text.title = lang.setEndOfFlow;
					text.text = lang.setEndOfFlowOn.replace('{{date}}', dateStr);
					APP.confirm.show(text,
						function(){
							cycle.setFlowEnd(date);
							APP.router.navigate('', {trigger: true});
						}, this);
				}
			} else {
				text.title = lang.confirmNewCycle;
				text.text = lang.setStartDateOfLastCycleAs.replace('{{date}}', dateStr);
				APP.confirm.show(text,
				function(){
					var cycle = new Cycle(date);
					cycle.save();
					APP.router.navigate('', {trigger: true});
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
				console.log(different);
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