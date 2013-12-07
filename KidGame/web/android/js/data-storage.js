(function (win) {

	"use strict";
	/*global window, document, localStorage */

	win.dataStorage = {
		saveItem: 'save-item',
		getData: function() {
			var data = localStorage.getItem(this.saveItem) || '{}';
			return JSON.parse(data);
		},
		getItem: function(itemName) {
			return this.getData()[itemName];
		},
		setItem: function(itemName, value) {
			info[itemName] = value;
			var data = this.getData();
			data[itemName] = value;
			data = JSON.stringify(data);
			localStorage.setItem(this.savedItem, data);
		},
		changeItem: function(itemName, delta) {
			this.setItem(itemName, this.getItem(itemName) + delta);
		}
	}

}(window));
