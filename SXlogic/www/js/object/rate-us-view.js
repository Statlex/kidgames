(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global templateMaster, lang, Backbone, APP, info, $, clearInterval, setTimeout, location, history */

	win.APP = win.APP || {};

	win.APP.RateUsView = win.APP.MainView.extend({
		templates: ['rate-us'],
		events: {
			'click .js-rate-us-fade': 'hide',
			'click .js-not-now': 'hide',
			'mousedown .js-rate-us-star': 'setRate',
			'click .js-rate-us-on-google-play': 'toMarket',
			'click .js-rate-us-send-button': 'sendFeedback',
			'input .js-rate-us-send-textarea': 'setSendButton',
			'blur .js-rate-us-send-textarea': 'onBlurTextarea',
			'focus .js-rate-us-send-textarea': 'onFocusTextarea'
		},
		toMarketLink: 'https://play.google.com/store/apps/details?id=com.statlex.logicandwit',
		period: 3, // 1 === one day
		oneDayMs: 1000 * 60 * 60 * 24,
		parent: '.js-wrapper',
		init: function (data) {

			this.$el = $(this.tmpl['rate-us']({}));
			this.$sendButton = this.$el.find('.js-rate-us-send-button');
			this.show();

		},
		show: function () {

			var now = Date.now(),
				lastShow = info.get('last-show-rate-us');

			if (now < (lastShow + this.period * this.oneDayMs )) {
				return;
			}

			info.set('last-show-rate-us', now, true);

			APP.router.navigate('rate-us', {trigger: false});

			$(this.parent).append(this.$el);

			win.addEventListener('hashchange', function () {
				if (location.hash.replace('#', '') !== 'rate-us') {
					win.APP.rateUsView.remove();
				}
			}, false);

		},
		remove: function () {
			$('.js-rate-us-wrapper').remove();
		},
		hide: function() {
			history.back();
		},
		setRate: function(e) {
			var $this = $(e.currentTarget),
				words = $this.data('word'),
				$words = this.$el.find('.js-rate-by-star'),
				value = +$this.data('value'),
				$stars = this.$el.find('.js-rate-us-star'),
				$send = this.$el.find('.js-rate-us-send-feedback'),
				$toGP = this.$el.find('.js-rate-us-on-google-play'),
				$notNow = this.$el.find('.js-not-now');

			$words.html(words);
			$notNow.css('display', 'none');

			$stars.forEach(function(star, index){
				if (index < value) {
					star.classList.add('active');
				} else {
					star.classList.remove('active');
				}
			});

			if (value < 4) {
				$send.removeClass('hidden');
				$toGP.addClass('hidden');
			} else {
				$send.addClass('hidden');
				$toGP.removeClass('hidden');
			}

			this.ratingToMail = value + ' - ' + words;

		},
		toMarket: function() {
			window.open(this.toMarketLink);
			info.set('was-rated', true, true);
		},
		sendFeedback: function(e) {
			var $textArea = this.$el.find('.js-rate-us-send-textarea'),
				description = encodeURIComponent($textArea.val()),
				ratingToMail = encodeURIComponent(this.ratingToMail),
				util = $(),
				$form = this.$el.find('.js-rate-us-form');

			if ( !$textArea.val() ) {
				return;
			}

			$form.addClass('blurred');

			info.set('sent-mail', description, true);

			util.ajax({
				url: 'http://statlex.com/mail.php?name=SXLogic&words=' + ratingToMail + '&description=' + description + '&time-stamp=' + Math.random(),
				success: function(text) {

					alert(lang.mailSendingIsSuccessful);

					if (location.hash.replace('#', '') === 'rate-us') {
						win.APP.rateUsView.remove();
						Backbone.history.history.back();
					}

					info.set('was-rated', true, true);

				},
				error: function() {
					alert(lang.mailSendingIsFailed);
					$form.removeClass('blurred');
				}
			});

		},
		setSendButton: function(e) {
			var $this = $(e.currentTarget),
				$button = this.$sendButton;

			if ($this.val()) {
				$button.removeClass('button-is-disabled');
			} else {
				$button.addClass('button-is-disabled');
			}

		},
		onBlurTextarea: function() {
			this.$el.removeClass('focusTextArea');
		},
		onFocusTextarea: function() {
			this.$el.addClass('focusTextArea');
		}

	});


	win.addEventListener('load', function () {

		// <!-- get data of first run
		if (info.get('was-rated')) {
			return;
		}

		if (!info.get('last-show-rate-us')) {
			info.set('last-show-rate-us', Date.now(), true);
		}
		// --> get data of first run

		setTimeout(function () {
			var util = $();
			util.testConnection(function(){
				win.APP.rateUsView = new win.APP.RateUsView();
			});
		}, 10 * 1000 * 60); // 10 min

	}, false);


}(window, document, document.documentElement));