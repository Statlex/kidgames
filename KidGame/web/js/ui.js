(function (win) {

	"use strict";
	/*global window, document */

	win.ui = win.ui || {};

	win.ui.message = {
		handleEvent: function() {
			this.wrapper = $('.js-message-fade');
			this.textNode = $('.js-message-text', this.wrapper);
			this.okBtn = $('.js-ok-button', this.wrapper);
		},
		show: function(msg) {
			this.textNode.innerHTML = msg;
			$.addClass(this.wrapper, 'active');



		}
	};

	win.addEventListener('load', win.ui.message, false);


}(window));
