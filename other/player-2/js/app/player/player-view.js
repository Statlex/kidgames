(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	win.APP = win.APP || {};

	win.APP.PlayerView = win.APP.MainView.extend({
		templates: ['player'],
		events: {

		},
		init: function() {

			this.$el = $('.js-wrapper .js-player-wrapper');
			this.$el.html(this.tmpl.player({}));

			this.model = new win.APP.PlayerModel({view: this});
			this.playListView = new APP.PlayListView({playerView: this, playerModel: this.model});

		}


	});




}(window, document, document.documentElement));