(function (win) {

	"use strict";
	/*global window, document */

	win.findNumber = {
		availableNumbers: $.createSimpleArray(0, 20), // [0..20]
		showLevel: function() {
			var answer = $.shuffle(Object.create(this.availableNumbers))[10];

			// if difficult == 1 -> show message + voice
			// if difficult == 2 -> voice only
			// if difficult == 3 -> voice only + change number positions

			var blocks = $$('.js-number-for-find');

			blocks.forEach(function(node){
				node.onclick = function(){
					$.addClass(this, 'disable');
					this.onclick = function(){};
				}
			});

			if (info.difficult === 1) {
				ui.message.show(lang[info.lang].find + ': ' + answer);


			}

			if (info.difficult === 2) {

			}

			if (info.difficult === 3) {

			}


		}



	}


}(window));
