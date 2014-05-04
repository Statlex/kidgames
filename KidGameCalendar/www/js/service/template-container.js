(function (win, doc, docElem) {

	"use strict";
	/*global window, document, console, alert, util */

	var templateContainer;

	templateContainer = {
		templateSelector: '.jsTemplate',
		templates: {},
		init: function() {

			var templates = util.findAll(this.templateSelector),
				that = this;

			templates.forEach(function(tmplNode){
				that.templates[util.attr(tmplNode, 'data-template-name')] = tmplNode.textContent.replace(/\n/gi, ' ').replace(/\s+/, ' ').trim();
				util.remove(tmplNode);
			});

		}

	};

	win.templateContainer = templateContainer;

}(window, document, document.documentElement));

