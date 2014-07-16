(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	win.APP.PlayerModel = Backbone.Model.extend({
		initialize: function (data) {
			this.track = {};
			this.currentTime = 0;
			this.view = data.view;

			var audio = new Audio(),
				that = this;
			audio.addEventListener('canplay', function(){
				this.currentTime = that.currentTime;
			}, false);

			this.audio = audio;

		},

		play: function (data) {

			var audio = this.audio;

			if (data.src !== this.track.src) {
				this.currentTime = 0;
			}

			if (data.src === this.track.src && !audio.paused) {
				return;
			}

			this.track = data;

			this.view.update();

			audio.src = data.src;
			audio.play();

			console.log(data.name);

		},
		pause: function() {
			var audio = this.audio;
			this.currentTime = audio.currentTime;
			audio.pause();
		},
		stop: function() {
			var audio = this.audio;
			audio.pause();
			this.currentTime = 0;
			audio.currentTime = 0;

		}




	});

}(window, document, document.documentElement));