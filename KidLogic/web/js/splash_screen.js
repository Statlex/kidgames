(function () {

	"use strict";
	/*global window, document, console, alert, setTimeout, utils */

	window.splashScreen = {
		init: function() {
			this.node = document.querySelector('.splash-screen');
			this.node.style.height = document.documentElement.clientHeight + 'px';
		},
		showOk: function(func) {
			var needClick;
            needClick = true;
			this.node = this.node || document.querySelector('.splash-screen');
			this.node.innerHTML = '';
			this.node.style.display = 'block';
			this.node.style.backgroundImage = 'url(img/i/splash-screen/done.svg)';
			this.node.style.backgroundColor = '';
			this.node.setAttribute('onclick', func);

			if (utils.info.curLevel === utils.info.maxLevel) {
				this.node.style.backgroundImage = 'url(img/i/splash-screen/thumbs-up.svg)';
                needClick = false;
				this.node.innerHTML = '<h1>score: ' +  utils.score.getScore() + '<\/h1>';
            }

			setTimeout(function() {
				this.node.style.opacity = 1;
			}.bind(this), 10);

			if (needClick) {
                setTimeout(function() {
                    if (this.node.style.display === 'block') {
                        this.node.click();
                    }
                }.bind(this), 2000);
            }

		},
		hide: function() {
			this.node = this.node || document.querySelector('.splash-screen');
			this.node.style.display = 'none';
			this.node.style.opacity = 0;
			this.node.style.backgroundImage = '';
			this.node.removeAttribute('onclick');
		}
	};

	window.addEventListener('load', window.splashScreen.init, false);
	window.addEventListener('resize', window.splashScreen.init, false);

}());
