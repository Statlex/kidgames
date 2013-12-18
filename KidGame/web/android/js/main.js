(function (win) {

	"use strict";
	/*global window, document, viewer */

	win.main = {
		handleEvent: function() {
			// init viewer
			this.wrapper = $('#wrapper');
			viewer.wrapper = this.wrapper;
			viewer.show('.title-page');
		},
		setTitlePage: function() {
			info.section = 'titlePage';
			statusBar.show(['setup']);
			statusBar.needShowBackButton(false);
		},
		setActiveObject: function() {

			switch (info.section) {
				case 'findNumber':
					$$('#wrapper .main-button').forEach(function(button){
						var attribute = button.getAttribute('onclick');
						attribute += 'viewer.show(".find-number");';
						button.setAttribute('onclick', attribute);
					});
					break;
				case 'findLetter':
					$$('#wrapper .main-button').forEach(function(button){
						var attribute = button.getAttribute('onclick');
						attribute += 'viewer.show(".find-letter");';
						button.setAttribute('onclick', attribute);
					});
					break;
				case 'findColor':
					$$('#wrapper .main-button').forEach(function(button){
						var attribute = button.getAttribute('onclick');
						attribute += 'viewer.show(".find-color");';
						button.setAttribute('onclick', attribute);
					});
					break;


			}

		},
		settingsPage: function() {

			var langSelectNode = $('.js-language-select', this.wrapper);

			langSelectNode.addEventListener('change', function(){
				var lang = this.value;
				info.lang = lang;
				dataStorage.setItem('lang', lang);
				viewer.refresh();
			}, false);

		}

	};

	win.addEventListener('load', win.main, false);

}(window));
