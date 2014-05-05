(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar, dataBaseA */

	win.GC = win.GC || {};

	win.GC.WindowView = Backbone.View.extend({
		el: '.js-window-wrapper',
		events: {

		},
		initialize: function() {
			//this.template = templateContainer.templates.options;
		},
		show: function(selector) {
			var template = templateContainer.templates[selector];
			this.$el.html(_.template(template, {}));
			APP.router.navigate('window');
			this.addEventListenersToContent();
			this.runCustomFunction(selector);
			this.$el.css('top', '0');
			APP.mainView.fade.show();
		},
		hide: function(noHistoryBack) {
			this.$el.css('top', '');
			if (!noHistoryBack) {
				Backbone.history.history.back();
			}
		},

		addEventListenersToContent: function() {

			var backBtn, binds;

			backBtn = this.$el.find('[data-back-button]');
			backBtn.on('click', this.hide.bind(this, false));

			binds = this.$el.find('[data-handle]');
			binds.each(function(){

				var $this = $(this);

				dataBaseA.getValue($this.attr('data-handle'), function(data){
					this.val(data);
				}.bind($this));

				$this.on('change', function(){
					dataBaseA.saveValue($this.attr('data-handle'), $this.val());
				});

			});

//			applyBtn = this.$el.find('[data-apply-button]');
//			applyBtn.on('click', this.apply.bind(this, false));

		},

		runCustomFunction: function(selector) {
			if (this.customFunction[selector]) {
				this.customFunction[selector].call(this);
			}
		},
		customFunction: {
			settings: function() {

				// set lang
				this.$el.find('.js-select-language').on('click', function(){

					var lang = $(this).attr('data-lang');

					if (lang === info.lang) {
						return;
					}

					info.set('lang', lang, true);

					Backbone.history.history.back();

					win.setTimeout(function(){
						window.location.reload();
					}, 100);

				});

				// set cycle length
				this.$el.find('.js-change-cycle-length').on('click', function(){
					var newLength = info.cycleLength + parseInt(this.getAttribute('data-change'), 10);
					if (newLength < info.cycleLengthMin || newLength > info.cycleLengthMax) {
						return;
					}
					info.set('cycleLength', newLength, true);
					$('.js-usually-cycle-length').html(info.cycleLength);
					APP.mainView.createCalendar();

				});

				// set start week

				this.$el.find('.js-week-start-on-monday').each(function(){

					this.checked = info.get('weekStart');

					$(this).on('change', function(){
						var day = this.checked ? 1 : 0;
						Calendar.prototype.weekStart = day;
						APP.slider.calendar.weekStart = day;
						APP.mainView.createCalendar();
						console.log('//');
						info.set('weekStart', day, true);

					});

				});

			}
		}

	});

}(window, document, document.documentElement));