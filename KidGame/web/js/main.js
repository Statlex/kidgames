(function (win) {

	"use strict";
	/*global window, document, viewer */

	win.main = {
		handleEvent: function() {
			// init viewer
			this.wrapper = $('#wrapper');
			this.setWrapperSize();
			viewer.wrapper = this.wrapper;
			viewer.show('.title-page');
			win.addEventListener('resize', this.setWrapperSize.bind(this), false);

		},
		test: function() {
			console.log(this);
		},
		setActiveObject: function() {

			switch (info.section) {
				case 'find-number':
					$$('#wrapper .button').forEach(function(button){
						var attribute = button.getAttribute('onclick');
						attribute += 'viewer.show(".find-number");';
						button.setAttribute('onclick', attribute);
					});
					break;

			}

		},
		setWrapperSize: function() {
			this.wrapper.style.width = info.screen.width() + 'px';
			this.wrapper.style.height = info.screen.height() + 'px';
		}

	};

	win.addEventListener('load', win.main, false);

}(window));
