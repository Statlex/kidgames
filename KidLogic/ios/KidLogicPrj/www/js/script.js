(function () {

	"use strict";
	/*global window, document, console, alert, utils */

	function showTitlePage() {
		defaultCatName();
		utils.info.curLevel = 0;
		utils.statusBar.hide();
		var list, i, buttonWrapper, str, wrapper, buttonTemplate, oneButton, imgPath;
		buttonTemplate = document.querySelector('.button-template').innerHTML;
		str = '';

		list = window.categoryList;
		for (i in list) {
			if (list.hasOwnProperty(i)) {
				imgPath = list[i].imgPath || '';
				oneButton = buttonTemplate;
				oneButton = oneButton.replace('(categoryName)', '(\'' + i + '\')');
				oneButton = oneButton.replace('list[i].name', list[i].name);
				oneButton = oneButton.replace('src=""', 'src="' + imgPath + list[i].img + '"');
				str += oneButton;
			}
		}

		buttonWrapper = document.createElement('div');
		buttonWrapper.className = 'button-wrapper';
		buttonWrapper.innerHTML = str;

		wrapper = document.querySelector('.wrapper');
		wrapper.innerHTML = '';
		wrapper.style.backgroundImage = '';
		wrapper.appendChild(buttonWrapper);

	}

	function setBackButton() {
		var back;
		back = document.querySelector('.back');
		back.onclick = showTitlePage;
	}

	function defaultCatName() {
		var wrapper = document.querySelector('.wrapper');
		wrapper.removeAttribute('cat-name');
	}

	function run() {
		utils.setBodySize();
		utils.setWrapperSize();
		showTitlePage();
		setBackButton();
		utils.score.show();
		window.utils.showTitlePage = showTitlePage;

	}

	window.addEventListener('load', run, false);

	function onResize() {
		utils.setBodySize();
		utils.setWrapperSize();
		utils.setCatType2();
	}

	window.addEventListener('resize', onResize, false);

}());
