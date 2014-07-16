(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	win.APP.PlayerModel = Backbone.Model.extend({
		initialize: function (data) {
			this.view = data.view;

			this.set('audio', new Audio());

		},

		play: function (src) {

			var audio = this.get('audio');
			audio.src = src;
			audio.play();

		}
	});

}(window, document, document.documentElement));