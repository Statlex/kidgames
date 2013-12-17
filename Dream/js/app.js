(function (win) {

	"use strict";
	/*global window, document, app, templater, util, $, $A, console, storage, share, setting, languages, confirm, localStorage */

	win.app = {
		wrapper: null, // $('#wrapper');
		fade: null, // $('#fade');
		insertHTML: function (node, json) {
			app.wrapper.innerHTML = templater(node.innerHTML)(languages[setting.lang]);
			util.firArticleSize();
			app.setControllerListeners();
			app.setEventListeners();
			app.setEventListenersInput();
			app.insertSavedValue();
			share.createShareLink();
			app.after(node, json);
		},
		setControllerListeners: function() {
			$A('*[controller-action]').forEach(function(node){
				node.addEventListener('click', function(){
					var arr = this.getAttribute('controller-action').split(' ');
					window[arr[0]][arr[1]]();
				}, false);
			});
		},
		setEventListeners: function () {
			$A('#wrapper [action-name]').forEach(function (node) {
				util.setRandomBGP(node);
				var action = node.getAttribute('action-name');
				var type = node.getAttribute('action-type') || 'click';
				node.addEventListener(type, function (e) {
					var before = node.getAttribute('before-action');

					if (before) {
						app[before]({
							node: node,
							selector: node.getAttribute('selector')
						});
					}

					app[action]({
						node: node,
						selector: node.getAttribute('selector')
					});
				}, false);
			});
		},
		setEventListenersInput: function() {
			$A('#wrapper input[type="text"], #wrapper textarea').forEach(function(node){
				node.addEventListener('input', function(){
					util.classWork.removeClass(this, 'error-area');
				},false);
			});
		},
		showPage: function (params) {
			if (params.node) {
				var test = params.node.getAttribute('test');
				if (test && params.node.className.indexOf(' ' + test) === -1) {
					return;
				}
			}

			this.showFade();
			win.setTimeout(function () {
				this.insertHTML($('.js-template.' + params.selector));
			}.bind(this), 500);
			win.setTimeout(function () {
				this.hideFade();
			}.bind(this), 600);
		},
		saveValue: function (params) {
			storage.set(params.node.getAttribute('saved-value'), params.node.value);
		},
		insertSavedValue: function () {
			$A('#wrapper [saved-value]').forEach(function (node) {
				node.value = storage.get(node.getAttribute('saved-value'));
			});
		},
		after: function (node, json) {
			var run = node.getAttribute('run-after');
			if (!run) {
				return;
			}
			run = run.split(' ');
			win[run[0]][run[1]]();
		},
		showFade: function () {
			this.fade.style.display = 'block';
			win.setTimeout(function () {
				this.fade.style.opacity = '1';
			}.bind(this), 20);
		},
		hideFade: function () {
			this.fade.style.opacity = '0';
			win.setTimeout(function () {
				this.fade.style.display = 'none';
			}.bind(this), 500);
		},
		resetSetting: function () {
			if (confirm(languages[setting.lang].i.resetAllDate)) {
				localStorage.clear();
				setting.init();
				app.showPage({selector: 'title-page'});
			}
		},
		setLanguage: function(params) {
			var select = params.node;
			var lang = select.options[select.selectedIndex].value;
			setting.lang = lang;
			storage.set('lang', lang);
		},
		goToTranslatePage: function() {
			var inputs = $A('#wrapper input[type="text"], #wrapper textarea');

			var canMove = true;

			inputs.forEach(function(node){
				if (!node.value) {
					util.classWork.addClass(node, 'error-area');
					canMove = false;
				} else {
					util.classWork.removeClass(node, 'error-area');
				}
			});

			if (canMove) {
				app.showPage({selector: 'dream-translating'});
			}

		}

	};

	function run() {
		app.wrapper = $('#wrapper');
		app.fade = $('#fade');
		app.showPage({selector: 'title-page'});
	}

	win.addEventListener('load', run, false);

}(window));
