(function () {

	"use strict";
	/*global window, document, console, alert, storage, setting, localStorage, navigator, $, confirm */

	window.setting = {
		lang: 'en',
		def: {
			timeSend: 30,
			lang: 'en'
		},
		availableLangs: ['en', 'ru'],
		run: function() {
			this.setSelectState();
		},
		init: function() {
			// get language
			var lang = storage.get('lang') || (navigator.language || navigator.userLanguage);
			lang = lang.split('-')[0];
			this.lang = (this.availableLangs.indexOf(lang) === -1) ? this.def.lang : lang;
		},
		setSelectState: function() {
			var select = $('#wrapper select');
			var options = Array.prototype.slice.call(select.options);
			var that = this;
			options.forEach(function(option, index){
				if (option.value === that.lang) {
					select.selectedIndex = index;
				}
			});
		}
	};

	window.setting.init();

}());
