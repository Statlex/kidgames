(function (win) {

	"use strict";
	/*global window, document */

	win.ui = win.ui || {};

	win.ui.splashScreen = {
		showTime: 2000,
		setTimeoutId: 0,
		handleEvent: function() {
			var that = this;
			this.wrapper = $('.js-splash-screen');
			this.goodAnswer = $('.js-good-answer', this.wrapper);
			this.badAnswer = $('.js-bad-answer', this.wrapper);
			this.wrapper.addEventListener('click', function(){
				clearTimeout(that.setTimeoutId);
				that.hide();
			}, false);
		},
		show: function(isRight, action) {
			clearTimeout(this.setTimeoutId);
			this.goodAnswer.style.display = isRight ? 'block' : 'none';
			this.badAnswer.style.display = isRight ? 'none' : 'block';
			$.addClass(this.wrapper, 'active');
			this.setTimeoutId = setTimeout(this.hide.bind(this), this.showTime);
			player.play(isRight ? soundList.goodAnswer : soundList.badAnswer);
			this.wrapper.setAttribute('onclick', action);
		},
		hide: function() {
			$.removeClass(this.wrapper, 'active');
			this.wrapper.onclick();
			this.wrapper.onclick = function() {};
		}
	};

	win.addEventListener('load', win.ui.splashScreen, false);

}(window));

(function (win) {

	"use strict";
	/*global window, document */

	win.ui = win.ui || {};

	win.ui.alert = {
		handleEvent: function() {
			this.wrapper = $('.js-alert');
			this.okBtn = $('.js-alert-button', this.wrapper);
			this.message = $('.js-alert-message', this.wrapper);
			this.okBtn.addEventListener('click', this.hide.bind(this), false);
		},
		show: function(msg, action) {
			$.html(this.message, msg);
			this.wrapper.style.display = 'table';
			var that = this;
			setTimeout(function(){
				that.wrapper.style.opacity = 1;
			}, 20);
			this.okBtn.onclick = action;
		},
		hide: function() {
			var that = this;
			this.wrapper.style.opacity = '';
			setTimeout(function(){
				that.wrapper.style.display = '';
			}, 520);
			player.play(soundList.click);
		}
	};

	win.addEventListener('load', win.ui.alert, false);

}(window));

(function (win) {

	"use strict";
	/*global window, document, console, alert */
	if (!info.debugger.isActive) {
		return;
	}

	var logger = {
		handleEvent: function(){
			this.wrapper = $('.js-logger');
			this.wrapper.style.display = 'block';
			this.innerBlock = $('.js-logger-inner-block', this.wrapper);
			// save current method
			console._log = console.log;
			var that = this;
			console.log = function(text) {
				that.innerBlock.innerHTML += text + '<br>';
			}
		}

	};

	win.addEventListener('load', logger, false);

}(window));
