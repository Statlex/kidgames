(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar */

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
			this.$el.css('top', '0');
			APP.mainView.fade.show();
		},
		hide: function(noHistoryBack) {
			this.$el.css('top', '');
			if (!noHistoryBack) {
				Backbone.history.history.back();
			}
			this.$el.empty();
		},
		addEventListenersToContent: function() {

			var backBtn;

			backBtn = this.$el.find('[data-back-button]');
			backBtn.on('click', this.hide.bind(this, false));



		}

	});

}(window, document, document.documentElement));