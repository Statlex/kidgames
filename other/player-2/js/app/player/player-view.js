(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	win.APP = win.APP || {};

	win.APP.PlayerView = win.APP.MainView.extend({
		templates: ['player'],

		events: {
			'click .js-button-play': 'play',
			'click .js-button-pause': 'pause',
			'click .js-button-next': 'next',
			'click .js-button-prev': 'prev',
			'click .js-button-stop': 'stop'
		},

		eventsForRestore: {
			'click .js-button-play': 'play',
			'click .js-button-pause': 'pause',
			'click .js-button-next': 'next',
			'click .js-button-prev': 'prev',
			'click .js-button-stop': 'stop'
		},

		init: function() {

			this.model = new win.APP.PlayerModel({view: this});

			this.$el = $('.js-wrapper .js-player-wrapper');
			this.$el.html(this.tmpl.player(this.model));

			this.playListView = new APP.PlayListView({playerView: this, playerModel: this.model});

		},

		update: function() {

			this.$el.html(this.tmpl.player(this.model));
			this.bindEvents();

		},

		bindEvents: function() {

			var events = this.eventsForRestore,
				key, event, selector, arr;

			for (key in events) {
				if (events.hasOwnProperty(key)) {
					arr = key.replace(/,/gi, ' ').replace(/\s+/gi, ' ').match(/[\S]+/g);
					event = arr.shift();
					selector = arr.join(', ');
					this.$el.find(selector).on(event, this[events[key]].bind(this));
				}
			}

		},
		play: function() {

			if (this.model.track.src) {
				this.model.play(this.model.track);
				return;
			}

			var track = this.playListModel.get('list')[0];
			if (track) {
				this.model.play(track);
				return;
			}

			console.warn(' --- NO track to play --- ');

		},
		pause: function() {
			this.model.pause();
		},
		next: function() {

			this.playNextTrack(1);

		},
		prev: function() {
			this.playNextTrack(-1);

		},
		playNextTrack: function(direction) {

			if (!this.model.track.src) {
				return;
			}

			var currentTrack = this.model.track,
				list = this.playListModel.get('list'),
				index = list.indexOf(currentTrack),
				nextTrack = list[index + 1 * direction];

			if (!nextTrack) {
				if (direction > 0) {
					nextTrack = list[0];
				} else {
					nextTrack = list[list.length - 1];
				}
			}

			this.model.play(nextTrack);

		},
		stop: function() {
			this.model.stop();
		}





	});




}(window, document, document.documentElement));