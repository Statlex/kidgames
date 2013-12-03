(function (win) {

	"use strict";
	/*global window, document, console, alert */

	win.player = {

		play: function (src) {
			this.stop();
			this.currentMedia = new Media(src, this.onSuccess, this.onError);
			this.currentMedia.play();
		},
		stop: function(){
			if (this.currentMedia) {
				this.currentMedia.stop();
			}
		},
		onSuccess: function () {
			alert('good');
		},
		onError: function (error) {
			alert(error);
		}

	}

}(window));
