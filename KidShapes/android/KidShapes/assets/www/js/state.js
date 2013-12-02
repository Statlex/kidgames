(function () {
	"use strict";
	/*global window, state, localStorage*/

	//window.state = window.state || {};

/*	var self = state;

	self.gameName = 'undefined';
	self.difficult = 'undefined';

	self.toString = function () {
		var key, str = '';
		for (key in self) {
			if (self.hasOwnProperty(key)) {
				if (typeof self[key] !== 'function') {
					str += key + ':' + self[key] + ',';
				}
			}
		}
		str = '{' + str.substr(0, str.length - 1) + '}';
		return str;
	};

	self.getDifficult = function () {
		var state, regExp, difficult;
		state = localStorage.getItem('state');
		if (state) {
			regExp = /difficult:\w+-?\w+/i;
			difficult = regExp.exec(state).toString();            // get full string of difficult
			difficult = difficult.substring(10, difficult.length);  // select need part of full string
			self.difficult = difficult; // wrong code, but I do not want fix it
		} else {
			difficult = 'false';
		}
		return difficult;
	};

	self.setDifficult = function (q) {
		if (q && (typeof q).toLowerCase() === 'number') {
			if (q > 0) {
				switch (self.getDifficult()) {
				case 'kinder-garden':
					self.difficult = 'school';
					break;
				case 'school':
					self.difficult = 'university';
					break;
				}
			} else {
				switch (self.getDifficult()) {
				case 'university':
					self.difficult = 'school';
					break;
				case 'school':
					self.difficult = 'kinder-garden';
					break;
				}
			}
			self.addDifficultToLS(self.difficult);
		}

	};

	self.addDifficultToLS = function (difficult) {
		var curDif, state;
		curDif = self.getDifficult();
		state = localStorage.getItem('state');
//		alert(state);
		if (state) {
			state = state.replace(curDif, difficult);
			localStorage.setItem('state', state);
		}
	};

	self.difficult = self.getDifficult();*/


}());