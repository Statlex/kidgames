(function (win) {

	"use strict";
	/*global window, document */

	var main = {

		handleEvent: function() {

			this.wrapper = $('#wrapper');
			viewer.show('title-page');
			//viewer.show('tangram-page');

		},
		setMorePage: function(){
			var langSelectNode = $('.js-language-select', this.wrapper);

			langSelectNode.addEventListener('change', function(){
				info.set('lang', this.value, true);
				viewer.refresh();
			}, false);

		},
		setSettingPage: function(){
			var langSelectNode = $('.js-language-select', this.wrapper);
			langSelectNode.addEventListener('change', function(){
				info.set('lang', this.value, true);
				viewer.refresh();
			}, false);

			var savedItems = $$('input[save]', main.wrapper);
			savedItems.forEach(function(item){
				item.addEventListener('change', function(){
					var itemName = this.getAttribute('save');
					info.set(itemName, this.checked, true);
				}, false);
			});

		},
		setPreview: function(wrapper) {
			var activePreviews = $('.js-tangram-preview.active', main.wrapper);
			$.removeClass(activePreviews, 'active');
			$.addClass(wrapper, 'active');

			var patternName = wrapper.getAttribute('pattern-name');

			info.set('tangramPattern', patternName, true);


		},
		runTangram: function() {

			tangram.init(win.rabbit);
		}

	};

	win.main = main;

	win.addEventListener('load', main, false);

}(window));

(function () {
	"use strict";
	/*global window, document, console, alert */
	window.addEventListener('load', noBodyScroll, false); // + no gesture
	function noBodyScroll() {
		document.body.addEventListener('touchstart', function() {
			event.preventDefault();
		}, false);
	}
}());
