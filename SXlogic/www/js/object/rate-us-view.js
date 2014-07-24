(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, window, document */
	/*global templateMaster, lang, Backbone, APP, info, $ */

	win.APP = win.APP || {};

	win.APP.QuestionView = win.APP.MainView.extend({
		templates: ['rate-us'],
		events: {
//			'click .js-set-question': 'setQuestion',
//			'click .js-hint-button': 'showHint',
			'click h1': 'test'
		},
		init: function (data) {

			this.interval = data.interval || 15;

			this.timeOutIntervalId = win.setInterval((function(){
				this.show();
				console.log(this.tmpl);
				clearInterval(this.timeOutIntervalId);
			}.bind(this)), this.interval * 1000); // every 20 min

			this.$el = $(this.tmpl['rate-us']({}));

		},
		show: function() {

			$(this.parent).append(this.$el);

		},
		test: function() {
			console.log('test');
		}

	});


	win.addEventListener('load', function(){


		setTimeout(function(){
			// <!-- get data of first run
			if (info.get('was-rated')) {
				return;
			}

			if (!info.get('first-run')) {
				info.set('first-run', Date.now(), true);
			}
			// --> get data of first run


			win.APP.questionView = new win.APP.QuestionView({
				date: Date.now(),
				url: '#question',
				interval: 0.1,
				parent: '.js-wrapper'
			});

		}, 500);


	}, false);


}(window, document, document.documentElement));