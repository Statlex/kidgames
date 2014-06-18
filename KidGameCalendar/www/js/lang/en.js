(function (win) {

	"use strict";
	/*global console, alert, window, document */

	win.langs = win.langs || {};

	win.langs.en = {

		areYouSure: 'Are you sure?',
		confirmNewCycle: 'Confirm new cycle',
		setStartDateOfLastCycleAs: 'Set start date of last cycle as {{date}}?',
		removeCycle: 'Remove cycle',
		removeFromHistoryCycle: 'Remove from history<br>the cycle that started on {{date}}?',
		setEndOfFlow: 'Set end of flow',
		setEndOfFlowOn: 'Set end of flow on {{date}}',
		checkDate: 'Impossible date',
		cannotUseThisDay: 'You can not use {{date}},<br>because it is future.',
		month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		monthFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		dayShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		cycle: {
			'start-flow': 'start flow',
			flow: 'flow',
			safe: 'safe',
			unsafe: 'unsafe',
			fertile: 'fertile'
		},
		period: {
			'start-flow': 'start period',
			flow: 'flow period',
			safe: 'safe period',
			unsafe: 'unsafe period',
			fertile: 'fertile period'
		},
		dayW: 'day',
		progress: 'progress',
		thisDayFromFuture: 'this day<br>from future',
		clickHereToRemoveCycle: 'click here to<br>remove cycle',
		clickHereToSetEndOfFlow: 'click here to<br>set end of flow',
		clickHereToStartNewCycle: 'click here to<br>start new cycle',
		impossibleDayDP: 'impossible day',
		removeCycleDP: 'remove cycle',
		endOfFlowDP: 'end of flow',
		startNewCycleDP: 'start new cycle',
		impossibleBtn: 'impossible',
		removeBtn: 'remove',
		endOfFlowBtn: 'end of flow',
		startBtn: 'start',
		cancelBtn: 'cancel',

		// notes section
		sex: 'sex',
		pill: 'pill',
		weight: 'weight',
		notes: 'notes',
		toStartNewCycle: 'to start new cycle press and hold needed day',
		noNoticeMessage: 'Click here to set notice for'


	};

}(window));