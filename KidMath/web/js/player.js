(function (win) {

	"use strict";
	/*global window, document, console, alert, dataStorage */

	win.player = {
		musicOn: dataStorage.getItem('music-on') || 'yes',
		play: function (src) {

//			console.log(src);
//			return;

			if (this.musicOn === 'no') {
				return;
			}
			this.stop();
			try {
				this.currentMedia = new Media(src, this.onSuccess, this.onError);
				try {
					this.currentMedia.play();
				} catch (e) {
				}
			} catch (e) {
			}

		},
		stop: function(){
			try {
				if (this.currentMedia) {
					this.currentMedia.pause();
				}
			} catch (e) {
			}
		},
		onSuccess: function () {
//			alert('good');
		},
		onError: function (error) {
			//alert(error.code + ' - ' + error.message);
		},
		setMusic: function(on) {
			var value = on ? 'yes' : 'no';
			dataStorage.setItem('music-on', value);
		}
	}

}(window));
