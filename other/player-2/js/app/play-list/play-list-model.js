(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Audio */

	win.APP.PlayListModel = Backbone.Model.extend({
		initialize: function(data) {
			this.view = data.view;

			this.set('list', []);
			this.on('change:list', this.view.update.bind(this.view));



		}


	});

}(window, document, document.documentElement));