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

			audio.addEventListener('ended', function(){
				that.view.next();
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


			audio.src = data.src;
			audio.play();

			this.view.update();
			this.view.setProgressBar({percent: 100});

			console.log(data.name);

		},
		pause: function() {
			var audio = this.audio;
			this.currentTime = audio.currentTime;
			audio.pause();
			this.view.setProgressBar();
		},
		stop: function() {
			var audio = this.audio;
			audio.pause();
			this.currentTime = 0;
			audio.currentTime = 0;
			this.view.setProgressBar();
		}




	});

}(window, document, document.documentElement));