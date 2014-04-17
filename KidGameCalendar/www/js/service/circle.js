(function (win) {

	"use strict";
	/*global console, alert, window, util */

	var circleMaster;

	function Circle(date) {
		this.startCircle = date;
		this.endFlow = {};
	}

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

			// if not exist
				// start new circle?


			if (circle) {

			} else {
				APP.confirm.show('Are you sure?');
				APP.router.navigate('confirm');

				circle = new Circle(date);
				console.log(circle);
			}



			console.log(node);
		},
		getCircleByDate: function(date) {
			// get circles by date

			return undefined;
		}

	};

	win.circleMaster = circleMaster;

}(window));