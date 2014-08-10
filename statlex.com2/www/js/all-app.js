(function (win, doc, docElem) {

	"use strict";
	/*global window, document, console, alert */

	var allApp = {
		init: function() {

			this.listNode = doc.getElementsByClassName('all-app-list-wrapper')[0];
			this.infoNode = doc.getElementsByClassName('all-app-list-wrapper')[0];
			this.headerNode = doc.getElementsByClassName('header')[0];
			this.footerNode = doc.getElementsByClassName('footer')[0];
			this.promoNode = doc.getElementsByClassName('company-promo')[0];

			this.setSizes();

			win.addEventListener('scroll', allApp.onScroll.bind(allApp), false);

		},

		setSizes: function() {

			this.headerH = this.headerNode.clientHeight;
			this.promoH = this.promoNode.clientHeight;
			this.topPoint = this.promoH - this.headerH;

		},

		onScroll: function() {

			var body = doc.body,
				top = body.scrollTop;

			if (top > this.topPoint) {
				this.toFixed();
			} else {
				this.toStatic();
			}

		},

		toFixed: function() {
			if (this.position === 'fixed') {
				return;
			}

			var list = this.listNode;

			list.style.position = 'fixed';
			list.style.top = this.headerH + 'px';


			this.position = 'fixed';
			console.log('fixed');
		},

		toStatic: function() {
			if (this.position === 'static') {
				return;
			}

			var list = this.listNode;
			list.style.position = '';
			list.style.top = '';


			this.position = 'static';
			console.log('static');
		}




	};

	win.addEventListener('load', allApp.init.bind(allApp), false);

}(window, document, document.documentElement));