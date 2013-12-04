(function (win) {

	"use strict";
	/*global window, document, console, alert, dataStorage */

	win.player = {
		musicOn: dataStorage.getItem('music-on') || 'yes',
		currentSrc: '',
		currentMedia: '',
		currentMediaStatus: 4, // is stopped
		play: function (src) {

//			console.log(src);
//			return;

			if (this.musicOn === 'no') {
				return;
			}

			if (this.currentMediaStatus <= 2 ) {
				return;
			}

			if (this.currentSrc !== src) {
				this.currentMedia = new Media(src, this.onSuccess, this.onError, this.onStatus);
				this.currentSrc = src;
			}

			this.currentMedia.play();

		},
		stop: function(){
			if (this.currentMedia && this.currentMedia.stop) {
				this.currentMedia.stop();
			}
		},
		onSuccess: function () {
//			alert('good');
		},
		onError: function (error) {
			//alert(error.code + ' - ' + error.message);
		},
		onStatus: function(status) {
			player.currentMediaStatus = status;
		},
		setMusic: function(on) {
			var value = on ? 'yes' : 'no';
			dataStorage.setItem('music-on', value);
		}
	}

}(window));
