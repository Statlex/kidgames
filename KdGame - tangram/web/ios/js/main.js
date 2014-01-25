(function (win) {

	"use strict";
	/*global window, document */

	var main = {

		handleEvent: function() {

			this.wrapper = $('#wrapper');
			viewer.show('title-page');

			this.uniqueTest();

		},
		setMorePage: function(){
			var langSelectNode = $('.js-language-select', this.wrapper);

			langSelectNode.addEventListener('change', function(){
				info.set('lang', this.value, true);
				viewer.refresh();
			}, false);

			// set external link
			var links = $$('a', main.wrapper);
			ui.externalLinkHandler.setLinks(links);

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
		setImageColor: function() {
			var imgs = $$('.js-category-button', main.wrapper);
			var tempNode = document.createElement('div');
			var pre = "background-image: url('data:image/svg+xml;utf8,";
			var post = "');";
			imgs.forEach(function(img){
				tempNode.innerHTML = img.getAttribute('style').replace(pre, '').replace(post, '');
				var polygons = $$('polygon', tempNode);
				polygons.forEach(function(polygon){
					polygon.setAttribute('fill', info.imageColor);
					polygon.setAttribute('stroke', info.imageColor);
					polygon.setAttribute('stroke-width', '1');
					polygon.setAttribute('stroke-linecap', 'round');
					polygon.setAttribute('stroke-linejoin', 'round');
					polygon.setAttribute('stroke-miterlimit', '12');
				});
				img.setAttribute('style', pre + tempNode.innerHTML + post);
			})

		},
		uniqueTest: function() {
			// test for unique id in categories
			var categories = win.categories;

			var ids = [];

			var testIsPassed = true;

			for (var key in categories) {
				if (categories.hasOwnProperty(key)) {
					categories[key].figures.forEach(function(data){
						ids.push(data.id);
					});
				}
			}

			console.log('---- Unique ID test is STARTED ----');

			ids.forEach(function(id, index, arr){
				if (arr.indexOf(id) !== arr.lastIndexOf(id)) {
					console.log('double id is - ' + id);
					testIsPassed = false;
				}
			});

			if (testIsPassed) {
				console.log('---- Unique ID test is PASSED ---');
			} else {
				console.warn('---- Unique ID test is ERROR ----');
			}

		},
		setPreviewState: function() {

			var nodes = $$('.category-wrapper', main.wrapper);

			var idsData = info.get('idsData') || {};

			nodes.forEach(function(node){
				var imageId = parseInt(node.getAttribute('figure-id'));
				if (!idsData[imageId]) {
					return;
				}
				var timeNode = $('.js-timestamp', node);
				var saveIcon = $('.js-save-icon', node);
				$.addClass(saveIcon, 'saved');

				if (!info.timerIsActive) {
					return;
				}
				var spendTime = idsData[imageId].spendTime;
				if (spendTime > 0) {
					var min = Math.floor(spendTime / 60);
					var sec = spendTime % 60;
					timeNode.innerHTML = min + ':' + sec;
					timeNode.style.display = 'block';
				}

			});



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
		var wrapper = $('body');
		wrapper.addEventListener('touchmove', function(e){
			e.preventDefault();
		}, false);
	}

}());