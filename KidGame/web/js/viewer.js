(function (win) {

	"use strict";
	/*global window, document, $ */

	win.viewer = {
		wrapper: null, // field for page wrapper, type Node
		templatePrefix: '.js-template',
		history: [],
		show: function(cssSelector, model, needTrack) {

			// get last selector and equals with current selector
			if ((needTrack === undefined || needTrack) === true && this.history[this.history.length - 1] !== cssSelector) {
				this.history.push(cssSelector);
			}

			var template = $(this.templatePrefix + cssSelector);
			this.wrapper.innerHTML = this.template(template.innerHTML)(model || {});

			// run action
			var action = template.getAttribute('onshow');
			if (action) {
				win.eval(action);
			}

		},
		back: function() {
			var curPage = this.history.pop();
			if (!curPage) {
				return;
			}
			var prePage = this.history.pop();
			if (!prePage) {
				return;
			}
			this.show(prePage);
		},
		refresh: function(){
			this.show(this.history.pop());
		},
		template: function(str) {
			return new Function("obj",
				"var p=[];" +
					// Introduce the data as local variables using with(){}
					"with(obj){p.push('" + str
					.replace(/[\r\t\n]/g, " ")
					.split("{{").join("\t")
					.replace(/((^|}})[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)}}/g, "',$1,'")
					.split("\t").join("');")
					.split("}}").join("p.push('")
					.split("\r").join("\\'") + "');} return p.join('');");

		}

	};



}(window));
