(function (win) {

	"use strict";
	/*global console, alert, window, util, APP, lang, localStorage, info, Calendar */

	var circleMaster;

	function Circle(date) {
		this.startCircle = date;
		this.endFlow = {};
	}

	Circle.prototype.save = function() {

		var circles = info.get('circles') || [];
		circles.push(this);
		info.set('circles', circles, true);

	};

	circleMaster = {
		circles: {},
		scanDay: function(node) {
			// try to get closest circle

			var date = node.getAttribute('data-date'),
				circle;
			date = util.strToDate(date);
			circle = this.getCircleByDate(date);

			// if circle is exist
				// if date === start date
					// remove the circles?

				// else if date > start date && date <= start date + 7
					// end flow?
				// else
					// start new circle?





			// if not exist +
				// start new circle? +
			if (!circle) {
				APP.confirm.show(lang.areYouSure,
				function(){
					var circle = new Circle(date);
					circle.save();
					APP.router.navigate('', {trigger: true});
				}, this);
				APP.router.navigate('confirm');
			}

		},
		getCircleByDate: function(date) {

			var circles = info.get('circles') || [],
				calendar = new Calendar();

			circles.forEach(function(circle){

				var different = calendar.getDifferent(date, circle.startCircle),
					currentCircle; // if different < 0 and |different| < 15 hunt circle

			});

			return undefined;
		}

	};

	win.circleMaster = circleMaster;

}(window));