(function (win) {

	"use strict";
	/*global window, document, console, alert, info */

	win.levels = win.levels || {};

	win.levels['level-1'] = {
		levelNumber: 1,
		pages: [{
			img: 'mouse',
			caption: {
				en: 'ONE mouse',
				ru: 'ОДНА мышь',
				de: 'EINE Maus',
				zh: '',
				es: 'UN ratón'
			}
		},{
			img: 'squirrel',
			caption: {
				en: 'ONE squirrel',
				ru: 'ОДНА белка',
				de: 'EIN Eichhörnchen',
				zh: '',
				es: 'UNA ardilla'
			}
		},{
			img: 'rabbit',
			caption: {
				en: 'ONE rabbit',
				ru: 'ОДИН кролик',
				de: 'EIN Kaninchen',
				zh: '',
				es: 'UN conejo'
			}
		},{
			img: 'dog',
			caption: {
				en: 'ONE dog',
				ru: 'ОДНА собака',
				de: 'EIN Hund',
				zh: '',
				es: 'UN perro'
			}
		}]

	};

}(window));
