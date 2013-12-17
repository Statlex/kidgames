(function (win) {

	"use strict";
	/*global window, document, console, alert, util, $, setting, storage */

	var pre = util.pre;

	win.sender = {
		run: function() {
			var progress = $('#wrapper .progress');
			progress.style[pre + 'Transition'] = (setting.def.timeSend + Math.random() * 30) + 's all linear';
			progress.style.width = '100%';
			progress.addEventListener(pre + 'TransitionEnd', this.showAlert, false);
		},
		showAlert: function() {
			var sendingEnd = $('#wrapper .sending-end-wrapper');
			sendingEnd.style.display = 'block';
			win.setTimeout(function(){
				sendingEnd.style.opacity = 1;
			}, 20);
		}
	};

}(window));
