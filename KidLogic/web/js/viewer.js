(function () {

	"use strict";
	/*global window, document, console, alert, viewer, utils, splashScreen */

	window.utils = window.utils || {};
	window.utils.statusBar = {};

	window.utils.statusBar.hide = function() {
		if (!this.node) {
			this.node = document.querySelector('.status-bar');
		}
		this.node.style.top = '-35px';
	};

	window.utils.statusBar.show = function() {
		if (!this.node) {
			this.node = document.querySelector('.status-bar');
		}
		this.node.style.top = '0px';
	};

	window.viewer = {};

	viewer.showCategory = function(categoryName) {
		utils.info.curLevel += 1;
		splashScreen.hide();

		if (utils.info.curLevel > utils.info.maxLevel) {
			window.utils.showTitlePage();
			return;
		}

		window.utils.info.curCategory = categoryName;
		window.utils.score.show();
		window.utils.statusBar.show();

		var list, item;
		list = window.categoryList[categoryName]; // get list
		item = window.utils.fitNGetItem(list);
//		item = list.items['item-' + utils.getRandomInt(1, parseInt(list.items_number, 10))]; // get random item
//		item.imgPath = list.imgPath || '';
		// item - one item (item-1 or item-2) window.categoryList.someCategory
		viewer.showItem(item); // show item

	};

	viewer.showItem = function(item) {
		var bag, i, len, newOrder, itemNumber;

		// create assort massive
		bag = '123456';
		newOrder = [];
		for (i = 0, len = bag.length; i < len; i += 1) {
			itemNumber = utils.getRandomInt(0, bag.length - 1);
			newOrder.push(bag[itemNumber]);
			bag = bag.substring(0, itemNumber) + bag.substring(itemNumber + 1, bag.length);
		}

		switch (item.type) {
			case 1: // simple question, what is extra?
				viewer.showItemType1(item, newOrder);
				break;
			case 2:
				viewer.showItemType2(item, newOrder);
				break;

		}

		document.querySelector('.wrapper').style.backgroundImage = 'none';

	};


	viewer.showItemType1 = function(item, order) {
		var wrapper, i, len, div, divs, imgPath;

		divs = document.createElement('div');

		imgPath = item.imgPath;

		for (i = 0, len = order.length; i < len; i += 1) {
			div = document.createElement('div'); // create block for answer
			div.className = 'answer-div-type-1';
			div.style.backgroundImage = 'url(' + imgPath + item[order[i]] + ')';

			if (item[order[i]]) {
				// set good answer node
				if (order[i] === item.answer.toString()) {
					div.setAttribute('onclick', 'window.logic.goodAnswer(this)');
				} else {
					div.setAttribute('onclick', 'window.logic.badAnswer(this)');
				}

			}

			divs.appendChild(div);

		}

		div = document.createElement('div');
		div.className = 'question-type-1';
		div.innerHTML = '<div>' + item.question + '</div>';
		divs.appendChild(div);

		wrapper = document.querySelector('.wrapper');
		wrapper.innerHTML = divs.innerHTML;

	};

	viewer.showItemType2 = function(item, order) {
		var divs, div, wrapper, answerWrapper, i, len;

		divs = document.createElement('div');
		div = document.createElement('div');
		div.className = 'question-type-2';
		div.innerHTML = '<p class="question-type-2-text">' + item.text + '<\/p>'
		div.style.backgroundImage = 'url(' + item.question + ')';
		divs.appendChild(div);

		answerWrapper = document.createElement('div');
		answerWrapper.className = 'answer-wrapper-type-2';

		for (i = 0, len = order.length; i < len; i += 1) {
			div = document.createElement('div'); // create block for answer
			div.className = 'answer-div-type-2';
			div.style.backgroundImage = 'url(' +  item[order[i]] + ')';
			if (item[order[i]]) {
				// set good answer node
				if (order[i] === item.answer.toString()) {
					div.setAttribute('onclick', 'window.logic.goodAnswer(this)');
				} else {
					div.setAttribute('onclick', 'window.logic.badAnswer(this)');
				}
				answerWrapper.appendChild(div);
			}

		}

		divs.appendChild(answerWrapper);

////////////////////////////////
		wrapper = document.querySelector('.wrapper');
		wrapper.innerHTML = divs.innerHTML;
		utils.setCatType2();

	};

}());
