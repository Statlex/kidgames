(function (win) {

	"use strict";
	/*global window, document, console, alert, $, storage, util, app */

	var pre = util.pre;

	win.translater = {
		run: function() {
			this.progress = $('.progress');
			this.langCount = $('.js-lang-count');
			this.allCount = parseInt($('.js-all-count').innerHTML, 10);
			this.curCount = 0;
			this.count();
			this.progress.addEventListener(pre + 'TransitionEnd', win.translater.count.bind(win.translater), false);
		},
		count: function() {

			if (this.curCount <= this.allCount) {
				this.progress.style[pre + 'Transition'] = ((this.curCount === this.allCount) ? '0.2' : Math.random() * 5) + 's all linear';
				this.progress.style.width = this.curCount / this.allCount * 100 + '%';
				this.progress.innerHTML = (this.curCount / this.allCount * 100).toFixed(0) + '%';
				this.langCount.innerHTML = this.curCount;
				this.curCount += 1;
				return;
			}

			var time = this.toBinaryCode();

			window.setTimeout(function(){
				app.showPage({selector: 'send-dream-to-universe'});
			}, time * 1000 + 1000);

		},
		toBinaryCode: function() {
			var text = storage.get('name') + ' ' + storage.get('dream');
			var time = text.length / 100;
			var node = $('.js-binary-code');
			node.style[pre + 'Transition'] = time + 's all linear';
			node.style.width = '100%';
			return time;
		}

	};

}(window));
