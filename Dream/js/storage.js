(function () {

	"use strict";
	/*global window, document, console, alert, JSON, localStorage */

	window.storage = {
		cellName: 'user-data',
		getData: function() {
			return JSON.parse(localStorage[this.cellName] || '{}');
		},
		get: function(property, defData) {
			var result = this.getData()[property] || '';
			if (defData) {
				result = result || defData;
			}

			return result;
		},
		set: function(property, value) {
			var data = this.getData();
			data[property] = value;
			localStorage[this.cellName] = JSON.stringify(data);
		}
	};

}());
