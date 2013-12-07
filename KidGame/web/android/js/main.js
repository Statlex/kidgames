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

			}

		}
	};

	win.addEventListener('load', win.main, false);

}(window));
