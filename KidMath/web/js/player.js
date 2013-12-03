(function (win) {

	"use strict";
	/*global window, document, console, alert, dataStorage */

	win.player = {
		musicOn: dataStorage.getItem('music-on') || 'yes',
		play: function (src) {
			if (this.musicOn === 'no') {
				return;
			}
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
		},
		setMusic: function(on) {
			var value = on ? 'yes' : 'no';
			dataStorage.setItem('music-on', value);
		}
	}

}(window));
